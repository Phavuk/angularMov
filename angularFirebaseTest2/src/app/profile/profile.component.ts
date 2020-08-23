import { Component, OnInit } from '@angular/core';
import { UsersServerService } from '../../services/users-server.service';
import { User } from 'src/entities/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // premenna uid typu string
  uid: string;

  // premenna typu User
  user: User;

  constructor(private userServerService: UsersServerService) { }

  ngOnInit() {

    // console.log(this.userServerService.getUserFromLocalStorage().user.uid);

    // gettnutie uid z usera ktory je v local storage cez náš UserServerService
    this.uid = this.userServerService.getUserFromLocalStorage().user.uid;

    // ked sa uid nerovna null
    if (this.uid != null) {
      // tak gettneme usera cez service UserServerService cez metodu getUser()
      // metoda getUser() vracia Observable (prúd dát) na ktorý počuvame
      this.userServerService.getUser(this.uid).subscribe(data => {
        // do premennej user ktoru mame vyššie pod uid - dáme data z Observable
        this.user = data[0] as User;
    });
    }
  }
}
