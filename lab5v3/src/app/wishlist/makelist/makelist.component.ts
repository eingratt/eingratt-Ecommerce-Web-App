import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import { WishlistService } from '../wishlist.service'; 

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
  itemsinList: any;
  

  constructor(private recipeService: RecipeService, 
  private authService: AuthService, private router: Router,
  private wishlistservice: WishlistService) {

  }
  

  ngOnInit() {
    this.itemsinList =[];
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
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
    
  }
  
  // save everything to database
  onNewList(){
    this.router.navigate([''])
    console.log("Read me " + this.wishForm.value)
    this.wishlistservice.addList(this.wishForm.value,this.newList);
    for (var i in this.itemsinList){
      this.wishlistservice.addItem(this.itemsinList[i], this.wishForm.value);
    }
    this.wishlistservice.getLists();
    this.wishlistservice.getItems();
  }
  
  addToList(amount, i){
    this.itemsinList.push({amount: amount, itemName: this.recipes[i].name});
  }
  
  changeState(){
    this.newList = !this.newList;
  }
  
  ngOnDestroy(){
    this.subscritption.unsubscribe();
  }
  
  onCancel(){
    this.router.navigate(['']);
  }

}
