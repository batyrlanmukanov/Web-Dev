const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');


addBtn.addEventListener('click', () => {
    const task = todoInput.value.trim();
    if (task) {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';


        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('done');
        });


        const taskText = document.createElement('span');
        taskText.textContent = task;


        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            todoList.removeChild(listItem);
        });


        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);


        todoList.appendChild(listItem);


        todoInput.value = '';
    }
});
