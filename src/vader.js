// Frågar webbläsaren efter användarens position.
// Svarar med latitud och longitud, eller ett fel om användaren nekar.
export function hamtaPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Webbläsaren kan inte ta fram din position."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },

// Om det går fel: användaren nekade, eller positionen hittades inte.
      (fel) => {
        if (fel.code === 1) {
          reject(new Error("Du nekade åtkomst till din position."));
        } else {
          reject(new Error("Kunde inte ta fram din position."));
        }
      },
// Återanvänder en position som är upp till 10 minuter gammal, så att det går snabbare.
      {
        enableHighAccuracy: false,
        maximumAge: 600000,
        timeout: 10000,
      }
    );
  });
}
// Hämtar aktuellt väder från Open-Meteo för en position.
export async function hamtaVader(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;

  const svar = await fetch(url);

  if (!svar.ok) {
    throw new Error("Kunde inte hämta vädret.");
  }

  return svar.json();
}

// Gör om Open-Meteos väderkod till svensk text.
function vaderText(kod) {
  if (kod === 0) return "Klart";
  if (kod <= 2) return "Halvklart";
  if (kod === 3) return "Mulet";
  if (kod <= 48) return "Dimma";
  if (kod <= 57) return "Duggregn";
  if (kod <= 67) return "Regn";
  if (kod <= 77) return "Snö";
  if (kod <= 82) return "Regnskurar";
  if (kod <= 86) return "Snöbyar";
  return "Åska";
}
// Plockar ut temperatur och väderbeskrivning ur svaret från Open-Meteo.
export function tolkaVader(data) {
  return {
    temperatur: Math.round(data.current.temperature_2m),
    beskrivning: vaderText(data.current.weather_code),
  };
}
// Skriver ut temperatur och väder under "Väder" i formulärkortet.
export function visaVader(vader) {
  document.querySelector("#vader").textContent =
    `${vader.temperatur}°C, ${vader.beskrivning}`;
}