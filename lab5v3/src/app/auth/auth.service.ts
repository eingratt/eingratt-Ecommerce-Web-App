import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token: string;
  userCreated: boolean;
  
  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.signinUser(email, password);    
        this.sendVerificationEmail();
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
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    )
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
      else{
        alert("Please verify your email");
        this.logout();
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
  
  constructor(private router: Router) { }
}
