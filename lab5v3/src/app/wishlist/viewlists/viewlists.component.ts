import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service'; 

@Component({
  selector: 'app-viewlists',
  templateUrl: './viewlists.component.html',
  styleUrls: ['./viewlists.component.css']
})
export class ViewlistsComponent implements OnInit {

  wishlists: any = [];
  wishlistitems: any = [];

  constructor(private wishlistservice: WishlistService) { }

  ngOnInit() {
    this.wishlists = [];
    this.wishlistitems = [];
    this.wishlistservice.getLists();
    this.wishlistservice.getItems();
    this.wishlists = this.wishlists.concat(this.wishlistservice.wishlists);
    this.wishlistitems = this.wishlistitems.concat(this.wishlistservice.wishlistitems);

  }

}
