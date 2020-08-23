import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/entities/User';
import { Observable, from, Subject, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Movie } from 'src/entities/Movie';
import { Reference } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class UsersServerService {

  private movieToEdit: Movie;

  // toto je list ktorý ma obsahovať userov z firebase databazy
  users: AngularFireList<User> = null;
  movies: AngularFireList<Movie> = null;

  // zadefinovali sme si cestu ako tých userov budeme ukladat pri vytvorení napr. jedneho usera
  // čiže pod menom users budú useri ktorý su vytvorení kazdy jeden samostatne
  dbPath = '/users';
  dbPath2 = '/movies';

  // injectli sme si databazu firebase, firebase auntentifikaciu, a router
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
    // do premeny users pomocou db: AngularFireDatabase zadefinujeme ktorý konkretny list budeme mat v premennej
    // cite nas list bude list s cestou /users a pod ním vytvorení useri
    this.users = db.list(this.dbPath);
    this.movies = db.list(this.dbPath2);
  }

  // toto je nečo ako observable (prud dat)
  // vyuzil som ho nato ze ked sa user logne tak vtedy sa zmeni hodnota na true
  // a na zaklade počuvania (subscribe) tejto observable sa v menu skryju nazvy v menu
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // metoda na zmenenie hodnoty (true alebo false) premennej vyššie
  changeData(value: boolean) {
    this.status.next(value);
  }

  // metoda na getnutie usera z firebasu
  getUser(uid: string): Observable<any> {
    // z našho listu userov
     return this.db.list('users', ref => {
       // returneme referenciu dát ktorá
       return ref
       // je zoradená podla uid
       .orderByChild('uid')
       // rovna sa uid
       .equalTo(uid)
       // a limitovana je len na jeden záznam
       .limitToFirst(1);
      }).valueChanges();
      // valuChanges() preto lebo takto vracia metoda observable
  }

  getUsers(): Observable<any> {
    return this.db.list('users', ref => {
      return ref
      .orderByChild('uid');
    }).valueChanges();
  }

  // metoda dosť podobna tej vyššie (getUser)
  // len tato metoda služi na updatnutie usera
  // nato potrebujeme všetky data - name, email, active, uid
  // keby daco nasli ste na stackoverflow
  updateUser( _name: string, _email: string, _active: boolean, uid: string): Observable<any> {
    const ref = firebase.database().ref('users');
    this.afAuth.auth.currentUser.updateEmail(_email);
    return from(ref.orderByChild('uid').equalTo(uid).once('value', snapshot => {
      snapshot.forEach( user => {
        user.ref.update({
          name: _name,
          email: _email,
          active: _active
        });
      });
    })
  );
}

  // registracia usera cez firebase auth
  SignUp(user: User) {
    // vytvorime v databaze authentifikacie firebasu usera s emailom a heslom
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      // potom ked nam pride vysledok
      .then((result) => {

        // pusheneme usera do druhej databazy do listu /users
        this.users.push({
          email: user.email,
          name: user.name,
          uid: result.user.uid,
          password: user.password,
          active: user.active
        });

        // ked to vsetko skonči preroutujeme sa na login
        this.router.navigate(['login']);
        // window.alert('You have been successfully registered!');
      }).catch((error) => {
        // error
        window.alert(error.message);
      });
  }

  // prihlasenie usera cez firebase auth
  SignIn(user) {
    // to iste co vyssie len sa prihlasujeme
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {

          // ulozime usera do local storagu
          this.saveUserToLocalStorage(result);

          // a preroutujeme sa na profile
          this.router.navigate(['profile']);
      }).catch((error) => {
        // error
        window.alert(error.message);
      });
  }

  // odhlasenie usera
  SignOut(): Observable<void> {
    // pomocou operatora from() vytvorime s promisu Observable (prúd dát)
    // musime sa odhlasiť z firebase auth
    return from(this.afAuth.auth.signOut().then(() => {
      // a potom vymazeme usera z localStorage
      this.removeFromLocalStorage();
      // a preorutujeme sa na login
      this.router.navigate(['login']);
    }));
}

  // ulozenie usera do localStorage
  saveUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // getnutie usera z localStorage
  getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // vymazanie usera z localStorage
  removeFromLocalStorage(): void {
    localStorage.clear();
  }

  deleteUser(user: User): Observable<any> {
    const ref = firebase.database().ref('users');
    return from(ref.orderByChild('uid').equalTo(user.uid).once('value', snapshot => {
      snapshot.forEach( user => {
        user.ref.remove();
      });
    })
  );
}

addMovie(movie: Movie): Observable<any> {
  return from(this.movies.push({
    name: movie.name,
    genre: movie.genre,
    year: movie.year,
    id: movie.id,
    uid: movie.uid
  }));
}

updateMovie( _name: string, _genre: string, _year: number, _id: string, _uid: string): Observable<any> {
  const ref = firebase.database().ref('movies');
  return from(ref.orderByChild('id').equalTo(_id).once('value', snapshot => {
    snapshot.forEach( movie => {
      movie.ref.update({
        name: _name,
        genre: _genre,
        year: _year
      });
    });
  })
);
}

deleteMovie(movie: Movie) {
    const ref = firebase.database().ref('movies');
    return from(ref.orderByChild('id').equalTo(movie.id).once('value', snapshot => {
      snapshot.forEach( user => {
        user.ref.remove();
      });
    })
  );
}

getMovieList(_uid: string): Observable<any> {
  return this.db.list('movies', ref => {
    return ref
    .orderByChild('uid')
    .equalTo(_uid);
  }).valueChanges();
}

saveMovieToEdit(movie: Movie) {
  this.movieToEdit = movie;
}

loadMovieToEdit() {
  return this.movieToEdit;
}

}
