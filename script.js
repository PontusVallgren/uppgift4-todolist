const header = document.querySelector(".header");
const main = document.querySelector(".content");
const footer = document.querySelector(".footer");
let todoList = [];
let taskActive = 0;
let taskDone = 0;

class Tasks {
  constructor(name) {
    this.name = name;
  }

  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
class UI {
  static loadStorage() {
    Storage.getTodolist();
    if (todoList.length > 0) {
      todoList.forEach((item) => createNewTask(item.name));
    }
  }
}

class Storage {
  static saveTodoList(data) {
    localStorage.setItem("todoList", JSON.stringify(data));
  }
  static getTodolist() {
    if (localStorage.length > 0) {
      todoList = [...JSON.parse(localStorage.getItem("todoList"))];
    }
  }
}

// CREATING DOM

// Header
const headerText = document.createElement("h1");
headerText.setAttribute("id", "header-text");
headerText.textContent = "Todo List";

const headerIcon = document.createElement("i");
headerIcon.setAttribute("class", "fas fa-check-double");
headerIcon.setAttribute("id", "header-icon");

headerText.appendChild(headerIcon);
header.appendChild(headerText);

// Input-Container
const inputContainer = document.createElement("form");
inputContainer.setAttribute("id", "input-container");
main.appendChild(inputContainer);

let inputTask = document.createElement("input");
inputTask.setAttribute("id", "input-task");
inputTask.setAttribute("type", "text");
inputTask.setAttribute("placeholder", "Enter a task");
inputContainer.appendChild(inputTask);

const addButton = document.createElement("button");
addButton.setAttribute("type", "submit");
addButton.setAttribute("id", "add-task-button");

const addButtonIcon = document.createElement("i");
addButtonIcon.setAttribute("class", "fas fa-plus-circle");
addButton.appendChild(addButtonIcon);
inputContainer.appendChild(addButton);

// Task-Container
const taskContainer = document.createElement("div");
taskContainer.setAttribute("class", "task-container");
let list = document.createElement("ul");
const clearAll = document.createElement("p");
clearAll.setAttribute("id", "clear-all");
clearAll.textContent = "Clear All";

taskContainer.appendChild(list);
taskContainer.appendChild(clearAll);
main.appendChild(taskContainer);

// Aktiva & Färdiga tasks counter
const counterContainer = document.createElement("div");
counterContainer.setAttribute("id", "counter-container");
main.appendChild(counterContainer);

const activeTasks = document.createElement("p");
activeTasks.textContent = `Active: ${taskActive}`;
const doneTasks = document.createElement("p");
doneTasks.textContent = `Finished: ${taskDone}`;

counterContainer.appendChild(activeTasks);
counterContainer.appendChild(doneTasks);

// Events

UI.loadStorage();

inputContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputTask.value != "") {
    createNewTask(inputTask.value);
    addTodoList(inputTask.value);
  }
  if (inputTask.value == "") {
    alert("Enter a task");
  }
  inputTask.value = "";
});

list.addEventListener("click", (e) => {
  handleClickCheckDeleteName(e);
});

clearAll.addEventListener("click", () => {
  clearCounterTodoList();
  updateCounter();
});

// Functions

function handleClickCheckDeleteName(e) {
  if (e.target.name == "checkButton") {
    checkTodo(e);
  }
  if (e.target.name == "deleteButton") {
    deleteTodo(e);
    deleteTodoFromStorage(e);
  }
}

function checkTodo(e) {
  let listNode = e.target.parentNode;
  if (listNode.classList.contains("active")) {
    e.target.src = "./Icons/done_task_icon.png";
    listNode.setAttribute("class", "tasks done");
    taskDone++;
    taskActive--;
  } else if (listNode.classList.contains("done")) {
    e.target.src = "./Icons/active_task_icon.png";
    listNode.setAttribute("class", "tasks active");
    taskDone--;
    taskActive++;
  }
  updateCounter();
}

function deleteTodo(e) {
  let listNode = e.target.parentNode;
  if (listNode.classList.contains("active")) {
    taskActive--;
  } else if (listNode.classList.contains("done")) {
    taskDone--;
  }
  listNode.remove();
  updateCounter();
}

function deleteTodoFromStorage(e) {
  let taskName = e.target.previousSibling;
  for (let i = 0; i < todoList.length; i++) {
    if (taskName.textContent == todoList[i].name) {
      todoList.splice(i, 1);
      Storage.saveTodoList(todoList);
    }
  }
}

function updateCounter() {
  activeTasks.textContent = `Active: ${taskActive}`;
  doneTasks.textContent = `Finished: ${taskDone}`;
}
function addTodoList(todo) {
  const newTask = new Tasks(todo);
  todoList.push(newTask);
  Storage.saveTodoList(todoList);
}

function createNewTask(todo) {
  taskActive++;
  activeTasks.textContent = `Active: ${taskActive}`;

  const task = document.createElement("li");
  task.setAttribute("class", "tasks active");
  list.appendChild(task);

  const taskCheck = new Image(20, 20);
  taskCheck.src = "./Icons/active_task_icon.png";
  taskCheck.setAttribute("class", "task-check active");
  taskCheck.setAttribute("name", "checkButton");

  const taskName = document.createElement("p");
  taskName.setAttribute("id", "task-name");
  taskName.textContent = todo;

  const deleteTask = new Image(20, 20);
  deleteTask.src = "./Icons/trash_icon.png";
  deleteTask.setAttribute("class", "delete-task active");
  deleteTask.setAttribute("name", "deleteButton");

  task.appendChild(taskCheck);
  task.appendChild(taskName);
  task.appendChild(deleteTask);
}

function clearCounterTodoList() {
  list.textContent = " ";
  taskActive = 0;
  taskDone = 0;
  todoList = [];
  localStorage.clear();
}
