import { Component, OnInit } from '@angular/core';
import { UsersServerService } from '../../services/users-server.service';
import * as zxcvbn from 'zxcvbn';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from 'src/entities/User';
import { CanDeactivateComponent } from '../guards/deactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, CanDeactivateComponent {

  constructor(private usersServerService: UsersServerService) { }

  passwordMsg = '';

  // premenna ktorá obsahuje objekt User
  userToSend = new User();

  registerForm = new FormGroup({

    // validacia pre formular ktory je v html v [formGroup]
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    email: new FormControl('', [
      // toto znamena ze pole musi byt vyplnene
      Validators.required,
      // toto znamena ze to musi byt mail
      Validators.email,
      // keby predošly validator.email nenasiel chybu skusime ešte regex na email
      Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}')
    ]),
                                  // validacia pomocou našho validatora hesla
    password: new FormControl('', this.passValidator()),
    password2: new FormControl('')
    },
      // pouzitie metody gurskeho
      this.passwordsMatchValidator
  );

  // gettere aby sme si vedeli gettnut hodnotu z html fieldov
  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }

  // metoda od gurskeho z jeho kodu na validaciu hesla
  passValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const passTest = zxcvbn(control.value);
      const message = `Password strength / 4 - must be 3 or 4,
      ${passTest.feedback.warning}`;
      this.passwordMsg = message;
      return passTest.score > 3 ? { weakPassword : message} : null;
    };
  }

  // metoda od gurskeho z jeho kodu na overenie zhody obidvoch hesiel
  passwordsMatchValidator(control: FormGroup): ValidationErrors {
    const password = control.get('password');
    const password2 = control.get('password2');
    if (password.value === password2.value) {
      password2.setErrors(null);
      return null;
    } else {
      password2.setErrors({ differentPasswords: 'Passwords do not match' });
      return { differentPasswords: 'Passwords do not match' };
    }
  }

  ngOnInit() {

  }

  submitForm() {

      console.log(
        `${this.email.value}\n${this.password.value}\n${this.name.value}`
      );

      // do premeny usertoSend nahrame data z nášho formulara register
      this.userToSend.name = this.name.value;
      this.userToSend.email = this.email.value;
      this.userToSend.password = this.password.value;
      this.userToSend.active = true;

      // metoda na registrovanie sa do firebase databazy
      this.usersServerService.SignUp(this.userToSend);
  }

  // metoda po implementacii rozhrania ktora sa týka guardy
  canDeactivate(): boolean | Observable<boolean> {

    // ked su všetky fieldy vyplnené vráti true
    if (this.name.value && this.email.value && this.password.value && this.password2.value) {
      return true;
    }

    // ked nesu všetky fieldy vyplnené vrati true
    if (!this.name.value && !this.email.value && !this.password.value && !this.password2.value) {
      return true;
    }

    // ked ani jedna z 2 podmienok vyššie nevráti true vybehne userovi na webe toto okno
    return window.confirm('Form was not completed, wanna leave?');
  }

}
