import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token: string;
  userCreated: boolean;
  adminEmails: string[];

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
      })
    };
  
  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
              console.log(error),
              alert(error)
            })
        this.sendVerificationEmail();
        alert("A verification email has been sent to " + email + " please follow the link provided in this email to verify your account.")
        this.logout;
        this.router.navigate(['/']);
      }
      )
      .catch(
        error => {
          console.log(error),
          alert(error)
        }
        )
    
  }
  
  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                if (!firebase.auth().currentUser.emailVerified) {
                    alert("Your account is not yet activated, a new verification email has been sent to " + email);
                    this.sendVerificationEmail();
                    this.logout();
                } else {
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        )
                }
            }
        )
        .catch(
            error => {
                console.log(error),
                    alert(error)
            }
        );
  }

  sendVerificationEmail(){
    alert("v email sent");
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function () {
          // Email sent.
      }).catch(function (error) {
          // An error happened.
      });
  }
  
  
  getIdToken(){
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
      return this.token;
  }
  
  isAuthenticated(){
    var user = firebase.auth().currentUser;
    if (this.token != null){
      if(user.emailVerified){
        return true;
      }

    }else{
      return false;
    }
  }
  
  logout(){
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

  // example
  // getRecipes(){
  //   const token = this.authService.getIdToken();
  //   //add ("?auth=" + token) to url
  // }
  
  isAdmin(){
    let user = firebase.auth().currentUser;
    for(var i in this.adminEmails){
      //console.log(user.email);
      //console.log("parsing through email array");
      // console.log(this.adminEmails[i]);
      // console.log(user.email);
      if ((user.email) == this.adminEmails[i]){
       // console.log("Current user is an Admin.")
        return true;
      }
    }
    return false;
  }
  
  makeAdmins(){
    this.getAdminsRequest()
    .subscribe((data)=>{
      this.adminEmails=[];
      if (data){
      for(var i in data){
        this.adminEmails.push(data[i].userEmail);
        console.log(this.adminEmails[i]);
      }
    }
    });
    console.log("Admins imported from database.")
  }
  
  public getAdminsRequest(){
       return this.http.get('/admins/getAll');
       
   };
  
  constructor(private router: Router, private http: HttpClient) { }
}
