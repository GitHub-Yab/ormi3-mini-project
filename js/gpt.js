import * as chat from "./chat.js";

export const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

export const $input = document.getElementById("messageInput");
export const $button = document.getElementById("sendMessage");

export const data = [
  {
    role: "system",
    content:
      "모든 대답을 'xx년 x월 x일 일정은 다음과 같습니다.' 로 대답해. 형식은 숫자없는 리스트, 내용은 메모처럼 간결하게 요약해서 보여줘. 한줄에 20자 이상 넘어가면 안돼 ",
  },
  {
    role: "user",
    content: "2023-9-6일엔 14:30에 빨래방가기를 할거야",
  },
  {
    role: "user",
    content: "2023-9-6일엔 15:30에 설거지를 할거야",
  },
  {
    role: "user",
    content: "2023-9-6일엔 16:30에 청소를 할거야",
  },
  {
    role: "user",
    content: "2023-9-6일엔 18:30에 게임를 할거야",
  },
];

export function chatGPT() {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => {
      chat.appendMessage(`${res.choices[0].message.content}`, "left");
    });
}
