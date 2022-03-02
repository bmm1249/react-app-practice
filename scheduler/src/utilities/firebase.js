import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCncU1T1_pImzqvxLY6ioxe6F0R8_ubNiw",
    authDomain: "fir-project-practice0293.firebaseapp.com",
    databaseURL: "https://fir-project-practice0293-default-rtdb.firebaseio.com",
    projectId: "fir-project-practice0293",
    storageBucket: "fir-project-practice0293.appspot.com",
    messagingSenderId: "834379010769",
    appId: "1:834379010769:web:ef9e589da6d2f57c9d6bf0",
    measurementId: "G-XWZYNTELCM"
  };

  const firebase = initializeApp(firebaseConfig);
  const database = getDatabase(firebase);

  export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };