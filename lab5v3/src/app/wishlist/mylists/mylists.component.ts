import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { WishlistService } from '../wishlist.service'; 

@Component({
  selector: 'app-mylists',
  templateUrl: './mylists.component.html',
  styleUrls: ['./mylists.component.css']
})
export class MylistsComponent implements OnInit {

  wishlists: any = [];
  wishlistitems: any = [];
  userEmail: string = null;
  
  constructor(private wishlistservice: WishlistService, private authService: AuthService) { }

  ngOnInit() {
    this.wishlists = [];
    this.wishlistitems = [];
    this.userEmail = this.authService.currentEmail;
    this.wishlistservice.getLists();
    this.wishlistservice.getItems();
    this.wishlists = this.wishlists.concat(this.wishlistservice.wishlists);
    this.wishlistitems = this.wishlistitems.concat(this.wishlistservice.wishlistitems);

  }
  
  

}
