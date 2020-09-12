import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB-B0PIEt1V5oErdamdtXsqTAVaXEO6-e4",
    authDomain: "todo-cd3fe.firebaseapp.com",
    databaseURL: "https://todo-cd3fe.firebaseio.com",
    projectId: "todo-cd3fe",
    storageBucket: "todo-cd3fe.appspot.com",
    messagingSenderId: "270468605963",
    appId: "1:270468605963:web:ab8adab9bb0d7039767f0e",
    measurementId: "G-SW272BCBVQ"
};

firebase.initializeApp(firebaseConfig)

firebase.firestore()

export default firebase;