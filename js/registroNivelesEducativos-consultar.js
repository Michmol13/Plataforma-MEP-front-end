const tablaNiveles = document.getElementById('tabla-registroNivelesEducativos').querySelector('tbody');

async function cargarTabla() {
    fetch('http://localhost:3000/registroNivelesEducativos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tablaNiveles.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
        data.forEach(nivel => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${nivel.nombreNivel}</td>
                <td>${nivel.descripcion}</td>
                <td>${nivel.estado ? 'Activo' : 'Inactivo'}</td>
            `;
            tablaNiveles.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar los niveles educativos:', error);
    });
}

document.addEventListener('DOMContentLoaded', cargarTabla);
