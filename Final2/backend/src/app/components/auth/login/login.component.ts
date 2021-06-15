import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService:AuthService){}
  onLogin(form :NgForm){
    if (form.invalid){
      return;
    }
    this.authService.login(form.value.email,form.value.password);
  }


  ngOnInit() {
  }

  onSubmit() {
    
  }

}
