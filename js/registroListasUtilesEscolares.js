const inputnombreLista = document.getElementById("txtnombreLista");
const inputnivelEducativo = document.getElementById("txtnivelEducativo");
const inputfechaCreacion = document.getElementById("txtfechaCreacion");
const inputestadoLista = document.getElementById("txtestadoLista");
const listaListas = document.getElementById("txtniveles-educativos");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll('input[required], select[required], textarea[required]');

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
        registrarLista();
    }
}

function registrarLista(){
    const datosLista = {
        nombreLista: inputnombreLista.value,
        nivelEducativo: inputnivelEducativo.value,
        fechaCreacion: inputfechaCreacion.value,
        estadoLista: inputestadoLista.value,
    };
    fetch("http://localhost:3000/registroListasUtiles", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosLista)
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Lista registrada",
                text: "Su lista ha sido registrada con éxito"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar la lista"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
    
}

async function mostrarNivelesEducativos(){
    fetch('http://localhost:3000/registroNivelesEducativos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        listaListas.innerHTML = ''; 
        const opcionDefault = document.createElement("option");
        opcionDefault.value = "";
        opcionDefault.textContent = "Seleccione una opción";
        opcionDefault.disabled = true;
        opcionDefault.selected = true;
        listaListas.appendChild(opcionDefault);

        data.forEach(nivelEducativo => {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = nivelEducativo._id;
            nuevaOpcion.textContent = nivelEducativo.nombreNivel;
            listaListas.appendChild(nuevaOpcion);
        })
    });
}

mostrarNivelesEducativos();
btnGuardar.addEventListener('click', validar);