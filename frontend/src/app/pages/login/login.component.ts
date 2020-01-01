import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser = {

  }
  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this._auth.loginUser(this.loginUser)
      .subscribe(res=> {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile'])
      });
  };
}
