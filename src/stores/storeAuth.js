import { defineStore } from 'pinia';
import { auth } from '@/js/firebase';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useStoreNotes } from './storeNotes';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push('/');
          storeNotes.init();
        } else {
          this.user = {};
          this.router.replace('/auth');
          storeNotes.clearNotes();
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log('error message : ', error.message);
        });
      console.log('registered user :', credentials);
    },
    loginUser(credentials) {
      // console.log('login user : ', credentials);
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log('user login : ', user);
        })
        .catch((error) => {
          console.log('error message : ', error.message);
        });
    },
    logOutUser() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log('User siggned Out');
        })
        .catch((error) => {
          // An error happened.
          console.log(error.message);
        });
    },
  },
});
