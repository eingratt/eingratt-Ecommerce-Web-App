import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  
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
  
  constructor(private slService: ShoppingListService, private http: HttpClient) { }
  
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
      })
    };
  
  public getRequest(){
       return this.http.get('/products/getAll');
       
   };
  
  public postRequest(name: string){
      let passObject={
          "name": name,
          "price": 12,
          "amount": 100,
          "taxRate": 0.13,
      }
      return this.http.post('/products/create',passObject,this.httpOptions);
  }
  
  deleteRequest (test) {
    test = test.substring(1,(test.length -1));

    let url = '/products/delete/'; // DELETE api/heroes/42
    url = url.concat(test);
    alert(url);
    return this.http.delete(url, this.httpOptions);
  }
  
  //http requests end
  
  getRecipes(){
    return this.recipes.slice();
    
  }
  
  getRecipe(index: number){
    return this.recipes[index];
  }
  
  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
    
  }
  
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
