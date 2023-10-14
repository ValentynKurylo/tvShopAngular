import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: UserService) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log(loginData)
        this.authService.login(loginData).subscribe(value => {
          console.log(value.user_1)
          localStorage.setItem("token", value.token)
          localStorage.setItem("user", value.user_1)
          localStorage.setItem("role", value.user_1.role)
          window.location.reload();
          alert(`Hello ${value.user_1.username}!`)
          console.log(localStorage.getItem('user'))
        }, error => {
          console.log(error)
          alert(error.error.message)
        })

    } else {
      alert("Wrong email or password")
    }
  }
}
