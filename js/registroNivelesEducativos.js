const inputnombreNivel = document.getElementById("txtnombreNivel");
const inputdescripcionNivel = document.getElementById("txtdescripcionNivel");
const inputestadoNivel = document.getElementById("txtestadoNivel");
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

// Agregar evento al botón "Guardar"
btnGuardar.addEventListener('click', validar);
