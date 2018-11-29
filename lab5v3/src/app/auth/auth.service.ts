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
  
  constructor(private router: Router) { }
}
