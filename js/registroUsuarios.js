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

function validar() {
    let error = false;
    for (let i = 0; i < inputsRequeridos.length; i++){
        if (inputsRequeridos[i].value == ""){
            inputsRequeridos[i].classList.add('error');
            error = true;
        } else {
            inputsRequeridos[i].classList.remove('error');
        }
    }

    if(error == false){
        registrarUsuarios();
    } 
}

function registrarUsuarios(){
    const datosUsuario = {
        nombreCompleto: inputnombreCompleto.value,
        cedula: inputcedula.value,
        correoElectronico: inputcorreoElectronico.value,
        contrasena: inputcontrasena.value,
        confirmarContrasena: inputconfirmarContrasena.value,
        rol: inputrol.value,
        estadoCuenta: inputestadoCuenta.value,
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
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar a el usuario"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
}

btnGuardar.addEventListener('click', validar);