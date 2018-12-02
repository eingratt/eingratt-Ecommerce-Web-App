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
  currentEmail: string;
  userEmails: any;
  userIDs: string[];

  getAdminUrl: string = '/admins/getAll';
  createAdminUrl: string = '/admins/create';

  getUserUrl: string = '/useremails/getAll';
  createUserUrl: string = '/useremails/create';
  updateUserUrl: string = '/useremails/update/';

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
        // post request
        this.addEmail(email, true);
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
                } 
                else {
                  let user = firebase.auth().currentUser;
                  for (var i in this.userEmails){
                    if(user.email == this.userEmails[i].email && this.userEmails[i].enabled == false){
                      //alert("This account has been disabled by a Website Admin,\nplease contact eingratta22@hotmail.com for more info.");
                      this.logout();
                     return;
                    }
                  }
                  // if with for loop in an else if
                    this.router.navigate(['/']);
                    this.currentEmail = firebase.auth().currentUser.email;
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
       return this.http.get(this.getAdminUrl);
       
   };
  
  constructor(private router: Router, private http: HttpClient) { }
  
  
  // User emails database functions
  public getEmailsRequest(){
       return this.http.get(this.getUserUrl);
       
   };
  
  getEmails(){
    this.getEmailsRequest()
    .subscribe((data)=>{
      this.userEmails=[];
      this.userIDs=[]
      if (data){
      for(var i in data){
        this.userEmails.push({email: data[i].userEmail, enabled: data[i].isEnabled});
        this.userIDs.push(data[i]._id);
        console.log("check me " + this.userEmails[i].email + this.userEmails[i].enabled);
      }
    }
    });
    console.log("Users imported from database.")
  }
  
  //post request
  public postEmailsRequest(email: String, enabled: boolean){
      let passObject={
          "userEmail": email,
          "isEnabled": enabled
      }
      return this.http.post(this.createUserUrl,passObject,this.httpOptions);
  }
  
  addEmail(email: string, enabled: boolean){
    
    console.log(this.userEmails);
    this.postEmailsRequest(email,enabled).subscribe(data=>console.log(data));
    this.userEmails.push({email: email, enabled: enabled});
  }
  
  // put method to disable user
  putRequest(index,newEmail: any){
    let url = this.updateUserUrl;
    url = url.concat(index);
    console.log(url);
    let passObject={
          "userEmail": newEmail.email,
          "isEnabled": newEmail.enabled
      }
    return this.http.put(url, passObject, this.httpOptions)
  }
  
  updateEmail(index: number, newEmail: any){
     console.log(index);
     console.log(this.userIDs[index]);
    this.putRequest(this.userIDs[index], newEmail).subscribe(data=>console.log(data));
    this.userEmails[index] = newEmail;
  }
  
  // Add to admins collection
  public postAdminsRequest(email: string){
      let passObject={
          "name": "moderator",
          "userEmail": email
      }
      return this.http.post(this.createAdminUrl,passObject,this.httpOptions);
  }
  
  addAdmin(email: string){
    this.postAdminsRequest(email).subscribe(data=>console.log(data));
    this.adminEmails.push(email);
  }
  
}
