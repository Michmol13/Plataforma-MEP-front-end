const inputnombreMaterial = document.getElementById("txtnombreMaterial");
const inputdescripcion = document.getElementById("txtdescripcion");
const inputcategoria = document.getElementById("txtcategoria");
const inputunidadMedida = document.getElementById("txtunidadMedida");
const inputestado = document.getElementById("txtestado");
const listaMateriales = document.getElementById("txtcategoria")
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll('input[required], textarea[required], select[required]');
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
        registrarMaterialesEscolares();
    }
}

function registrarMaterialesEscolares() {
    const datosMateriales = {
        nombreMaterial: inputnombreMaterial.value,
        descripcion: inputdescripcion.value,
        categoria: inputcategoria.value,
        unidadMedida: inputunidadMedida.value,
        estado: inputestado.value,
    };

    fetch("http://localhost:3000/registroMaterialesEscolares", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosMateriales)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Materiales Escolares registrados",
                text: "Los materiales escolares han sido registrados con éxito"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar el material escolar"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
}

async function mostrarCategoriaMateriales(){
    fetch("http://localhost:3000/registroCategoria", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        listaMateriales.innerHTML = ''; 
        data.forEach(categoria => {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = categoria._id;
            nuevaOpcion.textContent = categoria.nombre;
            listaMateriales.appendChild(nuevaOpcion);
        })
    });
}

mostrarCategoriaMateriales();

btnGuardar.addEventListener('click', validar);
