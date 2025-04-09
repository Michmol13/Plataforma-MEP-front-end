const inputnombreNivel = document.getElementById("txtnombreNivel");
const inputdescripcionNivel = document.getElementById("txtdescripcionNivel");
const inputestadoNivel = document.getElementById("txtestadoNivel");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll('input[required], textarea[required], select[required]');

// Añadir un mensaje de error debajo de cada campo
function crearMensajeError(campo) {
    const mensajeError = document.createElement('span');
    mensajeError.classList.add('error-msg');
    mensajeError.style.color = 'red';
    mensajeError.textContent = 'Este campo es obligatorio.';
    campo.parentElement.appendChild(mensajeError);
}

// Función de validación
function validar() {
    let error = false;

    // Limpiar los mensajes de error anteriores
    document.querySelectorAll('.error-msg').forEach(msg => msg.remove());

    // Limpiar los bordes rojos de los campos anteriores
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.classList.remove('error');
    });

    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value.trim() === "") {
            inputsRequeridos[i].classList.add('error');
            crearMensajeError(inputsRequeridos[i]);
            error = true;
        } else {
            inputsRequeridos[i].classList.remove('error');
        }
    }

    if (!error) {
        registrarNivelEducativo();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos requeridos.',
        });
    }
}

// Función para registrar el nivel educativo
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

// Agregar evento al botón "Guardar"
btnGuardar.addEventListener('click', validar);
