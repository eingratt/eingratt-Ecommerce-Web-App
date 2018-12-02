import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { PolicyService } from '../policy.service';
import { Policy } from '../policy.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.css']
})
export class DMCAComponent implements OnInit {

  dmcaPolicies: Policy[]=[];
  logForm: FormGroup;

  constructor(private policyService: PolicyService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.dmcaPolicies = [];
    this.initForm();
    this.policyService.getLogs();
    this.dmcaPolicies = this.dmcaPolicies.concat(this.policyService.policyLogs);
  }


  private initForm(){
    this.logForm = new FormGroup({
      'information': new FormControl(null, Validators.required)
    });
    
  }

  onAddLog(){
    this.policyService.updateLog(this.policyService.dmcaID, this.logForm.value);
    this.dmcaPolicies = [];
    this.policyService.getLogs();
    this.dmcaPolicies = this.dmcaPolicies.concat(this.policyService.policyLogs);
  }
  
  onCancel(){
    this.router.navigate(['']);
  }

}
