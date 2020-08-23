import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { MoviesTableComponent } from './movies-table/movies-table/movies-table.component';
import { MovieEditComponent } from './edit-movie/movie-edit/movie-edit.component';
import { AddMovieComponent } from './add-movie/add-movie/add-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditProfileComponent,
    UsersTableComponent,
    MoviesTableComponent,
    MovieEditComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    // initializovanie udajov prepojenia z firebase z enviromentu do AngularFireModule
    // prečo do AngularFireModulu? aby sme vedeli všetky veci z tohto modulu použivať
    // ako napr. metody, objekty atd
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule // routing musi byt vzdy posledny
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
