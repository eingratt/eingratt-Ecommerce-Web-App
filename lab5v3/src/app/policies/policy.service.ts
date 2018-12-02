import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Policy } from './policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  securityID: number;
  dmcaID: number;
  policyLogs: Policy[]=[];
  logIDs: string[]=[];

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
      })
    };

  constructor(private http: HttpClient) { }
  
   
  // getLogs(){
  //   this.getRequest()
  //   .subscribe((data)=>{
  //     if (data){
  //     this.policyLogs=[];
  //     this.logIDs=[];
  //     // this.IDs = [];
  //     for(var i in data){
  //     //  if(data[i].header == "securityPolicy" ){
  //       //  this.securityPrivacyPoly = new Policy(data[i].header, data[i].information);
  //     //    this.securityID = i;
  //     // }else if(data[i].header == "dmcaPolicy" ){
  //       //  this.dmcaPoly = new Policy(data[i].header, data[i].information);
  //     //    this.dmcaID = i;
  //     //  }
  //         this.logIDS.push(data[i]_id);
  //         this.policyLogs.push(new Policy(data[i].header, data[i].information));
  //         //this.IDs.push(data[i]._id);
        
  //     }
  //   }
  //   });
  //   //console.log(this.recipes);
  //   console.log("Logs imported from database.")
  //   }
    
  getLogs(){
  this.getRequest()
    .subscribe((data) => {
      if (data) {
        this.policyLogs = [];
        this.logIDs = [];
        for (var i in data) {
          this.policyLogs.push(new Policy(data[i].header, data[i].information));
          this.logIDs.push(data[i]._id);
        if(data[i].header == "securityPolicy" ){
          this.securityID = +i;
        }else if(data[i].header == "dmcaPolicy" ){
          this.dmcaID = +i;
        }
        }
      }
    });
  console.log("Logs imported from database.")
}
  
  
  public getRequest(){
       return this.http.get('/policylogs/getAll');
       
   };
  
  public postRequest(policy: Policy){
      let passObject={
          "header": policy.header,
          "information": policy.information
      }
      return this.http.post('/policylogs/create',passObject,this.httpOptions);
  }
  
  addLog(polyLog: any){
    let newLog = new Policy(polyLog.header, polyLog.information);
    console.log(newLog);
    this.policyLogs.push(newLog);
    this.postRequest(newLog).subscribe(data=>{
      this.getLogs();
      console.log(data);
      });
      
  }
  
  putRequest(index: string, newLog: string){
    let url = '/policylogs/update/';
    url = url.concat(index);
    console.log(url);
    let passObject={
          "information": newLog
      }
    return this.http.put(url, passObject, this.httpOptions)
  }
  
   updateLog(index: number, newLog: any){
     console.log(index);
     console.log(newLog.information);
     
    // if(this.dmcaPoly.header == newLog.header){
    //   this.dmcaPoly.information == newLog.information;
    //   console.log(this.dmcaPoly.information);
    // }else{
    //   this.securityPrivacyPoly.information == newLog.information;
    // }
    newLog = new Policy (this.policyLogs[index].header,newLog.information);
    this.policyLogs[index] = newLog;
    console.log("new" + newLog.header)
    this.putRequest(this.logIDs[index], newLog.information).subscribe((data)=>{
      this.getLogs();
      console.log("getting the good");
      });
  }
  
  
  
}
