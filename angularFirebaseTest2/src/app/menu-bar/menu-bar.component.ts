import { Component, OnInit } from '@angular/core';
import { UsersServerService } from '../../services/users-server.service';
import { fromEvent, forkJoin } from 'rxjs';
import { storage } from 'firebase';
import { Router } from '@angular/router';
import { User } from 'src/entities/User';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  // premenna typu User
  loggedUser: User;
  admin: boolean = true;
  constructor(private usersServerService: UsersServerService, private router: Router) { }

  ngOnInit() {

    this.usersServerService.status.subscribe((val) => {
        this.loggedUser = this.usersServerService.getUserFromLocalStorage();
    });
  }

  logout() {
    // zavolanie metody SignOut (odhlasenie) a počuvanie observable (prúdu dát) na túto metódu
    this.usersServerService.SignOut().subscribe(() => {
      // vytvoríme nového usera ktorý je prázdny
      this.loggedUser = new User();
      console.log(this.loggedUser);
      this.usersServerService.changeData(false);
    });
  }

}
