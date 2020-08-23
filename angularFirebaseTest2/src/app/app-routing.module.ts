import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanDeactivate } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { DeactivateGuard } from './guards/deactivate.guard';
import { AddMovieComponent } from './add-movie/add-movie/add-movie.component';
import { MoviesTableComponent } from './movies-table/movies-table/movies-table.component';
import { MovieEditComponent } from './edit-movie/movie-edit/movie-edit.component';

// pole Routes ktoré obsahuje naše routy - url adresy na ktorých su ine componenty alebo moduly
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent },
  {path: 'editProfile', component: EditProfileComponent},
  // tu sme použili canDeactivate: DeactivateGuard preto lebo guardi sa pišu do danej routy
  // pretože cela funkcionalita guardov sa týka blokovania, aktivovania, naloadovania Routes
  {path: 'register', component: RegisterComponent, canDeactivate: [DeactivateGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersTableComponent},
  {path: 'addmovie', component: AddMovieComponent},
  {path: 'movies', component: MoviesTableComponent},
  {path: 'editMovie', component: MovieEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
