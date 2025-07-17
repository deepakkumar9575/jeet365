// dashboard.js
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const coinBalance = document.getElementById("coinBalance");
const requestForm = document.getElementById("requestForm");
const requestType = document.getElementById("requestType");
const requestAmount = document.getElementById("requestAmount");

let currentUser = null;

// Check login status
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      coinBalance.innerText = data.coins ?? 0;
    } else {
      // First time login
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        coins: 0,
      });
      coinBalance.innerText = 0;
    }
  } else {
    window.location.href = "login.html";
  }
});

// Submit coin add/withdraw request
requestForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = parseInt(requestAmount.value);
  const type = requestType.value;

  if (!currentUser || isNaN(amount) || amount <= 0) {
    alert("Invalid request");
    return;
  }

  await addDoc(collection(db, "requests"), {
    uid: currentUser.uid,
    email: currentUser.email,
    type: type,
    amount: amount,
    status: "pending",
    time: Date.now(),
  });

  alert("Request submitted successfully!");
  requestForm.reset();
});

// Logout function
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
}
