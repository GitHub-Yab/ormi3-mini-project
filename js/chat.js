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

// 팝업 창을 닫는 함수 정의
function closeChat() {
  chatPopup.style.display = "none";
  chatBackground.style.display = "none";
  isChatOpen = false; // 팝업 창이 닫혔음을 표시
}

// 팝업 창 외부를 클릭하여 팝업을 닫을 수 있도록 처리
chatBackground.addEventListener("click", () => {
  if (isChatOpen) {
    closeChat();
  }
});

// script.js

// ...

// 채팅 메시지와 아바타를 추가하는 함수
export function appendMessage(text, alignment) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  if (alignment === "right") {
    messageDiv.classList.add("right");
  }

  // 메시지 엘리먼트 생성
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

// ...
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
