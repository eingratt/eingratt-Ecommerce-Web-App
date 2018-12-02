import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { PolicyService } from '../policy.service';
import { Policy } from '../policy.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-log-issues',
  templateUrl: './log-issues.component.html',
  styleUrls: ['./log-issues.component.css']
})
export class LogIssuesComponent implements OnInit {
  policyLogs: Policy[]=[];
  logForm: FormGroup;

  constructor(private policyService: PolicyService, private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.policyLogs = [];
    this.initForm();
    this.policyService.getLogs();
    this.policyLogs = this.policyLogs.concat(this.policyService.policyLogs);
    
  }
  
   private initForm(){
    this.logForm = new FormGroup({
      'header': new FormControl(null, Validators.required),
      'information': new FormControl(null, Validators.required)
    });
    
    
  }
  
  onAddLog(){
    this.policyService.addLog(this.logForm.value);
    this.policyLogs = [];
    this.policyService.getLogs();
    this.policyLogs = this.policyLogs.concat(this.policyService.policyLogs);
    
  }
  
  
  onCancel(){
    this.router.navigate(['']);
  }

}
