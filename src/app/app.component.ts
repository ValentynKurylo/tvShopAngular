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
    this.user = localStorage.getItem('user')
    console.log(this.user)
    if (this.user) {
      this.isLoggedIn = true;
      if (this.user === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false
      }
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
