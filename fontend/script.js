document.addEventListener('DOMContentLoaded', () => {

    const addTaskBtn = document.getElementById('task-form'); 
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModal = document.getElementById('modal-close');
    const inputForm = document.getElementById('input-form');
    const taskList = document.getElementById('task-list');

    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const totalTasksEl = document.getElementById('total-tasks');
    const completedTasksEl = document.getElementById('completed-tasks');

   
    let tasks = [];

   
    addTaskBtn.addEventListener('submit', (event) => {
        event.preventDefault();
        modalOverlay.classList.add('active');
    });

  
    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });


    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('input-field').value;
        const date = document.getElementById('input-date').value;
        const note = document.getElementById('input-note').value;
        const priority = document.getElementById('input-priority').value;

        const newTask = {
            id: Date.now(), 
            name,
            date,
            note,
            priority,
            status: 'pending' 
        };

        tasks.push(newTask);

        renderTasks();
        updateProgress();

        inputForm.reset();
        modalOverlay.classList.remove('active');
    });

    
    function renderTasks() {
        taskList.innerHTML = ''; 

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task-card');
            li.dataset.taskId = task.id;

            li.innerHTML = `
            <div class="card-background">       
                <div class="task-card-content">
                    <h3 class="task-title">${task.name}</h3>
                    <p class="task-date">Due: ${task.date}</p>
                    <p class="task-note">${task.note}</p>
                    <span class="task-status status-${task.status}">${task.status}</span>
                </div>
                <div class="task-card-actions">
                    <input type="checkbox" class="task-checkbox" title="Mark as done" ${task.status === 'done' ? 'checked' : ''}>
                    <button type="button" class="task-delete-btn" title="Delete task">delete</button>
                    <button type="button" class="task-save-btn" title="Save task">edit</button>
                </div>
            </div>
            `;

            taskList.appendChild(li);
        });
    }

    function updateProgress() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'done').length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% completed`;

        totalTasksEl.textContent = total;
        completedTasksEl.textContent = completed;
    }

    updateProgress();
});