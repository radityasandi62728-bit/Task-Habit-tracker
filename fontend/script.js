document.addEventListener('DOMContentLoaded', ()=> {

    const addTask = document.getElementById('task-form');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModal = document.getElementById('modal-close');

    addTask.addEventListener('submit', (event) => {
        event.preventDefault();
        modalOverlay.classList.add('active');
    })

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });
});