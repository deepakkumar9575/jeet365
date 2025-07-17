// firebase-config.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIazwoh9hesNYpT5ywc-aX3qnj4UcGhKY",
  authDomain: "jeet365-fabf2.firebaseapp.com",
  projectId: "jeet365-fabf2",
  storageBucket: "jeet365-fabf2.appspot.com",  // corrected
  messagingSenderId: "862480702968",
  appId: "1:862480702968:web:fe41c67573c82cb7ec4a0d",
  measurementId: "G-LZRXW175NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { auth, db };
