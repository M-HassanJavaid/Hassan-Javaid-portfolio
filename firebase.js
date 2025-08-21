import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDudyVTE8RCclW_5CEZKClKDoebYNmb0wE",
    authDomain: "portfolio-website-7f4fa.firebaseapp.com",
    projectId: "portfolio-website-7f4fa",
    storageBucket: "portfolio-website-7f4fa.firebasestorage.app",
    messagingSenderId: "474681516537",
    appId: "1:474681516537:web:2520de4f9295d5ad4f5d28",
    measurementId: "G-T39QG8STYH"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

let projectsCollection = collection(db, 'projects');

export async function getProjects() {
    let snaps  = await getDocs(projectsCollection);
    let data = [];
    snaps.forEach((snap)=>{
        data.push(snap.data());
    });

    return data
}


