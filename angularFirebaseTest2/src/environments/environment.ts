// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// tu mme data ktore sa tykaju našho prepojenia s firebase databazou
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAhIivuGL-s17pqk6HkpPQS-5QWEgo2f7s',
    authDomain: 'fir-test-6d187.firebaseapp.com',
    databaseURL: 'https://fir-test-6d187.firebaseio.com',
    projectId: 'fir-test-6d187',
    storageBucket: 'fir-test-6d187.appspot.com',
    messagingSenderId: '587381209113',
    appId: '1:587381209113:web:c3df3a969b78ceb478d288',
    measurementId: 'G-7RV0C2ZXP1'
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
