import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {

  userEmails: any;
  IDs: string[] = [];


  constructor(private authService: AuthService) { }



   ngOnInit() {
    this.userEmails=[];
    this.IDs = [];
    this.authService.getEmails();
    this.userEmails = this.userEmails.concat(this.authService.userEmails);
    this.IDs = this.IDs.concat(this.authService.userIDs);
    // console.log(this.reviews[0]);
  }
  
  changeState(index){
    //this will be a post
    this.userEmails[index].enabled = !this.userEmails[index].enabled;
    this.authService.updateEmail(index,this.userEmails[index]);
    
  }
  
  makeAdmin(i){
    this.authService.addAdmin(this.userEmails[i].email);
  }

}
