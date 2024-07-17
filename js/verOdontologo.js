
window.onload = mostrarDatos();

function mostrarDatos() {

    fetch(`http://localhost:8080/odontologo/traer`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(odontologos => {
        console.log(odontologos);
        let contenidoTabla = "";

        odontologos.forEach(e => {
            let contenidoFila = ` <tr>
            <td> ${e.nombre} </td>
            <td> ${e.apellido} </td>
            <td> ${e.dni} </td>
            <td> ${e.fecha_nac} </td>
            <td> ${e.telefono} </td>
            <td> ${e.direccion} </td>
            <td> ${e.especialidad} </td>
            <td> ${e.unUsuario.usuario} </td>
            <td> ${e.unHorario.horario_inicio} </td>
            <td> ${e.unHorario.horario_final} </td>
            <td style="display: flex; width: 230px;">
            <div>
                <button  onclick="elimOdonto(${e.id},${e.unUsuario.id_usuario},${e.unHorario.id_horario})" class="btn btn-primary btn-user btn-block" style="background-color: red; margin-right: 5px ">
                    <i class="fas fa-trash-alt"></i> Eliminar
                </button>
            </div>
            <div >
                <button  onclick="editOdonto(${e.id})" class="btn btn-primary btn-user btn-block" style="margin-left: 5px ">
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
}
    
function elimOdonto(id_odonto, id_usu, id_hor) { 
    return fetch(`http://localhost:8080/odontologo/eliminar/${id_odonto}`, {
        method: "DELETE",
        })
    .then(data => {
        return fetch(`http://localhost:8080/usuario/borrar/${id_usu}`, {
        method: "DELETE",
        })
    })
    .then(data => {
        return fetch(`http://localhost:8080/horario/borrar/${id_hor}`, {
        method: "DELETE",
        })
    })
    .then(data =>  {
        window.location.reload();
    })
}

let editOdonto = async(id_odonto) => {
    
    openModal(id_odonto);
    
    const odontologo = await buscarOdontologo(id_odonto);

    cargarDatos(odontologo);

    // Manejar el envío del formulario de actualización
    document.getElementById('updateForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        odontologo.dni = document.getElementById("dni").value;
        odontologo.nombre = document.getElementById("nom").value;
        odontologo.apellido = document.getElementById("ape").value;
        odontologo.fecha_nac = document.getElementById("fechaN").value;
        odontologo.direccion = document.getElementById("dir").value;
        odontologo.telefono = document.getElementById("tel").value;
        odontologo.especialidad = document.getElementById("esp").value;

        fetchEditarOdonto(odontologo);

        closeModal(); // Cerrar el modal después de enviar el formulario
    });

    document.getElementById("btnActualizar").addEventListener("click", function() {
        window.location.href = 'admin_verOdontologos.html';
    })

}

// Función para abrir el modal
function openModal(id_odonto) {
    document.getElementById('myModal').style.display = "block";
    document.getElementById('id').value = id_odonto;
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

function fetchEditarOdonto(odontologo) {
    return fetch(`http://localhost:8080/odontologo/editar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(odontologo)
  }).then( (respuesta) => respuesta).catch((err) => console.log(err));
}

function buscarOdontologo(id_odonto) {
    return fetch(`http://localhost:8080/odontologo/traer/${id_odonto}`)
           .then( respuesta => {
                return respuesta.json();
           });
}

function cargarDatos(odontologo) {
    document.getElementById("dni").value = odontologo.dni;
    document.getElementById("nom").value = odontologo.nombre;
    document.getElementById("ape").value = odontologo.apellido;
    document.getElementById("fechaN").value = odontologo.fecha_nac;
    document.getElementById("dir").value = odontologo.direccion;
    document.getElementById("tel").value = odontologo.telefono;
    document.getElementById("esp").value = odontologo.especialidad;
}

















