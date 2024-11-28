$(document).ready(function() {
  var pasoActual = 1;

  $('.btn-siguiente').click(function() {
    if (pasoActual < 3) {
      if ($('input[name=paso' + pasoActual + ']:checked').length === 0) {
        mostrarErrorPopup();
        return;
      }
      $('.paso-' + pasoActual).hide();
      $('.paso-' + (pasoActual + 1)).show();
      $('.btn-atras').show();
      $('.btn-enviar').hide();
      $('.progress-bar').css('width', (pasoActual * 50) + '%');
      pasoActual++;

      // Animación GSAP
      gsap.from('.paso-' + pasoActual, { opacity: 0, duration: 0.5 });
    }
    if (pasoActual === 3) {
      $('.btn-siguiente').hide();
      $('.btn-enviar').show().text('Enviar');
    }
  });

  $('.btn-atras').click(function() {
    if (pasoActual > 1) {
      $('.paso-' + pasoActual).hide();
      $('.paso-' + (pasoActual - 1)).show();
      $('.btn-enviar').hide();
      $('.btn-siguiente').show();
      $('.progress-bar').css('width', ((pasoActual - 2) * 50) + '%');
      pasoActual--;

      // Animación GSAP
      gsap.from('.paso-' + pasoActual, { opacity: 0, duration: 0.5 });
    }
    if (pasoActual === 1) {
      $('.btn-atras').hide();
    }
  });

  $('#submitBtn').click(function() {
    var data = $('#form-pasos').serialize();
    // Agregar la fecha y hora actual al objeto de datos
    var fechaHoraActual = new Date();
    data += '&fecha=' + fechaHoraActual.toLocaleDateString() + '&hora=' + fechaHoraActual.toLocaleTimeString();
    // Función para mostrar el popup y el overlay
    function mostrarPopup() {
      $('.overlay').fadeIn();
      $('.spinner-popup').fadeIn();

      // Ocultar el popup y el overlay después de 6 segundos
      setTimeout(function() {
        $('.overlay').fadeOut();
        $('.spinner-popup').fadeOut();
        // Redirigir a la página deseada
        window.location.href = 'https://momentosfriko.com';
      }, 6000);
    }
    // Mostrar el popup con el spinner y el overlay
    mostrarPopup();
    // Aquí puedes enviar los datos utilizando AJAX a tu webhook
    $.post('https://hook.us1.make.com/cxndb4giflcolhx6uovzqqe3ttoqv3ds', data, function(response) {
      // Manejar la respuesta del webhook si es necesario
      console.log(response);
    });
  });

  function mostrarErrorPopup() {
    $('.error-popup').fadeIn().delay(2000).fadeOut();
  }
});
