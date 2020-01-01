import { Injectable } from '@angular/core';
import { WebReqService } from './web-req.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _web: WebReqService, private router: Router) { }

  signUpUser(user) {
    return this._web.post('user', user);
  };

  loginUser(user) {
    return this._web.post('login',user);
  };

  isLogged() {
    return !!localStorage.getItem('token');
  };

  getToken() {
    return localStorage.getItem('token')
  };

  logOutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  };
}
