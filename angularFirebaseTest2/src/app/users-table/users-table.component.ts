import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/entities/User';
import { UsersServerService } from '../../services/users-server.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'email',
    'name',
    'active'
  ];
  dataSource = new MatTableDataSource<User>();

  constructor(private userServerService: UsersServerService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
      this.userServerService.getUsers().subscribe(
        (usersFromFirebase) =>  {
            this.dataSource.data = usersFromFirebase;
        }
      );
  }

  deleteUser(user: User) {
    console.log(user.uid);
    this.userServerService.deleteUser(user).subscribe(() =>
        this.dataSource.data = this.dataSource.data.filter(u => u !== user)
    );
  }

}
