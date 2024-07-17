
document.getElementById("btnCrearOdontologo").addEventListener("click", () => {
    registrarOdontologo();
})

let registrarOdontologo = async() => {

    const usu = document.getElementById("nombreUsu").value;
    const pass = document.getElementById("password").value;
    const rol = document.getElementById("rol").value;

    const hor_ini = document.getElementById("hor_ini").value;
    const hor_fin = document.getElementById("hor_final").value;

    const id_usu = await saveUsuario(usu,pass,rol);
    
    const id_hor = await saveHorario(hor_ini,hor_fin);


    let odontologo = {
        dni : document.getElementById("dni").value,
        nombre : document.getElementById("nombre").value,
        apellido : document.getElementById("apellido").value,
        telefono : document.getElementById("telefono").value,
        direccion : document.getElementById("direccion").value,
        fecha_nac : document.getElementById("fechaNac").value,
        especialidad : document.getElementById("especialidad").value,

        unUsuario: {
            id_usuario : id_usu
        },

        unHorario: {
            id_horario : id_hor
        }
        
    }

    const peticionO = await fetch("http://localhost:8080/odontologo/crear",
    {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(odontologo)
    });
    
    alert("Odontologo creado correctamente!");

    limpiar();
}

function limpiar() {
    var input = document.getElementById('dni');
    input.value = '';
    
    input = document.getElementById('nombre');
    input.value = '';
    
    input = document.getElementById('apellido');
    input.value = '';
    
    input = document.getElementById('telefono');
    input.value = '';
    
    input = document.getElementById('direccion');
    input.value = '';
    
    input = document.getElementById('fechaNac');
    input.value = '';
    
    input = document.getElementById('especialidad');
    input.value = '';
    
    input = document.getElementById('usu');
    input.value = '';
    
    input = document.getElementById('pass');
    input.value = '';
    
    input = document.getElementById('rol');
    input.value = '';
    
    input = document.getElementById('hor_ini');
    input.value = '';
    
    input = document.getElementById('hor_final');
    input.value = '';

}

function saveUsuario(u,p,r) {
    let usuario = {
        usuario : u,
        contrasenia : p,
        rol : r
    }

    return fetch("http://localhost:8080/usuario/crear",
        {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al realizar la solicitud');
            }
            return response.json(); // Parsear la respuesta como JSON
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}

function saveHorario(hI,hF) {
    let horario = {
        horario_inicio : hI,
        horario_final : hF
    }

    return fetch("http://localhost:8080/horario/crear",
        {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(horario)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al realizar la solicitud');
            }
            return response.json(); // Parsear la respuesta como JSON
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}