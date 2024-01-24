$(document).ready(function() {
    $.ajax({
      url: 'https://fortniteapi.io/v1/news?lang=it&type=br',
      method: 'GET',
      headers: {
        Authorization: '57dbef59-1a4bef55-09fe9f0c-880f4d49'
      },
      success: function(response) {
        // Estrai le notizie per la modalità Battle Royale
        var newsData = response.news;
  
        function createNewsHtml(news) {
          var html = '';
          html += '<div class="news-item"> <h4 class="news-title">Ultime News</h4>';
          html += '<h3 class="news-title">' + news.title + '</h3>';
          html += '<p class="news-desc">' + news.body + '</p>';
          if (news.image) {
            html += '<img src="' + news.image + '" alt="' + news.title + '">';
          }
          html += '</div>';
          return html;
        }
  
        var allNewsHtml = '';
  
        // Controlla se ci sono notizie disponibili
        if (newsData && newsData.length > 0) {
          newsData.forEach(function(news) {
            allNewsHtml += createNewsHtml(news);
          });
        } else {
          allNewsHtml = '<p>Nessuna notizia disponibile per la modalità Battle Royale.</p>';
        }
        $('#news').html(allNewsHtml);
      },
      error: function() {
        $('#news').html('Si è verificato un errore durante il caricamento delle notizie.');
      }
    });
  });

  $(document).ready(function() {
    const apiUrl = "https://fortniteapi.io/v2/items/upcoming?lang=it";

    const apiKey = "57dbef59-1a4bef55-09fe9f0c-880f4d49";
  
    // Funzione per ottenere i prossimi oggetti
    function getUpcomingItems() {
      $.ajax({
        url: apiUrl,
        headers: {
          Authorization: apiKey,
        },
        success: function(data) {
          const upcomingItems = data.items;
  
          let html = '';
          html+='<h2 class="upcoming-title">In arrivo</h2>';
          upcomingItems.forEach(item => {
            const itemName = item.name;
            const itemImageUrl = item.images.background;
  
            html += `
              <div class="upcoming-item">
                <img src="${itemImageUrl}" alt="${itemName}" class="item-image">
                <p class="item-name">${itemName}</p>
              </div>
            `;
          });
  
          $("#upcoming").html(html);
        },
        error: function(error) {
          console.error(error);
          $("#upcoming").html("Si è verificato un errore durante la richiesta.");
        }
      });
    }
  
    // Chiamata alla funzione per ottenere i prossimi oggetti
    getUpcomingItems();
  });
  