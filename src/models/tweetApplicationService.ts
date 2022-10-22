import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../plugins/firebase";

export const db = getFirestore();

export const sendMessageAndUploadeImage = async (uname: string, message: string, file: File) => {
  const random = Math.random().toString(32).substring(2);
  try {
    const storageRef = await ref(storage, `hattori/${random}_test.png`);
    uploadBytesResumable(storageRef, file);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
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
          sendMessage(uname, message, downloadURL)
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const sendCommentAndUploadeImage = async (uname: string, message: string, file: File) => {
  const random = Math.random().toString(32).substring(2);
  try {
    const storageRef = await ref(storage, `hattori/${random}_test.png`);
    uploadBytesResumable(storageRef, file);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
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
          sendMessage(uname, message, downloadURL)
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (uname: string, message: string, imageUrl: string) => {
  await addDoc(collection(db, "message"), {
    name: uname,
    message: message,
    imageUrl: imageUrl,
    time: serverTimestamp()
  });
  console.log(`DBへ保存完了 username : [${uname}] message : [${message}] imageUrl : [${imageUrl}]`)
}

export const setData = async (uname: string, message: string, uphotoUrl: string, imageUrl?: string) => {

  console.log(message)
  console.log(imageUrl)
  console.log(uphotoUrl)
  await addDoc(collection(db, "message"), {
    name: uname,
    message: message,
    photoUrl: uphotoUrl,
    imageUrl: imageUrl === undefined ? "" : imageUrl,
    time: serverTimestamp()
  });
  console.log("Document written with ID: ")
}

export const setComentData = async (uname: string, comment: string, id: string) => {
  console.log(comment)
  await addDoc(collection(db, "message", id, "comment"), {
    name: uname,
    comment: comment,
    time: serverTimestamp()
  })
}