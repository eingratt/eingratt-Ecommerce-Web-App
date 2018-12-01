import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';
import { Review } from '../../shared/review.model';
import { ReviewService } from '../../shared/review.service';



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  reviews: Review[]=[];
  pID: string;
  
  constructor(private recipeService: RecipeService, 
  private route: ActivatedRoute,
  private router: Router, private authService: AuthService, private reviewService: ReviewService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params)=>{
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
          this.pID = this.recipeService.IDs[this.id];
          this.pID =  this.pID.substring(1,(this.pID.length -1));
          //alert(this.recipeService.IDs[this.id]);
          this.reviewService.getReviews();
          this.reviews=this.reviewService.reviews;
        });
  }
  
  onAddToShoppingList(){
 //   this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
  
  onAddComment(){
   // alert(this.pIDS[0]);
   
  }
  
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
    //this.router.navigate(['../',this.id,'edit'],{relativeTo: this.route});
  }
  
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
