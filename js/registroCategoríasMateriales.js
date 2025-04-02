document.getElementById('btnGuardar').addEventListener('click', async () => {
    const nombre = document.getElementById('nombreCategoria').value;
    const descripcion = document.getElementById('descripcionCategoria').value;

    if (!nombre.trim()) {
        Swal.fire("Error", "El nombre de la categoría es obligatorio", "error");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/categorias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, descripcion })
        });

        if (response.ok) {
            Swal.fire("Éxito", "Categoría registrada correctamente", "success");
            document.getElementById('categoriaForm').reset();
        } else {
            Swal.fire("Error", "No se pudo registrar la categoría", "error");
        }
    } catch (error) {
        Swal.fire("Error", "Hubo un problema con la conexión", "error");
    }
});
