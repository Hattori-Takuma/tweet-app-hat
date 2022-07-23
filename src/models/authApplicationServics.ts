import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../plugins/firebase";


export const googleLogin = async () => {
  return new Promise(function (resolve, reject) {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.displayName)
        console.log(user.email)
        console.log(user.uid)
        resolve(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        reject(error)
      });
  });
}


export const logout = async () => {
  await signOut(auth)
    .then(() => {
      console.log("successful")
    }).catch((error) => {
      console.log("error")
    });

}














