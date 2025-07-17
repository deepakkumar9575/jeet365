// js/game.js
import { auth, db } from '../firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const balanceDisplay = document.getElementById("gameCoinBalance");
const form = document.getElementById("colorGameForm");
const resultDiv = document.getElementById("gameResult");

let currentUser = null;

// Check user login
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    await loadBalance();
  } else {
    alert("Please login to play.");
    window.location.href = "login.html";
  }
});

// Load current coin balance
async function loadBalance() {
  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    balanceDisplay.textContent = data.coins || 0;
  }
}

// Handle game play
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const betAmount = parseInt(document.getElementById("betAmount").value);
  const colorChoice = document.getElementById("colorChoice").value;

  if (betAmount < 10) {
    alert("Minimum bet is 10 coins.");
    return;
  }

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  let currentCoins = userData.coins || 0;

  if (currentCoins < betAmount) {
    alert("Insufficient coins!");
    return;
  }

  // Deduct coins for the bet
  currentCoins -= betAmount;

  // Prediction Logic: 80% chance win
  const win = Math.random() < 0.8;

  let winningColor = generateColor();
  const isWin = colorChoice === winningColor;

  if (win && isWin) {
    const winAmount = betAmount * 2;
    currentCoins += winAmount;
    resultDiv.innerHTML = `<p style="color:green;">🎉 You won! Color was ${winningColor}. +${winAmount} coins</p>`;
  } else {
    resultDiv.innerHTML = `<p style="color:red;">❌ You lost! Color was ${winningColor}. -${betAmount} coins</p>`;
  }

  // Update balance
  await updateDoc(userRef, { coins: currentCoins });
  balanceDisplay.textContent = currentCoins;
  form.reset();
});

// Random color generator
function generateColor() {
  const colors = ["red", "green", "violet"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function goBack() {
  window.location.href = "dashboard.html";
}
