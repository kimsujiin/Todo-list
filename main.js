// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중인탭은 잰행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under_line");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);

// Enter 버튼 클릭하면 자동으로 아이템 추가하기
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

// tabs를 클릭했을 때
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  // 입력한 할 일이 없다면 아이템 추가 안되게 막기
  if (taskInput.value === "") {
    return alert("할일을 입력해주세요");
  }

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

// 보이는 UI

function render() {
  let list = [];
  // 1. 내가 선택한 탭에 따라서
  // 2. list를 달리 보여준다
  // all tasklist
  // ongoing, done = > filterList
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task" style="background-color: lightgray;">
      <div class="task-done">${list[i].taskContent}</div>
      <div class ="button-box">
        <button onclick="toggleComplete('${list[i].id}')"class="fa-solid fa-arrow-rotate-left"></button>
        <button onclick="deleteTask('${list[i].id}')"class ="fa-solid fa-trash"></button>
        
      </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
      <div class="task-dnt">${list[i].taskContent}</div>
      <div class ="button-box">
        <button onclick="toggleComplete('${list[i].id}')"class="fa-solid fa-check"></button>
        <button onclick="deleteTask('${list[i].id}')"class ="fa-solid fa-trash"></button>
      </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  filterList = [];

  if (mode === "ongoing") {
    // 진행중인 아이템을 보여준다
    // task.isComplete = false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    // 끝나는 케이스
    // task.isComplete = true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return Math.random().toString(36).substr(2, 16);
}
