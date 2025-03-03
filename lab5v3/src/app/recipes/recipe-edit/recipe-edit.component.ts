import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';
import { ReviewService } from '../../shared/review.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  reviewForm: FormGroup;
  
  constructor(private route: ActivatedRoute, 
  private recipeService: RecipeService, 
  private router: Router,
  private authService: AuthService,
  private reviewService: ReviewService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params)=>{
          this.id = +params['id'];
          this.editMode = params['id'] !=null;
          this.initForm();
        }
      );
  }
  
  onSubmit(){
    // const newRecipe = new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients']);
    if (this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  
  private initForm(){
    let recipeName = '';
    let recipeAmount = 0;
    let recipeDescription = '';
    let recipePrice = 0;
    
    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
     // recipeImagePath = recipe.imagePath;
      recipePrice = recipe.price;
      recipeDescription = recipe.description;
      recipeAmount = recipe.amount;
    //  if (recipe['ingredients']){
      //  for (let ingredient of recipe.ingredients){
      //    recipeIngredients.push(new FormGroup({
      //      'name': new FormControl(ingredient.name, Validators.required),
      //      'amount': new FormControl(ingredient.amount, [Validators.required,
      //      Validators.pattern(/^[1-9]+[0-9]*$/)
      //      ])
      //    })
      //    );
      //  }
      //}
      
      
    }
    
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'price': new FormControl(recipePrice, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'amount': new FormControl(recipeAmount, Validators.required)
    });
    
    this.reviewForm = new FormGroup({
      'review': new FormControl(null, Validators.required),
      'rating': new FormControl(null, [Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),Validators.max(5)
            ])
    });
    
    
  }
  
  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),Validators.max(5)
            ])
      })
    );
    
  }
  
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  
  onAddComment(){
    this.reviewService.addReview(this.reviewForm.value, this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
}
