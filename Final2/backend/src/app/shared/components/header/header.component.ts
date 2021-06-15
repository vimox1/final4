import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/components/auth/auth.service';
import { NavService } from '../../service/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;
  lang;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService ,private authService:AuthService) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  onLogout(){

    this.authService.logout();
  }

  ngOnInit() {
      this.lang=localStorage.getItem('lang') || 'Fr';
    }

  changeLang(lang){
  localStorage.setItem('lang',lang);
  window.location.reload();
  }

}
