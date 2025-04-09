const tablaUsuarios = document.getElementById('tabla-registroUsuarios').querySelector('tbody');

async function cargarTabla() {
    fetch('http://localhost:3000/registroUsuarios',{
        method: 'GET'
        ,headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tablaUsuarios.innerHTML = '';
        data.forEach(Usuarios => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${Usuarios.nombreCompleto}</td>
                <td>${Usuarios.cedula}</td>
                <td>${Usuarios.correoElectronico}</td>
                <td>${Usuarios.rol}</td>
                <td>${Usuarios.estadoCuenta ? 'Activo' : 'Inactivo'}</td>
            `;
            tablaUsuarios.appendChild(fila);
        });
    })

}

document.addEventListener('DOMContentLoaded', cargarTabla);