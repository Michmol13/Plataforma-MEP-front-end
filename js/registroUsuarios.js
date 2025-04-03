const inputnombreCompleto = document.getElementById("txtnombreCompleto");
const inputcedula = document.getElementById("txtcedula");
const inputcorreoElectronico = document.getElementById("txtcorreoElectronico");
const inputcontrasena = document.getElementById("txtcontrasena");
const inputconfirmarContrasena = document.getElementById("txtconfirmarContrasena");
const inputrol = document.getElementById("txtrol");
const inputestadoCuenta = document.getElementById("txtestadoCuenta");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll('input[required]');

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
    const regexCedulaCR = /^\d{1}-\d{3,4}-\d{3,5}$/;
    return regexCedulaCR.test(cedula);
}

function validar() {
    let error = false;
    
    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == "") {
            inputsRequeridos[i].classList.add('error');
            error = true;
        } else {
            inputsRequeridos[i].classList.remove('error');
        }
    }

    if (!validarCedula(inputcedula.value)) {
        inputcedula.classList.add('error');
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Formato de cédula inválido. Use X-XXXX-XXXX o X-XXX-XXXXX"
        });
        return;
    } else {
        inputcedula.classList.remove('error');
    }

    if (inputcontrasena.value !== inputconfirmarContrasena.value) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Las contraseñas no coinciden"
        });
        return;
    }

    if (!error) {
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