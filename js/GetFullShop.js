$(document).ready(function () {
  $.ajax({
      url: "https://fortniteapi.io/v2/shop?lang=it",
      headers: {
          Authorization: "57dbef59-1a4bef55-09fe9f0c-880f4d49",
      },
      method: "GET",
      dataType: "json",
      success: function (data) {
          // Funzione chiamata quando la richiesta ha successo
          var shopDiv = document.getElementById("shop");

          // Loop attraverso gli oggetti nello shop e crea il codice HTML
          var itemsHTML = "";
          data.shop.forEach(function (item) {
              itemsHTML += '<div class="item">';
              itemsHTML += '<a href="itemDetails.html?id=' + item.offerId + '">';
              itemsHTML += '<img class="item-image" src="' + item.displayAssets[0].full_background + '" alt="' + item.displayName + '">';
              itemsHTML += "</a>";
              itemsHTML += "</div>";
          });

          shopDiv.innerHTML = itemsHTML;
      },
      error: function (error) {
          console.log(error);
      },
  });
});

//Data
fetch("https://worldtimeapi.org/api/ip")
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      var currentDate = new Date(data.datetime);

      var day = currentDate.getDate();

      // Ottenere il mese scritto
      var monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
      var monthIndex = currentDate.getMonth();
      var month = monthNames[monthIndex];

      var year = currentDate.getFullYear();

      // Formattare la data come stringa
      var formattedDate = day + " " + month + " " + year;

      // Inserire la data nel div con la classe "data"
      var dataDiv = document.querySelector(".data");
      dataDiv.innerHTML = "<p>" + formattedDate + "</p>";
  })
  .catch(function (error) {
      console.log("Si è verificato un errore:", error);
  });

//Timer
function getTimeRemaining() {
  var now = new Date(); // Data corrente
  var targetTime = new Date();
  targetTime.setHours(2, 0, 0, 0); // Imposta l'ora desiderata (2:00 del mattino)

  // Se l'ora di riferimento è già passata, aggiungi un giorno alla data di riferimento
  if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
  }

  var timeDiff = targetTime.getTime() - now.getTime(); // Differenza di tempo in millisecondi

  // Calcola le ore, i minuti e i secondi rimanenti
  var hours = Math.floor(timeDiff / (1000 * 60 * 60));
  var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
  };
}

// Funzione per aggiornare il timer nel documento HTML
function updateTimer() {
  var timerElement = document.querySelector(".timer");
  var time = getTimeRemaining();

  timerElement.innerHTML = '<i class="material-icons">timer</i><div class="timer-title"><span>Aggiornamento negozio</span><div class="timer-value">' + time.hours + "h " + time.minutes + "m " + time.seconds + "s</div></div>";

  // Aggiorna il timer ogni secondo
  setTimeout(updateTimer, 1000);
}

// Avvia il timer
updateTimer();
