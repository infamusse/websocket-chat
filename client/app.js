const socket = io();

const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

socket.on("message", ({ author, content }) => addMessage(author, content));
socket.on("newUser", userInfo =>
  addMessage("ChatBot", `${userInfo} has joined the conversation!`)
);
socket.on("removeUser", user =>
  addMessage("ChatBot", `${user} has left the conversation... :(`)
);

var username = "";

const login = () => {
  if (userNameInput) {
    username = userNameInput.value;
    socket.emit("logged", username);
    loginForm.classList.remove("show");
    messagesSection.classList.add("show");
  } else {
    alert("Wpisz nazwę użytkownika");
  }
};

const addMessage = (user, messeage) => {
  console.log(user, messeage);
  const li = document.createElement("li");
  li.classList.add("message");
  if (user != username && user != "ChatBot") {
    li.innerHTML = `
    <h3 class="message__author">${user}</h3>
    <div class="message__content">
     ${messeage}
    </div>`;
  } else if (user === "ChatBot") {
    li.innerHTML = `
    <h3 class="message__author">Chat Bot</h3>
    <div class="message__content">
        <p>
            <i>
                ${messeage}
            </i>
        </p>
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

const sendMesseage = () => {
  let messageContent = messageContentInput.value;
  let user = username;

  if (!messageContent.length) {
    alert("Wpisz wiadomość!");
  } else {
    addMessage(user, messageContent);
    socket.emit("message", { author: user, content: messageContent });
    messageContentInput.value = "";
  }
};

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  login();
});

addMessageForm.addEventListener("submit", event => {
  event.preventDefault();
  sendMesseage();
});
