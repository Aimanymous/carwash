// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push,query, orderByChild, startAt, endAt, limitToFirst , onValue , equalTo} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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


const serviceButton = document.getElementById("add-servive");
serviceButton.addEventListener("click", function(event) {
  event.preventDefault();

  const carwashcentre = document.getElementById("carwashcentre").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const addons = document.getElementById("addons").value;

  if (!carwashcentre || !date || !time) {
    alert("Please enter the required fields: Car Wash Centre, Date, and Time.");
    return;
  }

  const selectedTime = new Date(date + " " + time);
  const startTime = new Date(date + " 08:00");
  const endTime = new Date(date + " 18:00");

  if (selectedTime < startTime || selectedTime > endTime) {
    alert("The selected time is not within the allowed time range (8:00 am - 6:00 pm).");
    return;
  }

  const user = auth.currentUser;
  const email = user ? user.email : "";

checkAvailability(carwashcentre, date, time, addons, email);
});

function checkAvailability(carwashcentre, date, time, addons, email) {
  const dataRef = ref(database, "databook");

  onValue(dataRef, (snapshot) => {
    const bookings = snapshot.val();
    const selectedStartTime = new Date(date + " " + time);
    const selectedEndTime = new Date(selectedStartTime.getTime() + 30 * 60000); // Add 30 minutes to the selected slot end time

    // Check if the selected time slot conflicts with any existing bookings
    let isAvailable = true;

    for (const bookingId in bookings) {
      const booking = bookings[bookingId];
      const bookingStartTime = new Date(booking.date + " " + booking.time);
      const bookingEndTime = new Date(bookingStartTime.getTime() + 30 * 60000); // Add 30 minutes to the booked slot end time

      if (
        (selectedStartTime >= bookingStartTime && selectedStartTime < bookingEndTime) ||
        (selectedEndTime > bookingStartTime && selectedEndTime <= bookingEndTime)
      ) {
        isAvailable = false;
        break;
      }
    }

    if (isAvailable) {
      const confirmation = confirm("Are you sure you want to book this time slot?");
      if (confirmation) {
        storeData(carwashcentre, date, time, addons, email);
      }
    }
  });
}


function convertTo24HourFormat(time) {
  const [hours, minutes] = time.split(":");
  let convertedHours = parseInt(hours, 10);
  const period = time.slice(-2).toLowerCase();

  if (period === "pm" && convertedHours < 12) {
    convertedHours += 12;
  } else if (period === "am" && convertedHours === 12) {
    convertedHours = 0;
  }

  return `${convertedHours.toString().padStart(2, "0")}:${minutes}`;
}


function storeData(carwashcentre, date, time, addons, email) {
  const dataRef = ref(database, "databook");
  const newData = {
  carwashcentre: carwashcentre,
    date: date,
    time: time,
    addons: addons,
    email: email
  };

  push(dataRef, newData)
    .then(() => {
      console.log("Apppointment successfully!");
     
  
          window.location.href = "detailappoint.html";
      // ...

    })
    .catch((error) => {
      console.error("Error storing data:", error);
      
    });
    
}
const homeButton = document.getElementById("home-button");
homeButton.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default behavior of the home button click event
  window.location.href = "home.html"; // Replace "home.html" with the URL of your home page
});

// Add color to slot time based on availability

const dateElement = document.getElementById("date");


dateElement.addEventListener("change", function() {
  const selectedDate = dateElement.value;
  updateSlotTimes(selectedDate);
});

function updateSlotTimes(selectedDate) {
  const timeSlots = [
    { label: "08:00 AM", value: "08:00" },
    { label: "08:30 AM", value: "08:30" },
    { label: "09:00 AM", value: "09:00" },
    { label: "09:30 AM", value: "09:30" },
    { label: "10:00 AM", value: "10:00" },
    { label: "10:30 AM", value: "10:30" },
    { label: "11:00 AM", value: "11:00" },
    { label: "11:30 AM", value: "11:30" },
      { label: "12:00 AM", value: "12:00" },
    { label: "012:30 AM", value: "12:30" },
    { label: "2:00 PM", value: "14:00" },
    { label: "2:30 PM", value: "14:30" },
      { label: "3:00 PM", value: "15:00" },
    { label: "3:30 PM", value: "15:30" },
    { label: "4:00 PM", value: "16:00" },
    { label: "4:30 PM", value: "16:30" },
     { label: "5:00 PM", value: "17:00" },
    { label: "5:30 PM", value: "17:30" },
  ];

  const dataRef = ref(database, "databook");

  onValue(dataRef, (snapshot) => {
    const bookings = snapshot.val();

    const availableSlots = timeSlots.filter((slot) => {
      const selectedStartTime = new Date(selectedDate + " " + slot.value);
      const selectedEndTime = new Date(selectedStartTime.getTime() + 30 * 60000); // Add 30 minutes to the selected slot end time

      const isSlotAvailable = Object.values(bookings || {}).every((booking) => {
        const bookingStartTime = new Date(booking.date + " " + booking.time);
        const bookingEndTime = new Date(bookingStartTime.getTime() + 30 * 60000); // Add 30 minutes to the booked slot end time

        return (
          selectedStartTime >= bookingEndTime || selectedEndTime <= bookingStartTime
        );
      });

      return isSlotAvailable;
    });

    // Update the available time slots in the dropdown
    updateDropdownOptions(availableSlots);
  });
}

function updateDropdownOptions(options) {
  const timeSelect = document.getElementById("time");

  // Remove existing options
  timeSelect.innerHTML = "";

  // Add new options
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    timeSelect.appendChild(optionElement);
    
  });
  // Add event listener to change the color of the selected option
  timeSelect.addEventListener("change", function() {
    const selectedOption = timeSelect.options[timeSelect.selectedIndex];

    // Reset the style of all options
    for (let i = 0; i < timeSelect.options.length; i++) {
      timeSelect.options[i].style.backgroundColor = "";
    }

    // Set the color of the selected option
    selectedOption.style.backgroundColor = "#C7EDCC";
  });
}
