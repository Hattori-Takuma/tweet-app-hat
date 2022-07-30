import { getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp, collection, query, addDoc, getDocs } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from "firebase/storage";


console.log(process.env.REACT_APP_API_KEY, "test")

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

export const setData = async (message: string) => {
  await addDoc(collection(db, "message"), {
    name: "loginuserName",
    message: message,
    time: serverTimestamp()
  });
  console.log("Document written with ID: ")
}




export const readData = async () => {
  console.log('readData')
  const q = query(collection(db, "message"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

export const uploadeImage = async (file: File) => {
  console.log(file, "=========")
  const random = Math.random().toString(32).substring(2)
  try {
    const storageRef = await ref(storage, `hattori/${random}.png`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    });
  } catch (error) {
    console.log(error
    )
  }
}

export const readImage = () => {


  const pathReference = ref(storage, 'images/stars.jpg');
  // Create a reference from a Google Cloud Storage URI
  const gsReference = ref(storage, 'gs://bucket/images/stars.jpg');
  // Create a reference from an HTTPS URL
  // Note that in the URL, characters are URL escaped!
  const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');

}



