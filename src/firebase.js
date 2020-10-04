import firebase from 'firebase/app';
import 'firebase/firestore'

  var firebaseConfig = {
    apiKey: "AIzaSyAoebQ-U6ByO-KSWq9wVYQ8zDiIt-n3zaI",
    authDomain: "fir-crud-react-9e34e.firebaseapp.com",
    databaseURL: "https://fir-crud-react-9e34e.firebaseio.com",
    projectId: "fir-crud-react-9e34e",
    storageBucket: "fir-crud-react-9e34e.appspot.com",
    messagingSenderId: "205287111367",
    appId: "1:205287111367:web:213e096f45cc5710c2dce2",
    measurementId: "G-V42M3N6015"
  };
  // Initialize Firebase
 const fb =  firebase.initializeApp(firebaseConfig);

export const fs = fb.firestore();