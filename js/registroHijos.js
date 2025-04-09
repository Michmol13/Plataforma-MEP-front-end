const inputnombrecompletoHijo = document.getElementById("txtnombrecompletoHijo");
const inputcedula = document.getElementById("txtcedula");
const inputnivelEducativo = document.getElementById("txtnivelEducativo");
const inputannoLectivo = document.getElementById("txtannoLectivo");
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

function validarCedula(cedula) {
    const registroCedulaCR = /^\d{1}-\d{3,4}-\d{3,5}$/;
    return registroCedulaCR.test(cedula);
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

    if (inputcedula.value.trim() !== "" && !validarCedula(inputcedula.value)) {
        inputcedula.classList.add('input-error');
        mostrarMensajeError(inputcedula);
        Swal.fire({
            icon: "error",
            title: "Cédula inválida",
            text: "La cédula no tiene el formato correcto. Use X-XXXX-XXXX"
        });
        return;
    } 

    if (error) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos obligatorios',
            text: 'Por favor complete todos los campos resaltados.',
        });
    } else {
        registrarHijo();
    }
}

function registrarHijo(){
    const datosHijos = { 
        nombrecompletoHijo: inputnombrecompletoHijo.value,
        cedula: inputcedula.value,
        nivelEducativo: inputnivelEducativo.value,
        annoLectivo: inputannoLectivo.value,
    };
    fetch("http://localhost:3000/registroHijos", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosHijos)
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Hijo registrado",
                text: "Su hijo ha sido registrado con éxito"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar a su hijo"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
    
}


btnGuardar.addEventListener('click', validar);