import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';

// Firebase configuration (replace with your Firebase project details)
const firebaseConfig = {
    apiKey: "AIzaSyDH6VMYtDqQwP6wwITnbjS7N4ZLGOhFaWk",
    authDomain: "ecommerceplatform-a9456.firebaseapp.com",
    projectId: "ecommerceplatform-a9456",
    storageBucket: "ecommerceplatform-a9456.appspot.com",
    messagingSenderId: "1025199854400",
    appId: "1:1025199854400:web:75ba31d0f0fa62109ee0a5"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(firebaseApp);

const uploadToFirebase = async (req, res, next) => {
  const bucketRef = ref(storage, req.file.processedFilePath);


  const file = fs.readFileSync(req.file.processedFilePath);
  const metadata = {
    contentType: 'image/png',
  };

  try {
    // Upload the file to Firebase Storage
    await uploadBytes(bucketRef, file, metadata);

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(bucketRef);
    
    // Attach the Firebase URL to the request object
    req.file.firebaseUrl = downloadURL;
    console.log(downloadURL)
    next();
  } catch (error) {
    next(error);
  }
};

export default uploadToFirebase;
