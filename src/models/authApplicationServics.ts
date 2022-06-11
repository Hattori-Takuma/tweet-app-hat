import { auth, googleAuthProvider } from "../plugins/firebase"

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //const auth = getAuth();
  //auth.languageCode = 'it';
  //provider.setCustomParameters({ 'login_hint': 'user@example.com'});



  await signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("🚀 ~ file: firebase.js ~ line 32 ~ .then ~ user", user)
      // ...

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log("🚀 ~ file: firebase.js ~ line 37 ~ .then ~ errorCode", errorCode)
      const errorMessage = error.message;
      console.log("🚀 ~ file: firebase.js ~ line 39 ~ .then ~ errorMessage", errorMessage)
      // The email of the user's account used.
      const email = error.email;
      console.log("🚀 ~ file: firebase.js ~ line 42 ~ .then ~ email", email)
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("🚀 ~ file: firebase.js ~ line 45 ~ .then ~ credential", credential)
      // ...

    });

}