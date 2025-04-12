const inputnombreNivel = document.getElementById("txtnombreNivel");
const inputdescripcionNivel = document.getElementById("txtdescripcionNivel");
const inputestadoNivel = document.getElementById("txtestadoNivel");
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
        registrarNivelEducativo();
    }
}

function registrarNivelEducativo() {
    const datosNivel = {
        nombreNivel: inputnombreNivel.value,
        descripcion: inputdescripcionNivel.value,
        estado: inputestadoNivel.value,
    };

    fetch("http://localhost:3000/registroNivelesEducativos", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosNivel)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Nivel Educativo registrado",
                text: "El nivel educativo ha sido registrado con éxito"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar el nivel educativo"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
}

btnGuardar.addEventListener('click', validar);
