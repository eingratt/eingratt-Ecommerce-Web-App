import { Component, OnInit } from '@angular/core';
import { Review } from '../../shared/review.model';
import { ReviewService } from '../../shared/review.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-comments',
  templateUrl: './recipe-comments.component.html',
  styleUrls: ['./recipe-comments.component.css']
})
export class RecipeCommentsComponent implements OnInit {
  
  reviews: Review[]=[];
  IDs: string[] = [];

  
  constructor(private route: ActivatedRoute,
  private router: Router, private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviews=[];
    this.IDs=[];
    this.reviewService.getReviews();
    this.reviews = this.reviews.concat(this.reviewService.reviews);
    this.IDs = this.IDs.concat(this.reviewService.IDs);
    // console.log(this.reviews[0]);
  }
  
  changeState(index){
    //this will be a post
    this.reviews[index].isEnabled =  !this.reviews[index].isEnabled;
    this.reviewService.updateReview(index,this.reviews[index]);
    
    
  }
  

}
