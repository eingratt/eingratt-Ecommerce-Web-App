import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ReviewService } from '../shared/review.service';
import { PolicyService } from '../policies/policy.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private authService: AuthService, private reviewService: ReviewService, private policyService: PolicyService) { }
  

  ngOnInit() {
    this.authService.makeAdmins();
    this.reviewService.getReviews();
    this.policyService.getLogs();
    this.authService.getEmails();
  }
  
  onLogout(){
    this.authService.logout();
  }

}
