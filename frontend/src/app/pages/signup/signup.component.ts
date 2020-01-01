import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  singUpUser = {

  }

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registro() {
    this._auth.signUpUser(this.singUpUser)
      .subscribe(res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile'])

      },
      err => console.log(err)
      
      )
  }

}
