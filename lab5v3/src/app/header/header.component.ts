import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ReviewService } from '../shared/review.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private authService: AuthService, private reviewService: ReviewService) { }
  

  ngOnInit() {
    this.authService.makeAdmins();
    this.reviewService.getReviews();
  }
  
  onLogout(){
    this.authService.logout();
  }

}
