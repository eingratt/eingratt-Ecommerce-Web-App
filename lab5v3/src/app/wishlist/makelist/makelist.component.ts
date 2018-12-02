import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-makelist',
  templateUrl: './makelist.component.html',
  styleUrls: ['./makelist.component.css']
})
export class MakelistComponent implements OnInit, OnDestroy {

  recipes: Recipe[]=[];
  subscritption: Subscription;
  
  wishForm: FormGroup;
  newList: boolean = false;
  itemsinList: Recipe[]=[]

  constructor(private recipeService: RecipeService, 
  private authService: AuthService, private router: Router) {

  }
  

  ngOnInit() {
    this.initForm();
    this.subscritption = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }
  
  private initForm(){
    this.wishForm = new FormGroup({
      'amount': new FormControl(null, [Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
    });
    
  }
  
  onNewRecipe(){
    //this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  onNewList(){
    this.router.navigate([''])
    //post to wishlist
  }
  
  addToList(index, i){
    //post to items in wishlist
  }
  
  changeState(){
    this.newList = !this.newList;
  }
  
  ngOnDestroy(){
    this.subscritption.unsubscribe();
  }

}
