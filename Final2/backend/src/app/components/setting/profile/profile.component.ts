import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo;
  
  constructor(private authService: AuthService, private router:Router ) { }

  ngOnInit() { 
    this.authService.getUserInfo().subscribe(
      res=>{
        this.userInfo=res['user'];

      },err=>{

      }

    );
  }

}
