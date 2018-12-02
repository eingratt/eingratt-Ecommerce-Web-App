import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AboutComponent } from './about/about.component';
import { RecipeCommentsComponent } from './recipes/recipe-comments/recipe-comments.component';
import { SecurityPrivacyComponent } from './policies/security-privacy/security-privacy.component';
import { DMCAComponent } from './policies/dmca/dmca.component';
import { LogIssuesComponent } from './policies/log-issues/log-issues.component';
import { MakelistComponent } from './wishlist/makelist/makelist.component';
import { ViewlistsComponent } from './wishlist/viewlists/viewlists.component';
import { MylistsComponent } from './wishlist/mylists/mylists.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    SignupComponent,
    SigninComponent,
    AboutComponent,
    RecipeCommentsComponent,
    SecurityPrivacyComponent,
    DMCAComponent,
    LogIssuesComponent,
    MakelistComponent,
    ViewlistsComponent,
    MylistsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService, RecipeService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
