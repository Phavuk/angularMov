// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// tu mme data ktore sa tykaju našho prepojenia s firebase databazou
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCkA6Er6kuDWPmMvwDM4tPibbSDLQ6EQr0",
    authDomain: "angularmovie-c0afc.firebaseapp.com",
    databaseURL: "https://angularmovie-c0afc.firebaseio.com",
    projectId: "angularmovie-c0afc",
    storageBucket: "angularmovie-c0afc.appspot.com",
    messagingSenderId: "314127289361",
    appId: "1:314127289361:web:d6ac27b194199f45a5b5b0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
