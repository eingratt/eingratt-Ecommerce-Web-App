import { Injectable } from '@angular/core';
import { Review } from './review.model';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviews: Review[]=[];

  constructor(private http: HttpClient, private authService: AuthService, private recipeService: RecipeService) { }
  
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
        this.reviews.push(new Review(data[i].review,data[i].rating,data[i].productName,data[i].userEmail,data[i].isEnabled));
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
  
  
  
  public postRequest(review: Review){
      let passObject={
          "review": review.review,
          "rating": review.rating,
          "productName": review.productName,
          "userEmail": review.userEmail,
          "isEnabled": review.isEnabled
      }
      return this.http.post('/reviews/create',passObject,this.httpOptions);
  }
  
  addReview(review: any, rID: number){
    let pID = this.recipeService.IDs[rID];
    pID = pID.substring(1,(pID.length -1));
    let user = this.authService.currentEmail;
    let newReview = new Review(review.review,review.rating,pID,user,true)
    console.log(newReview);
    this.postRequest(newReview).subscribe(data=>console.log(data));
    this.reviews.push(newReview);
    //this.recipesChanged.next(this.recipes.slice());
  }
  
  
}
