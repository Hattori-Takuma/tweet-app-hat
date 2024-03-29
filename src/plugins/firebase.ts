import { getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, serverTimestamp, doc, orderBy } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
// 初期化
const apps = getApps
if (!apps.length) {
  initializeApp(firebaseConfig)
}
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage()

export const googleAuthProvider = new GoogleAuthProvider();

export const setData = async (message: string, imageUrl?: string) => {

  console.log(message)
  console.log(imageUrl)
  await addDoc(collection(db, "message"), {
    name: "loginuserName",
    message: message,
    imageUrl: imageUrl === undefined ? "" : imageUrl,
    time: serverTimestamp()
  });
  console.log("Document written with ID: ")
}

export const setComentData = async (comment: string, id: string) => {
  console.log(comment)
  await addDoc(collection(db, "message", id, "comment"), {
    name: "loginuserName",
    comment: comment,
    time: serverTimestamp()
  })
}




export const commentRef = async (chat: any) => {
  doc(db, "message", chat.id, "comment", "message1");
}


export const readData = async () => {
  console.log('readData')
  const q = query(collection(db, "message"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

export const readCommentData = async (id: string) => {
  console.log("readCommentData")
  const q = query(collection(db, "message", id, "comment"), orderBy('time', 'desc'));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

}




export const uploadeImage = async (file: File) => {
  const random = Math.random().toString(32).substring(2);
  try {
    const storageRef = await ref(storage, `hattori/${random}_test.png`);
    uploadBytesResumable(storageRef, file);
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(
          '🚀 ~ file: firebase.ts ~ line 65 ~ uploadeImage ~ snapshot.state',
          snapshot.state
        );
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused : ', snapshot.state);
            break;
          case 'running':
            console.log('Upload is running : ', snapshot.state);
            break;
        }
      },
      (error) => {
        console.log(
          '🚀 ~ file: Tweet.tsx ~ line 93 ~ uploadeImage ~ error',
          error
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(
            '🚀 ~ file: Tweet.tsx ~ line 97 ~ getDownloadURL ~ downloadURL',
            downloadURL
          );
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};


export const readImage = () => {
  const pathReference = ref(storage, 'images/stars.jpg');
  // Create a reference from a Google Cloud Storage URI
  const gsReference = ref(storage, 'gs://bucket/images/stars.jpg');
  // Create a reference from an HTTPS URL
  // Note that in the URL, characters are URL escaped!
  const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
}

export const setComment = async (message: string, imageUrl?: string) => {
  console.log(message)
  console.log(imageUrl)
  await addDoc(collection(db, "message"), {
    name: "loginuserName",
    message: message,
    imageUrl: imageUrl === undefined ? "" : imageUrl,
    time: serverTimestamp()
  });
  console.log("Document written with ID: ")
}

export const sendMessage = async (uname: string, message: string, imageUrl: string) => {
  await addDoc(collection(db, "message"), {
    name: uname,
    message: message,
    imageUrl: imageUrl,
    time: serverTimestamp()
  });
  console.log(`DBへ保存完了 username : [${uname}] message : [${message}] imageUrl : [${imageUrl}]`)
}

