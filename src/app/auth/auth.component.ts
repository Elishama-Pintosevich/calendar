import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRequestsService } from '../services/http-requests.service';
import { BpnService } from '../services/data/bpn.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  
 public validUser: boolean=true
 public loading: boolean =false


  constructor(private router: Router, private authService: AuthService, private httpReq: HttpRequestsService, public bpnService: BpnService){
   
  }
  userForm = new FormGroup({
    phoneNumber: new FormControl('',[ Validators.required, Validators.pattern('^[0-9]{10}$')]),
    password: new FormControl('', [ Validators.required]),
  });

  login(){
    console.log(this.userForm);
    this.loading = true
    this.httpReq.checkUser(this.userForm.value.phoneNumber).subscribe(
      (data)=>{
        
        this.loading = false
        console.log('auth');
        
        console.log(data);
        if (data['password'] == this.userForm.value.password) {

          this.bpnService.setBpn({bpn: data['bpn'][0]['phone_number']})
          console.log(data['bpn'][0]['phone_number']);
          
          this.authService.login();
          this.router.navigate(['calendar'])
        }else{
          this.validUser=false
        }

        
      },
      (error) => {
        console.log(error);
        this.loading = false
        this.validUser=false
        
      }
    )
    
  }
}
