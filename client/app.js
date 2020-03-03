const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

let username;

const login = () => {
  if (userNameInput) {
    username = userNameInput.value;
    loginForm.classList.remove("show");
    messagesSection.classList.add("show");
  } else {
    alert("Wpisz nazwę użytkownika");
  }
};

const addMessage = (user, messeage) => {
  const li = document.createElement("li");
  li.classList.add("message");
  if (user != username) {
    li.innerHTML = `
    <h3 class="message__author">${user}</h3>
    <div class="message__content">
     ${messeage}
    </div>`;
  } else {
    li.classList.add("message--self");
    li.innerHTML = `
    <h3 class="message__author">You</h3>
    <div class="message__content">
     ${messeage}
    </div>`;
  }
  messagesList.appendChild(li);
};

const sendMesseage = name => {
  if (messageContentInput.value) {
    addMessage(name, messageContentInput.value);
    messageContentInput.value = "";
  } else alert("Wpisz wiadomość");
};

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  login();
});

addMessageForm.addEventListener("submit", event => {
  event.preventDefault();
  sendMesseage(username);
});
