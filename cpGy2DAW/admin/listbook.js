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
const acceptedItems = new Set();
const databookEl = document.getElementById("history-container");

function cleardatabookEl() {
  databookEl.innerHTML = "";
}

function appendItemTodatabookEl(item, itemID) {
  const itemValue = item;

  const newRow = document.createElement("tr");
  newRow.setAttribute("data-item-id", itemID);

  const carwashCentreCell = document.createElement("td");
  carwashCentreCell.textContent = itemValue.carwashcentre ? itemValue.carwashcentre : "N/A";
  newRow.appendChild(carwashCentreCell);

  const dateCell = document.createElement("td");
  dateCell.textContent = itemValue.date ? itemValue.date : "N/A";
  newRow.appendChild(dateCell);

  const timeCell = document.createElement("td");
  timeCell.textContent = itemValue.time ? itemValue.time : "N/A";
  newRow.appendChild(timeCell);

  const addonsCell = document.createElement("td");
  addonsCell.textContent = itemValue.addons ? itemValue.addons : "N/A";
  newRow.appendChild(addonsCell);

  const acceptCell = document.createElement("td");
  const acceptButton = document.createElement("button");
  acceptButton.textContent = "Success";
  acceptButton.addEventListener("click", () => {
    acceptItem(itemID);
  });
  acceptCell.appendChild(acceptButton);
  newRow.appendChild(acceptCell);

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
function acceptItem(itemID) {
    const confirmation = confirm("Are you sure you want to mark this item as successful?");
  if (confirmation) {
  // Get the item reference from the "databook" database
  const dataRef = ref(database, `databook/${itemID}`);

  // Read the item data from the reference
  get(dataRef)
    .then((snapshot) => {
      const itemData = snapshot.val();

      // Add the item to the "accepted" database
      const acceptedRef = push(ref(database, "accepted"));
      set(acceptedRef, itemData)
       remove(dataRef)
            .then(() => {
              console.log("Item removed from databook database");
              const row = databookEl.querySelector(`[data-item-id="${itemID}"]`);
              if (row) {
                row.remove(); // Remove the corresponding row from the interface
              }
        })
        .catch((error) => {
          console.error("Error adding item to accepted database:", error);
        });
    })
    .catch((error) => {
      console.error("Error reading item data:", error);
    });
}
}

    
function deleteItem(itemID) {
   const confirmation = confirm("Are you sure you want to delete this item?");
  if (confirmation) {
  const itemRef = ref(database, `databook/${itemID}`);
  remove(itemRef)
    .then(() => {
      console.log("Item deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
}
}
function renderItemsInDatabook(groupedItems) {
  cleardatabookEl();

  for (const month in groupedItems) {
    const monthItems = groupedItems[month];
    // Create a month header row
    const monthHeaderRow = document.createElement("tr");
    const monthHeaderCell = document.createElement("td");
    monthHeaderCell.setAttribute("colspan", "5");
    monthHeaderCell.textContent = month;
    monthHeaderRow.appendChild(monthHeaderCell);
    databookEl.appendChild(monthHeaderRow);

    // Render items in the month
    monthItems.forEach((item) => {
      appendItemTodatabookEl(item, item.itemID);
    });
  }
}

function groupItemsByMonth(dataArray) {
  const groupedItems = {};

  dataArray.forEach(([itemID, itemValue]) => {
    const date = itemValue.date;
    const month = getMonthFromDate(date);
    if (!groupedItems[month]) {
      groupedItems[month] = [];
    }

    groupedItems[month].push({
      ...itemValue,
      itemID: itemID
    });
  });

  return groupedItems;
}

function getMonthFromDate(dateString) {
  const date = new Date(dateString);
  const monthOptions = { month: "long", year: "numeric" };
  return date.toLocaleDateString(undefined, monthOptions);
}

function sortItemsByDate(groupedItems) {
  for (const month in groupedItems) {
    groupedItems[month].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const timeA = a.time;
      const timeB = b.time;
      // Compare the months
      if (dateA.getMonth() !== dateB.getMonth()) {
        return dateA.getMonth() - dateB.getMonth();
      }

      // Compare the dates
      if (dateA.getDate() !== dateB.getDate()) {
        return dateA.getDate() - dateB.getDate();
      }

      // Compare the times
      return timeA.localeCompare(timeB);
    });
  }
}

// Get the databook data
const dataRef = ref(database, "databook");
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  if (snapshot.exists() && data !== null) {
    const dataArray = Object.entries(data);
    const groupedItems = groupItemsByMonth(dataArray);
    sortItemsByDate(groupedItems);
    renderItemsInDatabook(groupedItems);
  } else {
    databookEl.textContent = "No items added yet!";
  }
});
// Get the currently logged-in user
const user = auth.currentUser;

// Check if the user exists and has the email "aimanahmad0004@gmail.com"
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



