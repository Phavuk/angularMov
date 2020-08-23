import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersServerService } from '../../services/users-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // uid premenna do ktorej dame unikatne uid
  uid: string;

  // reaktivny formular
  editForm = new FormGroup({
    // input name vo formulari
    name: new FormControl(
      '', [Validators.required, Validators.minLength(3)]
    ),
    // input email vo formulari
    email: new FormControl(
      '', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')]
    ),
    active: new FormControl('', Validators.required),
  });

  // getter na name formcontrol
  get name() {
    return this.editForm.get('name');
  }

  // getter na email formcontrol
  get email() {
    return this.editForm.get('email');
  }

  // getter na active formcontrol
  get active() {
    return this.editForm.get('active');
  }

  // injectli sme si - service UserServerService a Router
  constructor(private userServerService: UsersServerService, private router: Router) { }

  ngOnInit() {
      // gettnutie uid z usera ktory je v local storage cez náš UserServerService
      this.uid = this.userServerService.getUserFromLocalStorage().user.uid;
      // ziskanie usera cez UserServerService pomocou uid z firebasu
      this.userServerService.getUser(this.uid).subscribe( user => {
          // vytvorenie dočasného usera do ktorého dáme usera z firebasu
          const tempUser: User = user[0] as User;
          // nasettovanie mena,emailu a active hodnôt z tempUsera do formuláru ktorý mame v html
          this.name.setValue(tempUser.name);
          this.email.setValue(tempUser.email);
          this.active.setValue(tempUser.active);
      });
  }

  // metoda na submit form
  submitForm() {
      // zavolanie metódy updateUser z nášho servicu userServerService
      // dali sme tam hodnoty ktoré chceme zmeniť vo firebase čiže - meno, email a active
      this.userServerService.updateUser(this.name.value, this.email.value, this.active.value, this.uid).subscribe( () => {
          // po počuvani na observable ( prúd dát ) sa preroutujeme na profile
          this.router.navigateByUrl('/profile');
      });
  }

}
