const tablaHijos = document.getElementById('tabla-registroHijos').querySelector('tbody');

async function cargarTabla() {
    fetch("http://localhost:3000/registroHijos", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(data => {
        tablaHijos.innerHTML = '';
        data.forEach(hijo => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${hijo.nombrecompletoHijo}</td>
                <td>${hijo.cedula}</td>
                <td>${hijo.nivelEducativo}</td>
                <td>${hijo.annoLectivo}</td>
            `;
            tablaHijos.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar el registro de hijos:', error);
    });
}

document.addEventListener('DOMContentLoaded', cargarTabla);