import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { PolicyService } from '../policy.service';
import { Policy } from '../policy.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-security-privacy',
  templateUrl: './security-privacy.component.html',
  styleUrls: ['./security-privacy.component.css']
})
export class SecurityPrivacyComponent implements OnInit {

  securityPolicies: Policy[]=[];
  logForm: FormGroup;

  constructor(private policyService: PolicyService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.securityPolicies = [];
    this.initForm();
    this.policyService.getLogs();
    this.securityPolicies = this.securityPolicies.concat(this.policyService.policyLogs);
  }


  private initForm(){
    this.logForm = new FormGroup({
      'information': new FormControl(null, Validators.required)
    });
    
  }





  onAddLog(){
    this.policyService.updateLog(this.policyService.securityID, this.logForm.value);
    this.securityPolicies = [];
    this.policyService.getLogs();
    this.securityPolicies = this.securityPolicies.concat(this.policyService.policyLogs);
  }

  onCancel(){
    this.router.navigate(['']);
  }

}
