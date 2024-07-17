
function validar(u,p,usuario) {
  const url = "http://localhost:8080/usuario/login";
  const userData = {
    username: u,
    contrasenia: p
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  };

  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar correctamente');
      }
      return response.json();
    })
    .then(data => {
      // Manejar la respuesta del backend
      if (data) {
            let p = document.getElementById("error-login");
            p.textContent = "Usuario encontrado!";
            p.style.margin = "10px";
            p.style.color = "green";
            if( usuario.usuario===u && usuario.rol==="admin") {
              window.location.href = `admin.html?id=${usuario.id_usuario}`;
            }
            if( usuario.usuario===u && usuario.rol==="odonto") {
              //window.location.href = 'odontologo.html';
            }
      } else {
            console.log('La autenticación falló. Usuario y/o contraseña incorrectos.');
            let p = document.getElementById("error-login");
            p.textContent = "Usuario o contraseña incorrecto/s"
            p.style.color = "red";
            p.style.margin = "10px";
      } 
    })
    .catch(error => {
      // Manejar errores
      console.error('¡Hubo un problema con la solicitud Fetch:', error.message);
    });
    
}


document.getElementById('btnLogin').addEventListener('click', (event) => {
  
  event.preventDefault();

  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  fetch('http://localhost:8080/usuario/traer')
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar correctamente');
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      data.forEach(e => {
        validar(u,p,e);
      });
      
    })
    .catch(error => {
      console.error('¡Hubo un problema con la solicitud Fetch:', error.message);
    });

});








