const inputnombrecompletoHijo = document.getElementById("txtnombrecompletoHijo");
const inputnivelEducativo = document.getElementById("txtnivelEducativo");
const inputannoLectivo = document.getElementById("txtannoLectivo");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll('input[required]');

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
        registrarHijo();
    } 
}

function registrarHijo(){
    const datosHijos = {
        nombrecompletoHijo: inputnombrecompletoHijo.value,
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