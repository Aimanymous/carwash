// JavaScript code

const chatButton = document.getElementById('chatButton');
const chatModal = document.getElementById('chatModal');
const chatOutput = document.getElementById('chatOutput');
const suggestions = document.getElementById('suggestions');
const userMessageInput = document.getElementById('userMessage');
const sendButton = document.getElementById('sendButton');
const closeButton = document.querySelector('.modal .close');

chatButton.addEventListener('click', () => {
  chatModal.style.display = 'block';
  showBotMessage("Hi, my name is Aiman. How can I help you?");
});

suggestions.addEventListener('click', (event) => {
  const suggestion = event.target.innerHTML;
  userMessageInput.value = suggestion;
  sendMessage();
});

sendButton.addEventListener('click', sendMessage);
closeButton.addEventListener('click', closeChatModal);

function sendMessage() {
  const userMessage = userMessageInput.value;
  showUserMessage(userMessage);
  processUserMessage(userMessage);
  userMessageInput.value = '';
}

function showUserMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = message;
  messageElement.classList.add('user-message');
  chatOutput.appendChild(messageElement);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function showBotMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = message;
  messageElement.classList.add('bot-message');
  chatOutput.appendChild(messageElement);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function processUserMessage(message) {
  switch (message) {
    case 'I have a problem with the payment':
      showBotMessage('Here are the steps for payment:');
      showBotMessage('1. you can pay cash at the centre');
      showBotMessage('2. click payment');
      showBotMessage('3. confirm the payment');
      showBotMessage('If you have any further issues, you can contact me at basuh@gmail.com');
      break;
    case 'How to make an appointment?':
      showBotMessage('Here are the steps to make an appointment:');
      showBotMessage('1. click service appointment button');
      showBotMessage('2. select centre,date and time');
      showBotMessage('3. click book button');
      break;
    default:
      showBotMessage('I apologize, but I cannot really understand, but you can contact me at basuh@gmail.com');
  }
}

function closeChatModal() {
  chatModal.style.display = 'none';
  chatOutput.innerHTML = '';
}

// Add event listener to open rating section
sendButton.addEventListener('click', openRatingSection);
// Add event listener to submit rating
submitRating.addEventListener('click', submitRating);

let rating = 0;
let comment = '';

function openRatingSection() {
  const userMessage = userMessageInput.value;
  showUserMessage(userMessage);
  processUserMessage(userMessage);
  userMessageInput.value = '';
  
  // Show the rating section and hide the chat section
  chatOutput.style.display = 'none';
  ratingSection.style.display = 'block';
}

function rate(stars) {
  // Highlight the selected stars and update the rating value
  const starElements = document.getElementsByClassName('star');
  for (let i = 0; i < starElements.length; i++) {
    if (i < stars) {
      starElements[i].classList.add('active');
    } else {
      starElements[i].classList.remove('active');
    }
  }
  rating = stars;
}

function submitRating() {
  // Get the comment text
  comment = commentInput.value;
  
  // Perform any necessary processing or data submission
  
  // Show a confirmation message to the user
  showBotMessage('Thank you for your rating and comment!');
  
  // Clear the rating and comment values
  rating = 0;
  comment = '';
  
  // Reset the rating section and show the chat section again
  resetRatingSection();
}

function resetRatingSection() {
  const starElements = document.getElementsByClassName('star');
  for (let i = 0; i < starElements.length; i++) {
    starElements[i].classList.remove('active');
  }
  commentInput.value = '';
  
  // Hide the rating section and show the chat section
  ratingSection.style.display = 'none';
  chatOutput.style.display = 'block';
}
