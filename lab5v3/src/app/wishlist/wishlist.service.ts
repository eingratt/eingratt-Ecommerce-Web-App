import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  wishlists: any = [];
  wishlistitems: any = [];
  
  getUrl: string = '/wishlists/getAll';
  createUrl: string = '/wishlists/create';
  
  getItemsUrl: string = '/wishlistitems/getAll';
  createItemsUrl: string = '/wishlistitems/create';

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
      })
    };
  
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  getLists(){
     this.getRequest()
    .subscribe((data)=>{
      if (data){
      this.wishlists=[];
      for(var i in data){
        this.wishlists.push({name: data[i].name, description: data[i].description, userEmail: data[i].userEmail, isPublic: data[i].isPublic });
      }
    }
    });
    //console.log(this.recipes);
    console.log("Wishlists imported from database.")
    }
  
  
  public getRequest(){
       return this.http.get(this.getUrl);
       
   };
  
  public postRequest(wishlist: any, user:string, isPublic: boolean){
      let passObject={
          "name": wishlist.name,
          "description": wishlist.description,
          "userEmail": user,
          "isPublic": isPublic
      }
      return this.http.post(this.createUrl,passObject,this.httpOptions);
  }
  
  addList(wishlist: any, isPublic: boolean){
    let user = this.authService.currentEmail;
    console.log(wishlist);
    this.postRequest(wishlist,user,isPublic).subscribe(data=>console.log(data));
    this.wishlists.push({amount: wishlist.amount, itemName: wishlist.itemName});
  }
  
  
  
  // items in wishlists
  getItems(){
     this.getItemsRequest()
    .subscribe((data)=>{
      if (data){
      this.wishlistitems=[];
      for(var i in data){
        this.wishlistitems.push({listName: data[i].listName, itemName: data[i].itemName, amount: data[i].amount });
      }
    }
    });
    console.log("Wishlist Items imported from database.")
    }
  
  
  public getItemsRequest(){
       return this.http.get(this.getItemsUrl);
       
   };
  
  
  public postItemRequest(item: any, wishlistname: string){
      let passObject={
          "listName": wishlistname,
          "itemName": item.itemName,
          "amount": item.amount
      }
      return this.http.post(this.createItemsUrl,passObject,this.httpOptions);
  }
  
  addItem(item: any, wishlistname: any){
    this.postItemRequest(item,wishlistname.name).subscribe(data=>console.log(data));
    this.wishlistitems.push({name: item.itemName, amount: item.amount, wishlistname: wishlistname.name});
  }
  
  
  
}
