
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
// Mostrar el ID del usuario en la página

let inicio = async() => {

    let secreatarias = await getSecretarias();

    let id = parseFloat(userId);

    let secretaria = {};

    secreatarias.forEach(element => {
        if( element.unUsuario.id_usuario===id ) {
            secretaria = element;
        }
    });

    document.getElementById("perfil").textContent = secretaria.nombre + " " + secretaria.apellido;

}

function getSecretarias() {
    return fetch("http://localhost:8080/secretaria/traer")
        .then( respuesta => {
            return respuesta.json();
        });
    }

window.onload = inicio();
