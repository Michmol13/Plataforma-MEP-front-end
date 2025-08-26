const API_BASE_URL = "https://plataformamep-node.onrender.com";

async function cargarUsuarios() {
    const tabla = document.getElementById('tabla-registroUsuarios').querySelector('tbody');
    fetch(`${API_BASE_URL}/registroUsuarios`, {
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
                <td data-label="Nombre Completo">${usuario.nombreCompleto}</td>
                <td data-label="Cédula">${usuario.cedula}</td>
                <td data-label="Correo Electrónico">${usuario.correoElectronico}</td>
                <td data-label="Rol">${usuario.rol}</td>
                <td data-label="Estado Cuenta">${usuario.estadoCuenta ? 'Activo' : 'Inactivo'}</td>
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
    fetch(`${API_BASE_URL}/registroNivelesEducativos`, {
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
                <td data-label="Nombre Nivel Educativo">${nivel.nombreNivel}</td>
                <td data-label="Descripción">${nivel.descripcion}</td>
                <td data-label="Estado">${nivel.estado ? 'Activo' : 'Inactivo'}</td>
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
    fetch(`${API_BASE_URL}/registroCategoria`, {
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
                <td data-label="Categoría">${categoria.nombre}</td>
                <td data-label="Descripción">${categoria.descripcion}</td>
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
    fetch(`${API_BASE_URL}/registroMaterialesEscolares`, {
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
                <td data-label="Material">${material.nombreMaterial}</td>
                <td data-label="Descripción">${material.descripcion}</td>
                <td data-label="Categoria">${material.categoria?.nombre || 'Sin categoría'}</td>
                <td data-label="Unidad de Medida">${material.unidadMedida}</td>
                <td data-label="Estado">${material.estado ? 'Activo' : 'Inactivo'}</td>
            `;
            tabla.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar los materiales escolares:', error);
    });
}

async function cargarListas() {
    const tabla = document.getElementById('tabla-registroListas').querySelector('tbody');
    fetch(`${API_BASE_URL}/registroListasUtiles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        tabla.innerHTML = '';
        data.forEach(lista => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td data-label="Nombre Lista">${lista.nombreLista}</td>
                <td data-label="Nivel Educativo">${lista.nivelEducativo?.nombreNivel || 'Sin categoría'}</td>
                <td data-label="Fecha de creacion">${lista.fechaCreacion}</td>
                <td data-label="Estado">${lista.estadoLista ? 'Activo' : 'Inactivo'}</td>
                <td data-label="Materiales">
                    ${lista.materiales.map(m => `
                        <div>
                            <strong>${m.material?.nombreMaterial || 'Sin nombre'}</strong> - Cantidad: ${m.cantidad}
                            ${m.observaciones ? `<br>(${m.observaciones})` : ''}
                        </div>
                    `).join('')}
                </td>
            `;
            tabla.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar el registro de lista de utiles:', error);
    });
}

async function cargarHijos() {
    const tabla = document.getElementById('tabla-registroHijos').querySelector('tbody');
    fetch(`${API_BASE_URL}/registroHijos`, {
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
                <td data-label="Nombre Completo">${hijo.nombrecompletoHijo}</td>
                <td data-label="Cedula">${hijo.cedula}</td>
                <td data-label="Nivel Educativo">${hijo.nivelEducativo?.nombreNivel || 'Sin categoría'}</td>
                <td data-label="Año lectivo">${hijo.annoLectivo}</td>
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
    cargarListas();
    cargarHijos();
});
