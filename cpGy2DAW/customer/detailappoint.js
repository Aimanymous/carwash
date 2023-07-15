import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, remove, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const submitsButton = document.getElementById("submits");
const centreEl = document.getElementById("centre");
const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");
const addonsEl = document.getElementById("addons");
const cancelButton = document.getElementById("cancel");
// Function to populate the table with data
function populateTable(data) {
  const { carwashcentre, date, time, addons } = data;

  centreEl.textContent = carwashcentre;
  dateEl.textContent = date;
  timeEl.textContent = time;
  addonsEl.textContent = addons;
}

// Function to cancel the appointment
function cancelAppointment() {
  const databookRef = ref(database, "databook");
  onValue(databookRef, (snapshot) => {
    const databookData = snapshot.val();
    if (databookData) {
      const appointmentKeys = Object.keys(databookData);
      const latestAppointmentId = appointmentKeys[appointmentKeys.length - 1]; // Get the ID of the latest appointment
      const appointmentRef = ref(database, `databook/${latestAppointmentId}`);
      
      remove(appointmentRef)
        .then(() => {
          // Appointment removed successfully
          // You can add any additional logic or UI updates here after canceling the appointment
          console.log("Appointment canceled successfully");
        })
        .catch((error) => {
          console.error("Error removing appointment:", error);
         });
    }
  }, {
    onlyOnce: true // Make sure the callback is triggered only once
  });
}

// Retrieve the appointment details from the database
const databookRef = ref(database, "databook"); // Change "databook" to the appropriate reference based on your database structure

onValue(databookRef, (snapshot) => {
  const databookData = snapshot.val();
  if (databookData) {
    const appointmentKeys = Object.keys(databookData);
    const latestAppointmentId = appointmentKeys[appointmentKeys.length - 1]; // Get the ID of the latest appointment
    const latestAppointmentData = databookData[latestAppointmentId];
    populateTable(latestAppointmentData);
  }
});

submitsButton.addEventListener("click", function() {
  window.location.href = "history.html";
});

cancelButton.addEventListener("click", function() {
  cancelAppointment();
  window.location.href = "service.html";
});