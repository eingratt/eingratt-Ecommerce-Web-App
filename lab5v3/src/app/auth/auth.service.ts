import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token: string;
  
  signupUser(email: string, password: string){
    alert("User Created");
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
        )
  }
  
  signinUser(email: string, password:string){
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
          error => console.log(error)
        );
    
  }
  
  getIdToken(){
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
      return this.token;
  }
  
  isAuthenticated(){
    return this.token != null;
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
