const day = document.querySelector(".calendar__day");
const month = document.querySelector(".current-year-month");
const date = new Date();

const pre = document.querySelector(".left");
const next = document.querySelector(".right");

const todoField = document.querySelector(".todo");
const todoTitle = document.querySelector(".todo__title");
const todoList = document.querySelector(".todo-list");

const input = document.querySelector('input[type="text"]');
const add = document.querySelector(".add");
const reset = document.querySelector(".reset");
const allReset = document.querySelector(".all-reset");

let currentMon = date.getMonth() + 1;
let currentYear = date.getFullYear();
let currentDay = date.getDate();

let DayOfChoice = currentDay;
let MonOfChoice = currentMon;
let yearOfChoice = currentYear;

let year = currentYear;
let mon = currentMon;

let clickEventArr = [];
let storedToDos = [];

// 2월 윤년 계산
function isLeapYear(year) {
  return year % 4 == 0 && (year % 400 == 0 || year % 100 != 0);
}

// 달에 몇일 있는지 계산
function getDayOfMon(mon, year) {
  if (mon === 1 || mon === 3 || mon === 5 || mon === 7 || mon === 8 || mon === 10 || mon === 12) {
    return 31;
  } else if (mon === 2) {
    return isLeapYear(year) ? 29 : 28;
  } else {
    return 30;
  }
}

// 요일 구하는 함수
function getDay(year, mon, date) {
  const YMD = `${year}-${mon}-${date}`;
  return new Date(YMD).getDay();
}

function makeCalendar(year, mon, dayCount) {
  clickEventArr = [];
  day.innerHTML = "";

  let getFirstDay = getDay(year, mon, 1);
  let previousMon;

  if (mon - 1 <= 0) {
    previousMon = 12;
  } else {
    previousMon = mon - 1;
  }

  let getDayOfPreMon = getDayOfMon(previousMon, year);

  for (let i = getFirstDay % 7; i > 0; i--) {
    const listPre = document.createElement("li");
    listPre.textContent = `${getDayOfPreMon - (i - 1)}`;
    listPre.style.opacity = "0.5";
    listPre.classList.add("disabled");
    day.appendChild(listPre);
  }

  for (let i = 1; i <= dayCount; i++) {
    if (i === currentDay && year === currentYear && mon === currentMon) {
      const onlyOneList = document.createElement("li");

      onlyOneList.textContent = `${i}`;
      if (currentYear === yearOfChoice && currentMon === MonOfChoice && currentDay === DayOfChoice) {
        onlyOneList.style.border = "3px solid red";
      } else {
        onlyOneList.style.border = "3px solid black";
      }

      if (0 === getDay(year, mon, i)) {
        onlyOneList.style.color = "red";
      } else if (6 == getDay(year, mon, i)) {
        onlyOneList.style.color = "blue";
      }

      day.addEventListener("click", (event) => {
        if (event.target !== onlyOneList) {
          onlyOneList.style.border = "3px solid black";
        }
      });

      day.appendChild(onlyOneList);
      continue;
    }

    const list = document.createElement("li");
    list.textContent = `${i}`;
    if (i === DayOfChoice && year === yearOfChoice && mon === MonOfChoice) {
      list.style.border = "3px solid red";
      day.addEventListener("click", (event) => {
        if (event.target !== list) {
          list.style.border = "none";
        }
      });
    }

    if (0 === getDay(year, mon, i)) {
      list.style.color = "red";
    } else if (6 == getDay(year, mon, i)) {
      list.style.color = "blue";
    }

    day.appendChild(list);
  }
}

function setMonthTitle(year, mon) {
  month.textContent = `${year}.${mon}`;
}

function nextMonthOrYear() {
  if (mon === 12) {
    year = year + 1;
    mon = 1;
  } else {
    mon = mon + 1;
  }
  setMonthTitle(year, mon);
  makeCalendar(year, mon, getDayOfMon(mon, year));
}

function preMonthOrYear() {
  if (mon === 1) {
    year = year - 1;
    mon = 12;
  } else {
    mon = mon - 1;
  }
  setMonthTitle(year, mon);
  makeCalendar(year, mon, getDayOfMon(mon, year));
}

function main() {
  setMonthTitle(year, mon);
  makeCalendar(year, mon, getDayOfMon(mon, year));
  todoTitle.textContent = `What are you going to do on ${year}.${mon}.${currentDay} 👀⁉`;
  paintToDo();
}

pre.addEventListener("click", preMonthOrYear);
next.addEventListener("click", nextMonthOrYear);

function clearEvent() {
  clickEventArr.forEach((value) => {
    value.style.border = "none";
  });
}

reset.addEventListener("click", () => {
  const result = prompt(`Do you really want to reset TODO on ${year} ${mon} ${DayOfChoice}? Enter (y/n)`);

  const YMD_KEY = `${year}-${mon}-${DayOfChoice}`;
  if (result === "y") {
    localStorage.removeItem(YMD_KEY);
    paintToDo();
  }
});

allReset.addEventListener("click", () => {
  const result = prompt(`Do you really want to clear all TODO? Enter (y/n) not recomended💥`);
  if (result === "y") {
    localStorage.clear();
    paintToDo();
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.className === "far fa-minus-square") {
    console.log("a: " + event.target.parentNode.parentNode.textContent);

    const YMD_KEY = `${year}-${mon}-${DayOfChoice}`;

    if (localStorage.getItem(YMD_KEY).includes(",")) {
      let array = localStorage.getItem(YMD_KEY).split(",");
      let copyArray = [];
      array.forEach((value) => {
        if (value !== event.target.parentNode.parentNode.textContent) {
          copyArray.push(value);
        }
      });
      localStorage.setItem(YMD_KEY, copyArray);
    } else {
      localStorage.removeItem(YMD_KEY);
    }

    todoList.removeChild(event.target.parentNode.parentNode);
  }
});

add.addEventListener("click", (event) => {
  handleToDoSubmit();
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleToDoSubmit();
  }
});

day.addEventListener("click", (event) => {
  if (event.target.tagName === "UL") return;
  if (event.target.className !== "disabled") {
    clearEvent();
    todoTitle.textContent = `What are you going to do on ${year}.${mon}.${event.target.textContent} 👀⁉`;
    event.target.style.border = "3px solid red";
    DayOfChoice = event.target.textContent * 1;
    MonOfChoice = mon;
    yearOfChoice = year;

    paintToDo();

    clickEventArr.push(event.target);
    console.log(clickEventArr);
    input.focus();
  }
});
//-----------------------------------------------------------------------

function saveToDos() {
  const YMD_KEY = `${year}-${mon}-${DayOfChoice}`;
  localStorage.setItem(YMD_KEY, JSON.stringify(storedToDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  console.log(li.id);
  li.remove();

  storedToDos = storedToDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function addToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const span = document.createElement("span");
  span.innerText = newTodo.text;

  const button = document.createElement("button");
  button.innerText = "x";
  button.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

function paintToDo() {
  const YMD_KEY = `${year}-${mon}-${DayOfChoice}`;
  const savedToDos = localStorage.getItem(YMD_KEY);

  todoList.innerHTML = "";

  if (savedToDos == null) {
    return;
  } else {
    const parsedToDos = JSON.parse(savedToDos);

    parsedToDos.forEach((YMD_KEY) => {
      const li = document.createElement("li");
      li.id = YMD_KEY.id;

      const span = document.createElement("span");
      span.innerText = YMD_KEY.text;

      const button = document.createElement("button");
      button.innerText = "x";
      button.addEventListener("click", deleteToDo);

      li.appendChild(span);
      li.appendChild(button);
      todoList.appendChild(li);
    });
  }
}

function loadSaveToDos() {
  const YMD_KEY = `${year}-${mon}-${DayOfChoice}`;
  const savedToDos = localStorage.getItem(YMD_KEY);

  let arr = new Array();

  if (savedToDos == null) {
    return arr;
  } else {
    const parsedToDos = JSON.parse(savedToDos);
    arr = parsedToDos;
  }
  return arr;
}

// add 버튼을 누르면 실행되는 함수
function handleToDoSubmit(event) {
  // event.preventDefault();

  if (input.value === "") {
    alert("please input you are going to do");
    return;
  }
  const newTodo = input.value;
  input.value = "";

  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
  };

  storedToDos = loadSaveToDos();
  storedToDos.push(newTodoObj);

  paintToDo();
  addToDo(newTodoObj);

  saveToDos();
}

main();
