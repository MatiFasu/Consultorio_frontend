fetch(`http://localhost:8080/paciente/traer`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(pacientes => {
        console.log(pacientes);
        let contenidoTabla = "";

        pacientes.forEach(e => {
            let contenidoFila = ` <tr>
            <td> ${e.nombre} </td>
            <td> ${e.apellido} </td>
            <td> ${e.dni} </td>
            <td> ${e.fecha_nac} </td>
            <td> ${e.telefono} </td>
            <td> ${e.direccion} </td>
            <td> ${e.tiene_OS} </td>
            <td> ${e.tipoSangre} </td>
            <td> ${e.unResponsable} </td>
            <td style="display: flex; width: 230px;">
                <div>
                    <button class="btn btn-primary btn-user btn-block" style="background-color: red; margin-right: 5px;">
                        <i class="fas fa-trash-alt"></i> Borrar
                    </button>
                </div>
                <div>
                    <button class="btn btn-primary btn-user btn-block" style="margin-left: 5px;">
                        <i class="fas fa-pencil-alt"></i> Editar
                    </button>
                </div>
            </td>
            `;

            contenidoTabla += contenidoFila;
        }); 
            
        

        document.querySelector("#dataTable tbody").outerHTML = contenidoTabla;
    })
    .catch(error => {
        // Aquí manejas los errores de la solicitud
        console.error('There was a problem with the fetch operation:', error);
    });