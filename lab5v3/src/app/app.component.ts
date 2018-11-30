import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router){
    
  }
  
  loadedFeature = 'recipe';
  
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAAw9zRpgWk4Lnkd-I6kQD-egNGh5I3EII",
      authDomain: "eingrattwebtechlab5.firebaseapp.com"
    });
     this.router.navigate([''])
  }
  
  onNavigate(feature:string){
    this.loadedFeature = feature;  
    
  }
}
