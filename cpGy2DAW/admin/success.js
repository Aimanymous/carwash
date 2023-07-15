import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


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

function clearDatabookEl() {
  databookEl.innerHTML = "";
}

function appendItemTodatabookEl(item, itemID) {
  const itemValue = item;

  const newRow = document.createElement("tr");
  newRow.setAttribute("data-item-id", itemID);

  const emailCell = document.createElement("td");
  emailCell.textContent = itemValue.email ? itemValue.email : "N/A";
  newRow.appendChild(emailCell);

  const dateCell = document.createElement("td");
  dateCell.textContent = itemValue.date ? itemValue.date : "N/A";
  newRow.appendChild(dateCell);

  const timeCell = document.createElement("td");
  timeCell.textContent = itemValue.time ? itemValue.time : "N/A";
  newRow.appendChild(timeCell);

  const addonsCell = document.createElement("td");
  addonsCell.textContent = itemValue.addons ? itemValue.addons : "N/A";
  newRow.appendChild(addonsCell);

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
   const confirmation = confirm("Are you sure you want to delete this item?");
  if (confirmation) {
  const itemRef = ref(database, `accepted/${itemID}`);
  remove(itemRef)
    .then(() => {
      console.log("Item deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
}
}


  