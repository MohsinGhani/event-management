import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDHFni_ZwpQzjk4HgBwEV5kc82tF0CPHr0",
    authDomain: "event-management-system-d2eff.firebaseapp.com",
    databaseURL: "https://event-management-system-d2eff.firebaseio.com",
    projectId: "event-management-system-d2eff",
    storageBucket: "",
    messagingSenderId: "875811158427",
    appId: "1:875811158427:web:6ab2eb257c527b09"
  });

  const db = firebaseApp.firestore()
  export { db }