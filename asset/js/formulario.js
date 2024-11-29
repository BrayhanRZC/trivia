document.getElementById('enviar').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('caja-preguntas').style.display = 'flex';
    document.getElementById('caja-formulario').style.display = 'none';
});


document.addEventListener('DOMContentLoaded', function() {
    var pasoActual = 1;
    var btnSiguiente = document.querySelector('.btn-siguiente');
    var btnAtras = document.querySelector('.btn-atras');
    var btnEnviar = document.querySelector('.btn-enviar');
    var submitBtn = document.querySelector('#submitBtn');

    function showElement(element) {
        if (element) {
            element.style.display = 'inline-block';
        }
    }

    btnSiguiente.addEventListener('click', function() {
        if (pasoActual < 3) {
            var inputs = document.querySelectorAll('input[name="paso' + pasoActual + '"]:checked');
            if (inputs.length === 0) {
                mostrarErrorPopup();
                return;
            }
            document.querySelector('.paso-' + pasoActual).style.display = 'none';
            document.querySelector('.paso-' + (pasoActual + 1)).style.display = 'inline-block';
            showElement(document.querySelector('.btn-atras'));
            document.querySelector('.btn-enviar').style.display = 'none';
            document.querySelector('.progress-bar').style.width = (pasoActual * 50) + '%';
            pasoActual++;
            gsap.from('.paso-' + pasoActual, {
                opacity: 0,
                duration: 0.5
            });
        }
        if (pasoActual === 3) {
            document.querySelector('.btn-siguiente').style.display = 'none';
            showElement(document.querySelector('.btn-enviar'));
            document.querySelector('.btn-enviar').textContent = 'Enviar';
        }
    });

    btnAtras.addEventListener('click', function() {
        if (pasoActual > 1) {
            document.querySelector('.paso-' + pasoActual).style.display = 'none';
            document.querySelector('.paso-' + (pasoActual - 1)).style.display = 'inline-block';
            document.querySelector('.btn-enviar').style.display = 'none';
            showElement(document.querySelector('.btn-siguiente'));
            document.querySelector('.progress-bar').style.width = ((pasoActual - 2) * 50) + '%';
            pasoActual--;
            gsap.from('.paso-' + pasoActual, {
                opacity: 0,
                duration: 0.5
            });
        }
        if (pasoActual === 1) {
            document.querySelector('.btn-atras').style.display = 'none';
        }
    });

    submitBtn.addEventListener('click', function() {
        // Obtener datos del formulario de preguntas
        var formDataPasos = new FormData(document.getElementById('form-pasos'));
        // Obtener datos del formulario de desafío
        var formDataDesafio = new FormData(document.getElementById('desafioForm'));
    
        // Obtener los elementos del formulario de desafío
        var nombre = document.getElementById('nombre').value;
        var email = document.getElementById('email').value;
        var celular = document.getElementById('celular').value;
        
        // Obtener el valor seleccionado del campo departamento
        var departamentoSelect = document.getElementById('departamento');
        var departamento = departamentoSelect.options[departamentoSelect.selectedIndex].value;
    
        // Obtener el valor seleccionado del campo ciudad
        var ciudadSelect = document.getElementById('ciudad');
        var ciudad = ciudadSelect.options[ciudadSelect.selectedIndex].value;
        
        var aceptaTerminos = document.getElementById("agreeCheckbox").checked;
    
    
        // Agregar datos del formulario de desafío al FormData correspondiente
        formDataDesafio.append('nombre', nombre);
        formDataDesafio.append('email', email);
        formDataDesafio.append('celular', celular);
        formDataDesafio.append('departamento', departamento);
        formDataDesafio.append('ciudad', ciudad);
        formDataDesafio.append('aceptaTerminos', aceptaTerminos);
    
        // Agregar información adicional del formulario de preguntas al FormData del formulario de desafío
        var fechaHoraActual = new Date();
        formDataDesafio.append('fecha', fechaHoraActual.toLocaleDateString());
        formDataDesafio.append('hora', fechaHoraActual.toLocaleTimeString());
    
        // Combinar formDataPasos y formDataDesafio en un solo FormData
        for (var pair of formDataPasos.entries()) {
            formDataDesafio.append(pair[0], pair[1]);
        }
    
        // Función para mostrar una ventana emergente o spinner mientras se envían los datos
         // Función para mostrar una ventana emergente o spinner mientras se envían los datos
    function mostrarPopup() {
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.spinner-popup').style.display = 'block';
        setTimeout(function() {
            document.querySelector('.overlay').style.display = 'none';
            document.querySelector('.spinner-popup').style.display = 'none';
            // Redirige a la siguiente URL después de enviar el formulario con éxito
            window.top.location.href = 'https://www.lorenzano.co/trivia-gracias';
        }, 6000);
    }
        mostrarPopup();
    
        // Enviar datos al servidor
        fetch('https://hook.us2.make.com/m8ebk2g5wq9q6jvszwj3kshqomwdm38r', {
            method: 'POST',
            body: formDataDesafio
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            // Lógica después de recibir la respuesta del servidor
        })
        .catch(function(error) {
            console.error('Error:', error);
            // Manejo de errores
        });
    });

  
});



// Mostrar el popup cuando se hace clic en el texto de autorización
document.getElementById("popupTrigger").addEventListener("click", function() {
    var popup = document.getElementById("popup");
    popup.style.display = "flex";
    // Asegurar que el popup se abra en toda la pantalla del sitio
    window.parent.postMessage({action: 'showPopup'}, '*');
    });
    
    // Cerrar el popup cuando se hace clic en el botón de cerrar
    document.getElementById("closePopupButton").addEventListener("click", function() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
    });



/*
// Oculta la seccion formulario y visualiza la seccion pregunta

document.getElementById('enviar').addEventListener('click', function(event) {
    // Evitamos que el formulario se envíe por defecto
    event.preventDefault();
    // Cambiamos el estilo de la sección de preguntas
    document.getElementById('caja-preguntas').style.display = 'flex';
    // Ocultamos la sección del formulario
    document.getElementById('caja-formulario').style.display = 'none';
});






document.addEventListener('DOMContentLoaded', function() {
    var pasoActual = 1;
    var btnSiguiente = document.querySelector('.btn-siguiente');
    var btnAtras = document.querySelector('.btn-atras');
    var btnEnviar = document.querySelector('.btn-enviar');
    var submitBtn = document.querySelector('#submitBtn');

    function showElement(element) {
        if (element) {
            element.style.display = 'inline-block';
        }
    }

    btnSiguiente.addEventListener('click', function() {
        if (pasoActual < 3) {
            var inputs = document.querySelectorAll('input[name="paso' + pasoActual + '"]:checked');
            if (inputs.length === 0) {
                mostrarErrorPopup();
                return;
            }
            document.querySelector('.paso-' + pasoActual).style.display = 'none';
            document.querySelector('.paso-' + (pasoActual + 1)).style.display = 'inline-block';
            showElement(document.querySelector('.btn-atras'));
            document.querySelector('.btn-enviar').style.display = 'none';
            document.querySelector('.progress-bar').style.width = (pasoActual * 50) + '%';
            pasoActual++;
            gsap.from('.paso-' + pasoActual, {
                opacity: 0,
                duration: 0.5
            });
        }
        if (pasoActual === 3) {
            document.querySelector('.btn-siguiente').style.display = 'none';
            showElement(document.querySelector('.btn-enviar'));
            document.querySelector('.btn-enviar').textContent = 'Enviar';
        }
    });

    btnAtras.addEventListener('click', function() {
        if (pasoActual > 1) {
            document.querySelector('.paso-' + pasoActual).style.display = 'none';
            document.querySelector('.paso-' + (pasoActual - 1)).style.display = 'inline-block';
            document.querySelector('.btn-enviar').style.display = 'none';
            showElement(document.querySelector('.btn-siguiente'));
            document.querySelector('.progress-bar').style.width = ((pasoActual - 2) * 50) + '%';
            pasoActual--;
            gsap.from('.paso-' + pasoActual, {
                opacity: 0,
                duration: 0.5
            });
        }
        if (pasoActual === 1) {
            document.querySelector('.btn-atras').style.display = 'none';
        }
    });

    submitBtn.addEventListener('click', function() {
        var formData = new FormData(document.getElementById('form-pasos'));
        var fechaHoraActual = new Date();
        formData.append('fecha', fechaHoraActual.toLocaleDateString());
        formData.append('hora', fechaHoraActual.toLocaleTimeString());

        function mostrarPopup() {
            document.querySelector('.overlay').style.display = 'block';
            document.querySelector('.spinner-popup').style.display = 'block';
            setTimeout(function() {
                document.querySelector('.overlay').style.display = 'none';
                document.querySelector('.spinner-popup').style.display = 'none';
                window.location.href = 'https://momentosfriko.com';
            }, 6000);
        }
        mostrarPopup();

        fetch('https://hook.us1.make.com/cxndb4giflcolhx6uovzqqe3ttoqv3ds', {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
    });

    function mostrarErrorPopup() {
        document.querySelector('.error-popup').style.display = 'block';
        setTimeout(function() {
            document.querySelector('.error-popup').style.display = 'none';
        }, 2000);
    }
});
    */
