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
  IDs: string[] = [];
  getUrl: string = '/reviews/getAll';
  createUrl: string = '/reviews/create';
  updateUrl: string = '/reviews/update/';


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
      this.IDs = [];
      for(var i in data){
        this.reviews.push(new Review(data[i].review,data[i].rating,data[i].productName,data[i].userEmail,data[i].isEnabled));
        this.IDs.push(data[i]._id);
      }
    }
    });
    //console.log(this.recipes);
    console.log("Reviews imported from database.")
    }
  
  
  public getRequest(){
       return this.http.get(this.getUrl);
       
   };
  
  
  
  public postRequest(review: Review){
      let passObject={
          "review": review.review,
          "rating": review.rating,
          "productName": review.productName,
          "userEmail": review.userEmail,
          "isEnabled": review.isEnabled
      }
      return this.http.post(this.createUrl,passObject,this.httpOptions);
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
  
  putRequest(index,newReview: Review){
    let url = this.updateUrl;
    url = url.concat(index);
    console.log(url);
    let passObject={
          "review": newReview.review,
          "rating": newReview.rating,
          "productName": newReview.productName,
          "userEmail": newReview.userEmail,
          "isEnabled": newReview.isEnabled
      }
    return this.http.put(url, passObject, this.httpOptions)
  }
  
   updateReview(index: number, newReview: Review){
     console.log(index);
     console.log(this.IDs[index]);
    this.putRequest(this.IDs[index], newReview).subscribe(data=>console.log(data));
    this.reviews[index] = newReview;
    // this.recipesChanged.next(this.recipes.slice());
  }
  
  
}
