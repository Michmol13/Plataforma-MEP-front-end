const inputnombreCompleto = document.getElementById("txtnombreCompleto");
const inputcedula = document.getElementById("txtcedula");
const inputcorreoElectronico = document.getElementById("txtcorreoElectronico");
const inputcontrasena = document.getElementById("txtcontrasena");
const inputconfirmarContrasena = document.getElementById("txtconfirmarContrasena");
const inputrol = document.getElementById("txtrol");
const inputestadoCuenta = document.getElementById("txtestadoCuenta");
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
        registrarUsuarios();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    function togglePasswordVisibility(inputId, buttonId) {
        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);
        const icon = button.querySelector("i"); 

        button.addEventListener("click", function () {
            if (input.type === "password") {
                input.type = "text";
                icon.classList.replace("fa-eye", "fa-eye-slash"); // Cambia a ojo cerrado
            } else {
                input.type = "password";
                icon.classList.replace("fa-eye-slash", "fa-eye"); // Cambia a ojo abierto
            }
        });
    }

    togglePasswordVisibility("txtcontrasena", "togglePassword");
    togglePasswordVisibility("txtconfirmarContrasena", "toggleConfirmPassword");
});

function validarCedula(cedula) {
    const regeistarCedulaCR = /^\d{1}-\d{3,4}-\d{3,5}$/;
    return regeistarCedulaCR.test(cedula);
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
        registrarUsuarios();
    }
}


function registrarUsuarios() {
    const datosUsuario = {
        nombreCompleto: inputnombreCompleto.value,
        cedula: inputcedula.value,
        correoElectronico: inputcorreoElectronico.value,
        contrasena: inputcontrasena.value,
        confirmarContrasena: inputconfirmarContrasena.value,
        rol: inputrol.value,
        estadoCuenta: inputestadoCuenta.value === "true" // Asegurar que se convierta en booleano
    };

    fetch("http://localhost:3000/registroUsuarios", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosUsuario)
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Usuario registrado",
                text: "El usuario ha sido registrado con éxito"
            });
        } else {
            return response.json(); // Obtener respuesta de error desde el backend
        }
    })
    .then(errorResponse => {
        if (errorResponse) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorResponse.msj || "No se pudo registrar al usuario"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
}

btnGuardar.addEventListener('click', validar);