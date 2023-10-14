import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tvShopAngular';

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  user: any = {
    id: 0,
    username: '',
    role: '',
    email: ''
  }
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.checkUserStatus();
  }

  checkUserStatus() {
    if(localStorage.getItem("token")){
      this.isLoggedIn = true
    }else {
      localStorage.removeItem("token")
      this.isLoggedIn = false
      localStorage.removeItem("user")
      localStorage.removeItem("role")
    }
    if(localStorage.getItem("role") === "admin"){
      this.isAdmin = true
    }
  }

  logout() {
    let b = confirm("Are you sure?")
    if(b){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.reload();
      this.checkUserStatus();
    }
  }
}
