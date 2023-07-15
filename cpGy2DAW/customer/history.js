import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

const databookEl = document.getElementById("history-container");

function cleardatabookEl() {
  databookEl.innerHTML = "";
}

function appendItemTodatabookEl(item) {
  const itemID = item[0];
  const itemValue = item[1];

  const newRow = document.createElement("tr");

  const carwashCentreCell = document.createElement("td");
  carwashCentreCell.textContent = itemValue.carwashcentre;
  newRow.appendChild(carwashCentreCell);

  const dateCell = document.createElement("td");
  dateCell.textContent = itemValue.date;
  newRow.appendChild(dateCell);

  const timeCell = document.createElement("td");
  timeCell.textContent = itemValue.time;
  newRow.appendChild(timeCell);

  const addonsCell = document.createElement("td");
  addonsCell.textContent = itemValue.addons;
  newRow.appendChild(addonsCell);

  const paymentCell = document.createElement("td");
  paymentCell.textContent = itemValue.payment;
  newRow.appendChild(paymentCell);
  
 const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteItem(itemID);
  });
  deleteCell.appendChild(deleteButton);
  newRow.appendChild(deleteCell);

  databookEl.appendChild(newRow);
}

function deleteItem(itemID) {
  const itemRef = ref(database, `databook/${itemID}`);
  remove(itemRef)
    .then(() => {
      console.log("Appointment deleted successfully");
      
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
}
  

// Get the history data for the current user
auth.onAuthStateChanged((user) => {
  if (user) {
    const email = user.email;
    const dataRef = ref(database, "databook");

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists() && data !== null) {
        cleardatabookEl();
        const dataArray = Object.entries(data);
        for (let i = 0; i < dataArray.length; i++) {
          const currentItem = dataArray[i];
          const currentItemEmail = currentItem[1].email; // Assuming email is stored in the 'email' property of the data
          if (currentItemEmail === email) {
            appendItemTodatabookEl(currentItem);
          }
        }
      } else {
        databookEl.textContent = "No items added yet!";
      }
    });
  }
});