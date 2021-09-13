const header = document.querySelector('.header');
const main = document.querySelector('.content');
const footer = document.querySelector('.footer');

// Header
const headerText = document.createElement('h1');
headerText.setAttribute('id', 'header-text');
headerText.textContent = 'ToDo List';

const headerIcon = new Image(70, 70);
headerIcon.src = './Icons/header_icon.png';

header.appendChild(headerIcon);
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

const AddButton = new Image(45, 45);
AddButton.src = './Icons/add_task_icon.png';
AddButton.setAttribute('id', 'add-task-button');
inputContainer.appendChild(AddButton);

// Task-Container
const taskContainer = document.createElement('div');
taskContainer.setAttribute('id', 'task-container');
main.appendChild(taskContainer);

// Aktiva & Färdiga tasks counter 
const counterContainer = document.createElement('div');
counterContainer.setAttribute('id', 'counter-container');
main.appendChild(counterContainer);

const activeTasks = document.createElement('p');
activeTasks.textContent = 'Active: X';
const doneTasks = document.createElement('p');
doneTasks.textContent = 'Finished: Y';

counterContainer.appendChild(activeTasks);
counterContainer.appendChild(doneTasks);


// Funktioner

const todoList = [];

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

function createNewTask() {
    if (inputTask.value === '') {
        alert('Please enter a task');
    } else {
        const newTask = new Tasks(inputTask.value)
        todoList.push(newTask);

        const task = document.createElement('div');
        task.setAttribute('class', 'tasks');
        taskContainer.appendChild(task);

        const taskCheck = new Image(20, 20);
        taskCheck.src = './Icons/active_task_icon.png';
        taskCheck.setAttribute('class', 'task-check')
        taskCheck.setAttribute('id', 'active');

        const taskName = document.createElement('p');
        taskName.setAttribute('id', 'task-name');
        taskName.textContent = inputTask.value;

        const deleteTask = new Image(20, 20);
        deleteTask.src = './Icons/trash_icon.png';
        deleteTask.setAttribute('id', 'delete-task');

        task.appendChild(taskCheck);
        task.appendChild(taskName);
        task.appendChild(deleteTask);
    }
}

AddButton.addEventListener('click', () => {
    createNewTask();
})