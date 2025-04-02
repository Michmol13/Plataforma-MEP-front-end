const inputnombreLista = document.getElementById("txtnombreLista");
const inputnivelEducativo = document.getElementById("txtnivelEducativo");
const inputfechaCreacion = document.getElementById("txtfechaCreacion");
const inputestadoLista = document.getElementById("txtestadoLista");
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
        registrarLista();
    } 
}

function registrarLista(){
    const datosLista = {
        nombreLista: inputnombreLista.value,
        nivelEducativo: inputnivelEducativo.value,
        fechaCreacion: inputfechaCreacion.value,
        estadoLista: inputestadoLista.value,
    };
    fetch("http://localhost:3000/registroListasUtiles", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosLista)
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Lista registrada",
                text: "Su lista ha sido registrada con éxito"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar la lista"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
    
}



btnGuardar.addEventListener('click', validar);