import * as gpt from "./gpt.js";

const openChatButton = document.getElementById("openChat");
const closeChatButton = document.getElementById("closeChat");
const chatPopup = document.getElementById("chatPopup");
const chatBackground = document.getElementById("chatBackground");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

let isChatOpen = false;

function closeChat() {
  chatPopup.style.display = "none";
  chatBackground.style.display = "none";
  isChatOpen = false;
}

chatBackground.addEventListener("click", () => {
  if (isChatOpen) {
    closeChat();
  }
});

export function appendMessage(text, alignment) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  if (alignment === "right") {
    messageDiv.classList.add("right");
  }

  const messageContentDiv = document.createElement("div");
  messageContentDiv.classList.add("message-content");

  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = text;

  const messagePre = document.createElement("pre");
  messagePre.textContent = text;

  if (alignment == "left") {
    messageContentDiv.appendChild(messagePre);
  } else {
    messageContentDiv.appendChild(messageParagraph);
  }
  messageDiv.appendChild(messageContentDiv);

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
appendMessage("안녕하세요!", "left");

openChatButton.addEventListener("click", () => {
  chatPopup.style.display = "block";
  chatBackground.style.display = "block";
  messageInput.focus();
  isChatOpen = true;
});

closeChatButton.addEventListener("click", () => {
  closeChat();
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  const message = messageInput.value;
  if (message.trim() !== "") {
    appendMessage(message, "right");

    gpt.data.push({
      role: "user",
      content: message,
    });

    messageInput.value = "";
    gpt.chatGPT();
  }
});

sendMessageButton.addEventListener("click", () => {
  messageForm.submit();
});
