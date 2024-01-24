const apiKey = '57dbef59-1a4bef55-09fe9f0c-880f4d49'; // Inserisci la tua chiave API fornita da FortniteAPI.io

$.ajax({
  url: 'https://fortniteapi.io/v1/events/list/active?lang=it&region=EU&showArena=true',
  headers: {
    Authorization: apiKey,
  },
  method: 'GET',
  success: function(response) {
    if (response.result && response.events && Array.isArray(response.events)) {
      const tournaments = response.events;
      displayTournaments(tournaments);
    } else {
      console.error('Dati dei tornei non validi nella risposta API');
    }
  },
  error: function(error) {
    console.error('Errore durante la richiesta API:', error);
  }
});

function displayTournaments(tournaments) {
  const torneiDiv = $('#tornei');

  tournaments.forEach(function(tournament, index) {
    const tournamentElement = $('<div>').addClass('tournament');
    const nameElement = $('<h3 class="tournaments-title">').text(`${index + 1}: ${tournament.name_line1}`);
    const descriptionElement = $('<p class="tournaments-desc">').text(tournament.long_description);
    
    const beginTime = new Date(tournament.beginTime);
    const formattedBeginTime = `${beginTime.getDate()}/${beginTime.getMonth() + 1}/${beginTime.getFullYear()} - ${beginTime.getHours()}:${beginTime.getMinutes().toString().padStart(2, '0')}`;
    const endTime = new Date(tournament.endTime);
    const formattedEndTime = `${endTime.getDate()}/${endTime.getMonth() + 1}/${endTime.getFullYear()} - ${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')}`;
    const beginTimeElement = $('<p class="tournaments-desc">').text(`Inizio: ${formattedBeginTime}`);
    const endTimeElement = $('<p class="tournaments-desc">').text(`Fine: ${formattedEndTime}`);
    
    
    
    const platformElement = $('<p class="tournaments-desc">').text(`Piattaforma: ${tournament.platforms.join(', ')}`);
    let scheduleElement = null; // Inizialmente impostato su null

    if (tournament.schedule !== null) {
      if (tournament.schedule.trim() !== "") {
        scheduleElement = $('<p class="tournaments-desc">').text(`Calendario: ${tournament.schedule}`);
        tournamentElement.append(scheduleElement);
      }
    }
    
    const posterElement = $('<img class="tournaments-img" width="300px" height="auto">').attr('src', tournament.poster).addClass('tournament-poster');

    tournamentElement.append(nameElement, descriptionElement, beginTimeElement, endTimeElement, platformElement, scheduleElement, posterElement);
    torneiDiv.append(tournamentElement);
  });
}




  

