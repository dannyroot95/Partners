
var config = {
  apiKey: "AIzaSyB0Q44TruQYFZ2Kz1BYapW5UB2eiAj2ZRw",
  authDomain: "gestor-de-pedidos-aukdefood.firebaseapp.com",
  databaseURL: "https://gestor-de-pedidos-aukdefood.firebaseio.com",
  projectId: "gestor-de-pedidos-aukdefood",
  storageBucket: "gestor-de-pedidos-aukdefood.appspot.com",
  messagingSenderId: "550027089460",
  appId: "1:550027089460:web:c5cbabed185feab0215c61",
  measurementId: "G-VZGVWLNCNZ"
};
firebase.initializeApp(config);

// empty - > for collection
// exist -> for document

function logout(){
    window.localStorage.clear();
    firebase.auth().signOut();
    location.reload();
  }

