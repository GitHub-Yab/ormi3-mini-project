const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

const $input = document.querySelector("form input");
const $button = document.querySelector("form button");
const $answer = document.querySelector("#answer");

const data = [
  {
    role: "system",
    content: "assistant는 입럭한 일정을 모두 활용하여 일정을 리스트로 정리해주는 똑똑한 비서입니다.",
  },
  {
    role: "user",
    content: "오늘은 14:30에 빨래방가기를 할거야",
  },
  {
    role: "user",
    content: "오늘은 15:30에 설거지를 할거야",
  },
  {
    role: "user",
    content: "오늘은 16:30에 청소를 할거야",
  },
  {
    role: "user",
    content: "오늘은 18:30에 게임를 할거야",
  },
];

function chatGPT() {
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
      console.log(res);
      // console.log(res.choices[0].message.content);
      // console.log(JSON.parse(res.choices[0].message.content));
      // 답변 온 것을 assistant로 저장
      $answer.innerHTML = `<p>${res.choices[0].message.content}</p>`;
    });
}

$button.addEventListener("click", (e) => {
  e.preventDefault();
  const contents = $input.value;
  data.push({
    role: "user",
    content: contents,
  });
  $input.value = "";

  chatGPT();
});
