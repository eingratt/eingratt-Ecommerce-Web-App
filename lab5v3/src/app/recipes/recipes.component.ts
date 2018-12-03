import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private recipeService: RecipeService, private authService: AuthService) {
    
  }

  ngOnInit() {
  }

}
