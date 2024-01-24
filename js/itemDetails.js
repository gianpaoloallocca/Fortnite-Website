$(document).ready(function() {
    // Recupera l'ID dall'URL dei parametri
    var urlParams = new URLSearchParams(window.location.search);
    var itemId = urlParams.get('id');

    // Effettua una richiesta HTTP per ottenere i dettagli dell'oggetto con l'ID corrispondente
    $.ajax({
      url: 'https://fortniteapi.io/v2/shop?lang=it',
      headers: {
        'Authorization': '57dbef59-1a4bef55-09fe9f0c-880f4d49' // Sostituisci YOUR_API_KEY con la tua chiave API
      },
      success: function(response) {
        // Ottieni gli oggetti dalla risposta dell'API
        var shopItems = response.shop;

        // Trova l'oggetto corrispondente nell'array degli oggetti dello shop
        var selectedItem = shopItems.find(function(item) {
          return item.offerId === itemId;
        });

        if (selectedItem) {
          // Costruisci il codice HTML per visualizzare i dettagli dell'oggetto
          var dettagliHTML = '<div>' +
          '<h2>' + selectedItem.displayName + '</h2>';
      
      if (selectedItem.mainId !== null) {
          dettagliHTML += '<p>ID: <span class="name">' + selectedItem.mainId + '</span></p>';
      }
      
      if (selectedItem.firstReleaseDate !== null) {
        const firstReleaseDate = new Date(selectedItem.firstReleaseDate);
        const formattedFirstReleaseDate = `${firstReleaseDate.getDate()}/${firstReleaseDate.getMonth() + 1}/${firstReleaseDate.getFullYear()}`;
        dettagliHTML += '<p>Prima uscita: <span class="name">' + formattedFirstReleaseDate + '</span></p>';
      }
      
      if (selectedItem.previousReleaseDate !== null) {
        const previousReleaseDate = new Date(selectedItem.previousReleaseDate);
        const formattedPreviousReleaseDate = `${previousReleaseDate.getDate()}/${previousReleaseDate.getMonth() + 1}/${previousReleaseDate.getFullYear()}`;
        dettagliHTML += '<p>Ultima uscita: <span class="name">' + formattedPreviousReleaseDate + '</span></p>';
      }
      
      
      if (selectedItem.price && selectedItem.price.finalPrice !== null) {
          dettagliHTML += '<p>Prezzo: <span class="name">' + selectedItem.price.finalPrice + ' V-Buck</span></p>';
      }
      
      if (selectedItem.rarity && selectedItem.rarity.name !== null) {
          dettagliHTML += '<p>Rarità: <span class="name">' + selectedItem.rarity.name + '</span></p>';
      }
      
      if (selectedItem.displayType !== null) {
          dettagliHTML += '<p>Tipo: <span class="name">' + selectedItem.displayType + '</span></p>';
      }
      
      if (selectedItem.series && selectedItem.series.name !== null) {
          dettagliHTML += '<p>Serie: <span class="name">' + selectedItem.series.name + '</span></p>';
      }
      
      if (selectedItem.displayDescription !== null) {
        if(selectedItem.displayDescription.trim() !== ""){
          dettagliHTML += '<p>Descrizione: <span class="name">' + selectedItem.displayDescription + '</span></p>';
        }
          
      }
      
      dettagliHTML += '</div>';
      

          // Aggiorna il contenuto dell'elemento 'dettagli-oggetto' con i dettagli dell'oggetto
          var dettagliOggettoElement = document.getElementById('dettagli-oggetto');
          dettagliOggettoElement.innerHTML = dettagliHTML;
        }
      },
      error: function() {
        console.log('Errore durante la richiesta dell\'API.');
      }
    });
  });