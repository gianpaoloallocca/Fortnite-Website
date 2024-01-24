$(document).ready(function() {
    // Effettua la chiamata AJAX per ottenere i dati della mappa
    $.ajax({
      url: 'https://fortnite-api.com/v1/map',
      method: 'GET',
      success: function(response) {
        // Estrai l'URL dell'immagine della mappa dal response
        var mapImageUrl = response.data.images.pois;

        // Inserisci l'immagine della mappa nel div con l'ID "map"
        $('#map').html('<img src="' + mapImageUrl + '" alt="Mappa Fortnite">');
      },
      error: function() {
        // Gestisci eventuali errori nella chiamata AJAX
        $('#map').html('Si è verificato un errore durante il caricamento della mappa.');
      }
    });
  });