import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import FirebaseContext,{withFirebase} from './context'

const firebaseConfig = {
    apiKey: "AIzaSyDGR2iXr_Kt8NecU8Er5--MKz1iHgxe7zI",
    authDomain: "itla-crush-web.firebaseapp.com",
    databaseURL: "https://itla-crush-web.firebaseio.com",
    projectId: "itla-crush-web",
    storageBucket: "",
    messagingSenderId: "870136251980",
    appId: "1:870136251980:web:9286c25055202ae3"
  };
  // Initialize Firebase
class Firebase {
  constructor(){
    app.initializeApp(firebaseConfig);
    this.serverValue = app.database.ServerValue
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    this.auth = app.auth();
    this.db = app.database();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
    
    publication = uid => this.db.ref(`publication/${uid}`)
    publication = () => this.db.ref('publication/')

}
export default Firebase;

export {FirebaseContext, withFirebase}