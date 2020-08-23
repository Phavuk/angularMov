import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { UsersServerService } from '../../../services/users-server.service';
import { Movie } from 'src/entities/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

    movieToSend = new Movie();
    uniqueId: string = (new Date().getTime()).toString(36);

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
        '', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]),
    });

    // getter na name formcontrol
    get name() {
      return this.addForm.get('name');
    }

    // getter na email formcontrol
    get genre() {
      return this.addForm.get('genre');
    }

    // getter na active formcontrol
    get year() {
      return this.addForm.get('year');
    }

  constructor(private userServerService: UsersServerService, private router: Router) { }

  ngOnInit(): void {
    // gettnutie uid z usera ktory je v local storage cez náš UserServerService
    this.uid = this.userServerService.getUserFromLocalStorage().user.uid;
  }

  submitForm() {

    this.movieToSend.name = this.name.value;
    this.movieToSend.genre = this.genre.value;
    this.movieToSend.year = this.year.value;
    this.movieToSend.id = this.uniqueId;
    this.movieToSend.uid = this.uid;

    this.userServerService.addMovie(this.movieToSend).subscribe( () => {
        console.log(`saved`);
        this.router.navigateByUrl('/movies');
    });
  }
}
