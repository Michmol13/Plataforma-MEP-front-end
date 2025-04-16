const listaUtiles = document.getElementById("sltregistroListasUtiles");
const listaMateriales = document.getElementById("sltMateriales");
const Cantidad = document.getElementById("txtcantidad");
const Observaciones = document.getElementById("txtobservaciones");
const btnGuardar = document.querySelector("#btnGuardar");


const inputsRequeridos = document.querySelectorAll('input[required], select[required], textarea[required]');
const botonAsociar = document.getElementById("btnAsociar");

function mostrarMensajeError(input) {
    const spanError = document.getElementById(`error-${input.id.replace("txt", "")}`);
    if (spanError) spanError.style.display = "block";
}

function ocultarMensajeError(input) {
    const spanError = document.getElementById(`error-${input.id.replace("txt", "")}`);
    if (spanError) spanError.style.display = "none";
}

function validar() {
    let error = false;

    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value.trim() === "") {
            inputsRequeridos[i].classList.add('input-error');
            mostrarMensajeError(inputsRequeridos[i]);
            error = true;
        } else {
            inputsRequeridos[i].classList.remove('input-error');
            ocultarMensajeError(inputsRequeridos[i]);
        }
    }

    if (error) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos obligatorios',
            text: 'Por favor complete todos los campos resaltados.',
        });
    } else {
        agregarMaterial();
    }
}

function agregarMaterial(){
    const datosMaterial = { 
        nombreLista: listaUtiles.value,
        registroMaterialesEscolaresId: listaMateriales.value,
        cantidad: Cantidad.value,
        observaciones: Observaciones.value,
    };

    fetch("http://localhost:3000/registroListasUtiles/agregar-material", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosMaterial)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Material registrado",
                text: "El material ha sido registrado con éxito"
            });
        } else {
            return response.json().then(data => {
                if (data.msj === "El material ya está agregado en la lista") {
                    Swal.fire({
                        icon: "warning",
                        title: "Material duplicado",
                        text: data.msj
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: data.msj || "Ocurrió un error al registrar el material"
                    });
                }
            });
        }
    })
    .catch(error => {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Error de red",
            text: "No se pudo conectar con el servidor"
        });
    });
}

async function mostrarListaUtiles(){
    fetch('http://localhost:3000/registroListasUtiles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        listaUtiles.innerHTML = ''; //Instrucción que limpia la tabla antes de cargarla
        const opcionDefault = document.createElement("option");
        opcionDefault.value = "";
        opcionDefault.textContent = "Seleccione una opción";
        opcionDefault.disabled = true;
        opcionDefault.selected = true;
        listaUtiles.appendChild(opcionDefault);

        data.forEach(lista => {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = lista.nombreLista;
            nuevaOpcion.textContent = lista.nombreLista;
            listaUtiles.appendChild(nuevaOpcion);
        })
    });
}

async function mostrarMateriales(){
    fetch('http://localhost:3000/registroMaterialesEscolares', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        listaMateriales.innerHTML = '';
        const opcionDefault = document.createElement("option");
        opcionDefault.value = "";
        opcionDefault.textContent = "Seleccione una opción";
        opcionDefault.disabled = true;
        opcionDefault.selected = true;
        listaMateriales.appendChild(opcionDefault);

        data.forEach(material => {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = material._id;
            nuevaOpcion.textContent = material.nombreMaterial;
            listaMateriales.appendChild(nuevaOpcion);
        })
    });
}

btnGuardar.addEventListener('click', validar);
mostrarListaUtiles();
mostrarMateriales();

