import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  private recipes: Recipe[]=[
    new Recipe('A test Recipe', 
    'This is a test',
    'https://get.pxhere.com/photo/dish-meal-food-produce-recipe-fish-breakfast-meat-pork-cuisine-steak-pork-chop-power-dishes-grilling-fried-food-604134.jpg',
    [
      new Ingredient('Meat',1),
      new Ingredient('French Fries',2)
      ]),
    new Recipe('Bobs Big Burger', 'This is a test',
    'https://get.pxhere.com/photo/dish-meal-food-produce-recipe-fish-breakfast-meat-pork-cuisine-steak-pork-chop-power-dishes-grilling-fried-food-604134.jpg',
    [
      new Ingredient('Buns',2),
      new Ingredient('Patty',3) 
      ])
  ];
  
  constructor(private slService: ShoppingListService) { }
  
  getRecipes(){
    return this.recipes.slice();
    
  }
  
  getRecipe(index: number){
    return this.recipes[index];
  }
  
  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
    
  }
 
}
