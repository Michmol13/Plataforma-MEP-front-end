const inputnombre = document.getElementById("txtnombre");
const inputdescripcion = document.getElementById("txtdescripcion");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll('input[required]');

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
        registrarCategoria();
    }
}

function registrarCategoria(){
    const datosCategoria = {
        nombre: inputnombre.value,
        descripcion: inputdescripcion.value,
    };
    fetch("http://localhost:3000/registroCategoria", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosCategoria)
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Categoria registrada",
                text: "La categoria ha sido registrada con éxito"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar la categoria"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
    
}


btnGuardar.addEventListener('click', validar);