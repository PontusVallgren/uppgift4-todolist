const header = document.querySelector('.header');
const main = document.querySelector('.content');
const footer = document.querySelector('.footer');

// Header
const headerText = document.createElement('h1');
headerText.setAttribute('id', 'header-text');
headerText.textContent = 'ToDo List';
header.appendChild(headerText);

// Input-Container
const inputContainer = document.createElement('div');
inputContainer.setAttribute('id', 'input-container');
main.appendChild(inputContainer);

const inputTask = document.createElement('input');
inputTask.setAttribute('id', 'input-task');
inputTask.setAttribute('type', 'text');
inputTask.setAttribute('placeholder', 'Enter a task');
inputContainer.appendChild(inputTask);

const AddButton = document.createElement('button');
AddButton.setAttribute('id', 'add-button');
AddButton.textContent = '+';
inputContainer.appendChild(AddButton);

// Task-Container
const taskContainer = document.createElement('div');
taskContainer.setAttribute('id', 'task-container');
main.appendChild(taskContainer);



