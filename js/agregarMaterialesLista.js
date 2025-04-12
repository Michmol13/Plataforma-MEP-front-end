const listaUtiles = document.getElementById("sltregistroListasUtiles");
const listaMateriales = document.getElementById("sltMateriales");
const botonAsociar = document.getElementById("btnAsociar");

async function mostrarListaUtiles(){
    fetch('http://localhost:3000/registroListasUtiles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        listaUtiles.innerHTML = ''; //Instrucción que limpia la tabla antes de cargarla
        const opcionDefault = document.createElement("option");
        opcionDefault.value = "";
        opcionDefault.textContent = "Seleccione una opción";
        opcionDefault.disabled = true;
        opcionDefault.selected = true;
        listaUtiles.appendChild(opcionDefault);

        data.forEach(lista => {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = lista.nombreLista;
            nuevaOpcion.textContent = lista.nombreLista;
            listaUtiles.appendChild(nuevaOpcion);
        })
    });
}

async function mostrarMateriales(){
    fetch('http://localhost:3000/registroMaterialesEscolares', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        listaMateriales.innerHTML = ''; //Instrucción que limpia la tabla antes de cargarla
        const opcionDefault = document.createElement("option");
        opcionDefault.value = "";
        opcionDefault.textContent = "Seleccione una opción";
        opcionDefault.disabled = true;
        opcionDefault.selected = true;
        listaMateriales.appendChild(opcionDefault);

        data.forEach(material => {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = material._id;
            nuevaOpcion.textContent = material.nombreMaterial;
            listaMateriales.appendChild(nuevaOpcion);
        })
    });
}

/*function asociarMaterial(){
    const datosCertifUsuario = {
        cedula: listaUsuarios.value,
        certificacionId: listaCertificaciones.value
    }
    fetch("http://localhost:3000/usuarios/agregar-certificacion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosCertifUsuario)
    }).then(response => {
        if(!response.ok){
            alert("No se pudo asociar la certificacion");
        }else{
            alert("certificacion asociada con éxito");
        }
    }).catch(error =>{
        console.log(error);
    })
}*/

mostrarListaUtiles();
mostrarMateriales();