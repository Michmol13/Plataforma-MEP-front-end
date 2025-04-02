const inputnombreCompleto = document.getElementById("txtnombreCompleto");
const inputcedula = document.getElementById("txtcedula");
const inputcorreoElectronico = document.getElementById("txtcorreoElectronico");
const inputcontrasena = document.getElementById("txtcontrasena");
const inputconfirmarContrasena = document.getElementById("txtconfirmarContrasena");
const inputrol= document.getElementById("txtrol");
const inputestadoCuenta = document.getElementById("txtestadoCuenta");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll('input[required], textarea[required], select[required]');


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
        registrarUsuario();
    } 
}

function registrarUsuario() {
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
    })
    .then(response => {
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
                text: "No se pudo registrar el usuario"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
}

// Agregar evento al botón "Guardar"
btnGuardar.addEventListener('click', validar);
