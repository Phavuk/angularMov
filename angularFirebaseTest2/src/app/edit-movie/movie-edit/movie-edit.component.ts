import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from 'src/entities/Movie';
import { UsersServerService } from 'src/services/users-server.service';
import { User } from 'src/entities/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

    tempMovie: Movie;

    // uid premenna do ktorej dame unikatne uid
    uid: string;

    // reaktivny formular
    addForm = new FormGroup({
      // input name vo formulari
      name: new FormControl(
        '', [Validators.required, Validators.minLength(3)]
      ),
      // input email vo formulari
      genre: new FormControl(
        '', [Validators.required]
      ),
      year: new FormControl(
        '', [Validators.required, Validators.minLength(3)]),
    });

    // getter na name formcontrol
    get name() {
      return this.addForm.get('name');
    }

    // getter na genre formcontrol
    get genre() {
      return this.addForm.get('genre');
    }

    // getter na year formcontrol
    get year() {
      return this.addForm.get('year');
    }

  constructor(private userServerService: UsersServerService, private router: Router) { }

  ngOnInit(): void {
    this.tempMovie = this.userServerService.loadMovieToEdit();
    this.name.setValue(this.tempMovie.name);
    this.genre.setValue(this.tempMovie.genre);
    this.year.setValue(this.tempMovie.year);
  }

  submitForm() {
      this.userServerService.updateMovie(
        this.name.value,
        this.genre.value,
        this.year.value,
        this.tempMovie.id,
        this.tempMovie.uid
      ).subscribe(() => {
        this.router.navigateByUrl('/movies');
      });
  }

}
