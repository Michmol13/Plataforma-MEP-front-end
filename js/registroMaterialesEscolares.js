const inputnombreMaterial = document.getElementById("txtnombreMaterial");
const inputdescripcion = document.getElementById("txtdescripcion");
const inputcategoria = document.getElementById("txtcategoria");
const inputunidadMedida = document.getElementById("txtunidadMedida");
const inputestado = document.getElementById("txtestado");
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
        registrarMaterialesEscolares();
    } 
}

function registrarMaterialesEscolares() {
    const datosMateriales = {
        nombreMaterial: inputnombreMaterial.value,
        descripcion: inputdescripcion.value,
        categoria: inputcategoria.value,
        unidadMedida: inputunidadMedida.value,
        estado: inputestado.value,
    };

    fetch("http://localhost:3000/registroMaterialesEscolares", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosMateriales)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Materiales Escolares registrados",
                text: "Los materiales escolares han sido registrados con éxito"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar el material escolar"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
}

// Agregar evento al botón "Guardar"
btnGuardar.addEventListener('click', validar);
