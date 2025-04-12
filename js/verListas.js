async function cargarUsuarios() {
    const tabla = document.getElementById('tabla-registroUsuarios').querySelector('tbody');
    fetch('http://localhost:3000/registroUsuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tabla.innerHTML = '';
        data.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${usuario.nombreCompleto}</td>
                <td>${usuario.cedula}</td>
                <td>${usuario.correoElectronico}</td>
                <td>${usuario.rol}</td>
                <td>${usuario.estadoCuenta ? 'Activo' : 'Inactivo'}</td>
            `;
            tabla.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar los usuarios:', error);
    });
}

async function cargarNiveles() {
    const tabla = document.getElementById('tabla-registroNivelesEducativos').querySelector('tbody');
    fetch('http://localhost:3000/registroNivelesEducativos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tabla.innerHTML = '';
        data.forEach(nivel => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${nivel.nombreNivel}</td>
                <td>${nivel.descripcion}</td>
                <td>${nivel.estado ? 'Activo' : 'Inactivo'}</td>
            `;
            tabla.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar los niveles educativos:', error);
    });
}

async function cargarCategorias() {
    const tabla = document.getElementById('tabla-registroCategoria').querySelector('tbody');
    fetch('http://localhost:3000/registroCategoria', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tabla.innerHTML = '';
        data.forEach(categoria => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${categoria.nombre}</td>
                <td>${categoria.descripcion}</td>
            `;
            tabla.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar las categorías:', error);
    });
}

async function cargarMateriales() {
    const tabla = document.getElementById('tabla-registroMaterialesEscolares').querySelector('tbody');
    fetch('http://localhost:3000/registroMaterialesEscolares', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tabla.innerHTML = '';
        data.forEach(material => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${material.nombreMaterial}</td>
                <td>${material.descripcion}</td>
                <td>${material.categoria}</td>
                <td>${material.unidadMedida}</td>
                <td>${material.estado ? 'Activo' : 'Inactivo'}</td>
            `;
            tabla.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar los materiales escolares:', error);
    });
}

async function cargarHijos() {
    const tabla = document.getElementById('tabla-registroHijos').querySelector('tbody');
    fetch('http://localhost:3000/registroHijos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tabla.innerHTML = '';
        data.forEach(hijo => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${hijo.nombrecompletoHijo}</td>
                <td>${hijo.cedula}</td>
                <td>${hijo.nivelEducativo}</td>
                <td>${hijo.annoLectivo}</td>
            `;
            tabla.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar el registro de hijos:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
    cargarNiveles();
    cargarCategorias();
    cargarMateriales();
    cargarHijos();
});
