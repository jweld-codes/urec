export function initClassesDashboard() {
console.log('initClassesDashboard ON')

    // Funciones para mostrar y ocultar modales
function showAddClassModal() {
    document.getElementById('addClassModal').style.display = 'block';
}

function closeAddClassModal() {
    document.getElementById('addClassModal').style.display = 'none';
}

function showDeleteClassModal() {
    document.getElementById('deleteClassModal').style.display = 'block';
}

function closeDeleteClassModal() {
    document.getElementById('deleteClassModal').style.display = 'none';
}

function showEditClassModal() {
    document.getElementById('editClassModal').style.display = 'block';
}

function closeEditClassModal() {
    document.getElementById('editClassModal').style.display = 'none';
}

// Cerrar modal cuando se haga clic fuera de él
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}


}