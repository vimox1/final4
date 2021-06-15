import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {AuthService} from "../auth.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public authService:AuthService){}
  onRegister(form :NgForm){
    if (form.invalid){
      return;
    }
    this.authService.createUser(form.value.email,form.value.password,form.value.nomcomplet,form.value.codefiscal,form.value.adresse,form.value.genre,form.value.numtele,form.value.role,form.value.datenaiss);
  }

 



  createLoginForm() {
   
  }
  createRegisterForm() {
    
  }

  ngOnInit(): void {
  }

}
