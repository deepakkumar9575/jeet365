// Jeet365 - Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Replace these values with your Firebase project's credentials
const firebaseConfig = {
  apiKey: "AIzaSyAhp9goPQy1g4JQh_Jw0lc3mHv8dWqCy1Q",
  authDomain: "jeet365-fabf2.firebaseapp.com",
  projectId: "jeet365-fabf2",
  storageBucket: "jeet365-fabf2.appspot.com",
  messagingSenderId: "254181142456",
  appId: "1:254181142456:web:283c3abe5a76c71bd0294d",
  measurementId: "G-7P3Z0M8995"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and DB
export const auth = getAuth(app);
export const db = getFirestore(app);
