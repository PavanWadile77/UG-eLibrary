require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID
});

const db = getFirestore(app);

const newCollege = {
  dteCode: '5545',
  name: "SVKM's College of Engineering, Shirpur, Dhule, Dahivad (EN-05545)",
  district: 'Dhule',
  university: 'DBATU, Lonere',
  courseTypes: 'B.Tech',
  branches: 'Computer Science and Engineering, Information Technology, Electronics and Computer Engineering, Data Science',
  status: 'Active'
};

setDoc(doc(db, 'colleges', '5545'), newCollege)
  .then(() => {
    console.log('Firestore document created successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to create document:', err);
    process.exit(1);
  });
