import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyABape7FpBN1rfhEt0RicUSaWd7-R-zP-U",
  authDomain: "carwash-f1a5b.firebaseapp.com",
  projectId: "carwash-f1a5b",
  storageBucket: "carwash-f1a5b.appspot.com",
  messagingSenderId: "689922790222",
  appId: "1:689922790222:web:84b36268590c39cfca041f",
  measurementId: "G-NZD4N1X7MK"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const forgotPasswordLink = document.getElementById("forgot-password");

forgotPasswordLink.addEventListener("click", function() {
  const email = window.prompt("Please enter your email address:");
  
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        window.alert("Password reset email has been sent. Please check your inbox.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Error occurred. Try again.");
      });
  }
});


