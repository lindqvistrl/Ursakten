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
      () => {
        reject(new Error("Du nekade åtkomst till din position."));
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