const express = require("express");
const sgMail = require("@sendgrid/mail");

const app = express();
const port = 3000;
const sendgridApiKey = "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"; // Replace with your SendGrid API key

// Set up SendGrid
sgMail.setApiKey(sendgridApiKey);

// Define the route to send the discount voucher email
app.post("/sendDiscountVoucher", express.json(), (req, res) => {
  const { email } = req.body;

  const msg = {
    to: email,
    from: "orangkaya290400@gmail.com", // Replace with your email address
    subject: "Congratulations! You've earned a discount voucher",
    text: "Dear Customer,\n\nCongratulations! You've earned a 50% discount voucher. Please use the following voucher code during checkout to avail of the discount:\n\nVoucher Code: YOUR_VOUCHER_CODE\n\nThank you for your loyalty!\n\nBest regards,\nThe Car Wash Team",
  };

  sgMail
    .send(msg)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.sendStatus(500);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
