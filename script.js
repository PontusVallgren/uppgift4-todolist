const header = document.querySelector('.header');
const main = document.querySelector('.content');
const footer = document.querySelector('.footer');
let taskActive = 0;
let taskDone = 0;
const todoList = [];

// Header
const headerText = document.createElement('h1');
headerText.setAttribute('id', 'header-text');
headerText.textContent = 'ToDo List';

const headerIcon = new Image(70, 70);
headerIcon.setAttribute('id', 'header-icon')
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
activeTasks.textContent = `Active: ${taskActive}`;
const doneTasks = document.createElement('p');
doneTasks.textContent = `Finished: ${taskDone}`

counterContainer.appendChild(activeTasks);
counterContainer.appendChild(doneTasks);

// Task creator

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

// Functions

function createNewTask() {
        if (inputTask.value === '') {
            alert('Please enter a task');
        } else {
            const newTask = new Tasks(inputTask.value)
            todoList.push(newTask);
            taskActive++;
            activeTasks.textContent = `Active: ${taskActive}`;
    
            const task = document.createElement('div');
            task.setAttribute('class', 'tasks');
            taskContainer.appendChild(task);
    
            const taskCheck = new Image(20, 20);
            taskCheck.src = './Icons/active_task_icon.png';
            taskCheck.setAttribute('class', 'task-check active')
    
            const taskName = document.createElement('p');
            taskName.setAttribute('id', 'task-name');
            taskName.textContent = inputTask.value;
    
            const deleteTask = new Image(20, 20);
            deleteTask.src = './Icons/trash_icon.png';
            deleteTask.setAttribute('class', 'delete-task active');
            
    
            task.appendChild(taskCheck);
            task.appendChild(taskName);
            task.appendChild(deleteTask);

            taskCheck.addEventListener('click', (e) => {
                if(e.currentTarget.classList.contains('active')) {
                    taskCheck.setAttribute('class', 'task-check done');
                    deleteTask.setAttribute('class', 'delete-task done');
                    taskCheck.src = './Icons/done_task_icon.png';
                    taskDone++;
                    taskActive--;
                    doneTasks.textContent = `Finished: ${taskDone}`
                    activeTasks.textContent = `Active: ${taskActive}`;
                } else if (e.currentTarget.classList.contains('done')) {
                    taskCheck.setAttribute('class', 'task-check active');
                    deleteTask.setAttribute('class', 'delete-task active');
                    taskCheck.src = './Icons/active_task_icon.png';
                    taskDone--;
                    taskActive++;
                    doneTasks.textContent = `Finished: ${taskDone}`
                    activeTasks.textContent = `Active: ${taskActive}`;
                }
                
            });
            deleteTask.addEventListener('click', (e) => {
                if(e.currentTarget.classList.contains('active')) {
                    taskActive--;
                    activeTasks.textContent = `Active: ${taskActive}`;
                } else if(e.currentTarget.classList.contains('done')){
                    taskDone--;
                    doneTasks.textContent = `Finished: ${taskDone}`
                }
                e.currentTarget.parentNode.remove();
                });
            
        }
    }



// Buttons **

AddButton.addEventListener('click', () => {
    createNewTask();
    document.querySelector('#input-task').value = '';
})
