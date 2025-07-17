// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase Auth
const auth = getAuth();

// Sign Up Function
window.signupUser = function () {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const termsChecked = document.getElementById('terms').checked;

  if (!termsChecked) {
    alert("Please agree to the Terms & Conditions");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Sign up successful! Now login.");
      showForm('login');
    })
    .catch((error) => {
      alert("Signup Error: " + error.message);
    });
}

// Login Function
window.loginUser = function () {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // Next: create this page
    })
    .catch((error) => {
      alert("Login Error: " + error.message);
    });
}
