let width = 2; // Initial width value

const loading = setInterval(() => {
  width += 0.5; // Increase width by 0.5
  const loadingRectangles = Array.from(document.querySelectorAll(".loading-rectangle"));
  loadingRectangles.forEach(rectangle => {
    rectangle.style.width = `${width}px`; // Set the width in pixels
  });
   
  if (width >= 16) { // Adjust the maximum width as needed
    clearInterval(loading);
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // If user credentials exist, redirect to the appropriate page
    if (storedEmail === "aimanahmad0004@gmail.com" && storedPassword === "aiman04") {
      window.location.href = "admin/admin.html"; // Redirect to the admin page
    } else if (storedEmail && storedPassword) {
      window.location.href = "customer/home.html"; // Redirect to the customer page
    } else {
      window.location.href = "login.html"; // Redirect to the login page
    }
  }
}, 40); // Adjust the interval duration as needed
