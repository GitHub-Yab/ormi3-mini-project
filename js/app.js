const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

const $input = document.querySelector("form input");
const $button = document.querySelector("form button");
const $answer = document.querySelector("#answer");

const data = [];

data.push({
  role: "system",
  content: "assistant는 점시간 메뉴를 추천해주는 요리사입니다.",
});

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
      console.log(res.choices[0].message.content);
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
