import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyABape7FpBN1rfhEt0RicUSaWd7-R-zP-U",
  authDomain: "carwash-f1a5b.firebaseapp.com",
  databaseURL: "https://carwash-f1a5b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carwash-f1a5b",
  storageBucket: "carwash-f1a5b.appspot.com",
  messagingSenderId: "689922790222",
  appId: "1:689922790222:web:84b36268590c39cfca041f",
  measurementId: "G-NZD4N1X7MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
// Logout button
const logoutButton = document.getElementById("logoutbtn");

// Logout event listener
logoutButton.addEventListener("click", function() {
  // Sign out the user
  auth.signOut().then(() => {
    // Logout successful
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    console.log("User logged out successfully");
    // Redirect to the login page or any other desired page
    window.location.href = "../login.html";
  }).catch((error) => {
    // An error occurred during logout
    console.log("Error occurred during logout: ", error);
  });
});


// Get the currently logged-in user
const user = auth.currentUser;

// Check if the user exists and has the email "aimanahmad0004@gmail.com"
if (user && user.email !== "aimanahmad0004@gmail.com") {
  // Display pop-up message
  alert("You are not authorized for this page.");
  
  // Redirect the user to their respective page
  const customerPage = "customer/home.html";
  const currentPage = window.location.pathname;
  
  if (currentPage.indexOf("admin") > -1) {
    window.location.href = customerPage;
  }
}

