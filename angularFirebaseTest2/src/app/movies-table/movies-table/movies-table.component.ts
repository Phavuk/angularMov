import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '../../../entities/Movie';
import { UsersServerService } from 'src/services/users-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css']
})
export class MoviesTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'parentId',
    'name',
    'genre',
    'year',
  ];
  dataSource = new MatTableDataSource<Movie>();

  uid: string;

  constructor(private userServerService: UsersServerService, private router: Router) { }

  ngOnInit(): void {
    // gettnutie uid z usera ktory je v local storage cez náš UserServerService
    this.uid = this.userServerService.getUserFromLocalStorage().user.uid;
  }

  ngAfterViewInit(): void {
    this.userServerService.getMovieList(this.uid).subscribe(
      (moviesFromFirebase) =>  {
          this.dataSource.data = moviesFromFirebase;
      }
    );
  }

  deleteMovie(movie: Movie) {
    console.log(movie.name);
    console.log(movie.id);
    this.userServerService.deleteMovie(movie).subscribe(() =>
        this.dataSource.data = this.dataSource.data.filter(m => m !== movie)
    );
  }

  editMovie(movie: Movie) {
    this.userServerService.saveMovieToEdit(movie);
    this.router.navigateByUrl('/editMovie');
  }

}
