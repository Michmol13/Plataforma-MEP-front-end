const tablaMateriales = document.getElementById('tabla-registroMaterialesEscolares').querySelector('tbody');

async function cargarTabla() {
    fetch("http://localhost:3000/registroMaterialesEscolares", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tablaMateriales.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
        data.forEach(material => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${material.nombreMaterial}</td>
                <td>${material.descripcion}</td>
                <td>${material.categoria}</td>
                <td>${material.unidadMedida}</td>
                <td>${material.estado ? 'Activo' : 'Inactivo'}</td>
            `;
            tablaMateriales.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar los materiales escolares:', error);
    });
}

document.addEventListener('DOMContentLoaded', cargarTabla);