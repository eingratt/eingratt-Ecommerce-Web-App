import { Injectable } from '@angular/core';
import { Review } from './review.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviews: Review[]=[];

  constructor(private http: HttpClient) { }
  
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
      })
    };
  
  
  getReviews(){
     this.getRequest()
    .subscribe((data)=>{
      if (data){
      this.reviews=[];
      for(var i in data){
        this.reviews.push(new Review(data[i].review,data[i].rating,data[i].productName,data[i].userEmail));
       // this.recipesChanged.next(this.recipes);
        //console.log(data[i]._id);
        //console.log(this.recipes);
      }
    }
    });
    //console.log(this.recipes);
    console.log("Reviews imported from database.")
    }
  
  
  public getRequest(){
       return this.http.get('/reviews/getAll');
       
   };
  
  
  
  
}
