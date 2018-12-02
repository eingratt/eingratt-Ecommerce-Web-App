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
   // new Recipe ('Initializer',0,'We do not have any products yet, please check back soon.',0),
    ];
  private recipeN: Recipe;
  private recipeT: Recipe = new Recipe ('Initializer',0,'Used to initilize array to avoid error NUll',0);
  IDs: string[];
  
  getUrl: string = '/products/getAll';
  createUrl: string = '/products/create';
  updateUrl: string = '/products/update/';
  deleteUrl: string = '/products/delete/';
  
  makeRecipes(){
     this.getRequest()
    .subscribe((data)=>{
      if (data){
      this.recipes=[];
      this.IDs=[];
      for(var i in data){
        //console.log(new Recipe(data[i].name,data[i].price,data[i].details,data[i].amount));
        this.recipes.push(new Recipe(data[i].name,data[i].price,data[i].details,data[i].amount));
        this.recipesChanged.next(this.recipes);
        //console.log(data[i]._id);
        this.IDs.push(JSON.stringify(data[i]._id));
        //console.log(this.recipes);
      }
    }
    });
    //console.log(this.recipes);
    console.log("Products imported from database.")
    }
  
  
  constructor(private slService: ShoppingListService, private http: HttpClient) {}
  

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
      })
    };
  
  public getRequest(){
       return this.http.get(this.getUrl);
       
   };
  
  public postRequest(recipe: Recipe){
      let passObject={
          "name": recipe.name,
          "price": recipe.price,
          "details": recipe.description,
          "amount": recipe.amount
      }
      return this.http.post(this.createUrl,passObject,this.httpOptions);
  }
  
  deleteRequest (index) {
    
    index = index.substring(1,(index.length -1));
    let url = this.deleteUrl; // DELETE api/heroes/42
    url = url.concat(index);
    alert(url);
    this.IDs.splice(index,1);
    return this.http.delete(url, this.httpOptions);
  }
  
//  postRequest(recipe:Recipe){
//    let url = '/products/create';
//    return this.http.post(this.url, recipe, this.httpOptions)
//  }
  
  putRequest(index,newRecipe: Recipe){
    index = index.substring(1,(index.length -1));
    let url = this.updateUrl; // DELETE api/heroes/42
    url = url.concat(index);
    let passObject={
          "name": newRecipe.name,
          "price": newRecipe.price,
          "details": newRecipe.description,
          "amount": newRecipe.amount
      }
    return this.http.put(url, passObject, this.httpOptions)
  }
  
  //http requests end
  
  getRecipes(){
    //this.recipes.push(this.recipeT);
    this.makeRecipes();
    
    //console.log(this.recipeT)
    return this.recipes;
    
  }
  
  getIDs(){
    //this.recipes.push(this.recipeT);
    this.makeRecipes();
    
    //console.log(this.recipeT)
    return this.IDs;
    
  }
  
  getRecipe(index: number){
    return this.recipes[index];
  }
  
  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
    
  }
  // add id
  addRecipe(recipe: Recipe){
    this.postRequest(recipe).subscribe(data=>console.log(data));
    this.recipes.push(recipe);
    this.makeRecipes();
    this.recipesChanged.next(this.recipes.slice());
  }
  
  updateRecipe(index: number, newRecipe: Recipe){
    this.putRequest(this.IDs[index], newRecipe).subscribe(data=>console.log(data));
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  deleteRecipe(index: number){
    this.deleteRequest(this.IDs[index]).subscribe(data=>console.log(data));
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
