import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
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
import { ManageusersComponent } from './auth/manageusers/manageusers.component';




const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] }
    ]},
  { path: 'shopping-list', component: ShoppingListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'about', component: AboutComponent},
  { path: 'comments', component: RecipeCommentsComponent, canActivate: [AuthGuardService] },
  { path: 'securityPrivacy', component: SecurityPrivacyComponent },
  { path: 'dmca', component: DMCAComponent },
  { path: 'logIssues', component: LogIssuesComponent, canActivate: [AuthGuardService] },
  { path: 'makewishlist', component: MakelistComponent },
  { path: 'publicwishlists', component: ViewlistsComponent },
  { path: 'mywishlists', component: MylistsComponent },
  { path: 'useremails', component: ManageusersComponent }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
