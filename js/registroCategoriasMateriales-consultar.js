const tablaCategoria = document.getElementById('tabla-registroCategoria').querySelector('tbody');

async function cargarTabla() {
    fetch("http://localhost:3000/registroCategoria",{
        method: 'GET'
        ,headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tablaCategoria.innerHTML = '';
        data.forEach(Categoria => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${Categoria.nombre}</td>
                <td>${Categoria.descripcion}</td>
            `;
            tablaCategoria.appendChild(fila);
        });
    })

}

document.addEventListener('DOMContentLoaded', cargarTabla);

