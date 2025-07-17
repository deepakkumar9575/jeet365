// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase Auth
const auth = getAuth();

// Replace your existing signupUser with this 👇
window.signupUser = async function () {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const agreed = document.getElementById('terms').checked;
  if (!agreed) { alert("Please agree to Terms"); return; }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // ⬇️ create Firestore doc with 100 coins
    await setDoc(doc(db, "users", cred.user.uid), {
      email: cred.user.email,
      coins: 100,
      createdAt: Date.now()
    });

    alert("Signup successful! You’ve received 100 coins 👌");
    showForm('login');
  } catch (err) {
    alert("Signup Error: " + err.message);
  }
};
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
