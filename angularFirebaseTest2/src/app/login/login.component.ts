import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersServerService } from '../../services/users-server.service';
import { User } from 'src/entities/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersServerService: UsersServerService, private router: Router) { }

  // vytvorenie objektu User v premmennej userTosend - user ktorého budeme posielať do firebase
  userToSend = new User();

  // validacia pre formular ktory je v html v [formGroup]
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  // getter na email formcontrol
  get email() {
    return this.loginForm.get('email');
  }

  // getter na password formcontrol
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    // pouzitie metódy checkLogin v metode ngOnInit() - vždy keď sa načíta component
    // this.checkLogin();
  }

  login() {

    // nastavenie emailu, password v userToSend hodnotami z formularu - email a password
    this.userToSend.email = this.email.value;
    this.userToSend.password = this.password.value;

    // zavolanie metody SignIn (lognutie usera) cez userServerService
    // keďže metoda vracia promise použijeme metodu then() po vykonaní
    this.usersServerService.SignIn(this.userToSend).then(() => {
        this.usersServerService.changeData(true);
    });
  }

  /*
  checkLogin() {
    // ked je nejaký user ulozeny v localstorage (nerovná sa null) preroutuje ho preč nie na login
    if (this.usersServerService.getUserFromLocalStorage() != null) {
      this.router.navigateByUrl('profile');
    }
  }
  */

}
