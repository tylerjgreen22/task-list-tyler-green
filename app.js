//UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Event listeners

//DOM Load event
document.addEventListener('DOMContentLoaded', getTasks);
//Add task event
form.addEventListener('submit', addTask);
//Remove task event
taskList.addEventListener('click', removeTask);
//Clear task event
clearBtn.addEventListener('click', clearTasks);
//Filter tasks event
filter.addEventListener('keyup', filterTasks);


//Get Tasks from LS
function getTasks() {
    let tasks = retrieveTasks();

    tasks.forEach((task) => {
        createLi(task);
    })
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        createLi();
        //Store in LS
        storeTask(taskInput.value);

        //Clear input
        taskInput.value = '';
    }

    e.preventDefault();
}

//Store task in LS
function storeTask(task) {
    let tasks = retrieveTasks();

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    let deleteTag = e.target.parentElement;
    if (deleteTag.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            deleteTag.parentElement.remove();

            //Remove from LS
            removeTaskLS(deleteTag.parentElement);
        }

    }
}

//Remove task from LS
function removeTaskLS(taskItem) {
    let tasks = retrieveTasks();

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //clear from LS
    clearTasksLS();
}

//Clear Tasks from LS
function clearTasksLS() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('#task-item').forEach((task) => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.className = 'list-group-item d-flex justify-content-between align-items-center'
        } else {
            task.className = 'd-none';
        }
    });
}

//Create list item
function createLi(task = taskInput.value) {
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    //Add id
    li.id = 'task-item';
    //Create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"</i>';
    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
}

//Retrieve tasks from LS
function retrieveTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}