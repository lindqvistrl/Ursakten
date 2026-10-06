import "./style.scss";
import { hamtaPosition, hamtaVader, tolkaVader, visaVader, hamtaOrt, visaPlats } from "./vader.js";
import { hamtaNaasSvar } from "./naas.js";
import { startaLaddning, stoppaLaddning } from "./knapp.js";

const svar = document.querySelector("#svar");
const input = document.querySelector("#undvika");
const knapp = document.querySelector("#generera");
const FEL = {
  plats: "Vi kunde inte avgöra var du befinner dig, så vi kör utan plats.",
  vader: "Vädret kunde inte bestämmas eftersom vi inte kunde ansluta till Open-Meteo.",
  vaderUtanPlats: "Vädret kunde inte bestämmas eftersom vi inte vet var du befinner dig.",
  ursakt: "Du får komma på en egen ursäkt att säga nej, för API:et verkar ligga nere…",
};
let aktuelltVader = null;
let aktuellOrt = "";

// Visar svarsrutan först och skriver in texten strax efter,
// så att skärmläsare hinner märka rutan och läser upp svaret.
function visaSvar(text) {
  svar.classList.remove("is-hidden");
  setTimeout(() => {
    svar.textContent = text;
  }, 50);
}

function doljSvar() {
  svar.textContent = "";
  svar.classList.add("is-hidden");
}

function visaNaasSvar(data, aktivitet) {
 if (!data || !data.reason) {
  throw new Error("Tomt svar från NaaS");
}

  let text = `Du vill undvika att ${aktivitet}.`;

  if (aktuelltVader && aktuellOrt) {
    text += ` I ${aktuellOrt} är det ${aktuelltVader.temperatur}°C och ${aktuelltVader.beskrivning.toLowerCase()}, så du kan använda den här ursäkten: ${data.reason}`;
  } else {
    text += ` Du kan använda den här ursäkten: ${data.reason}`;
  }

  visaSvar(text);
}

function visaFel(meddelande = "Något gick fel. Försök igen om en stund.") {
  visaSvar(meddelande);
}

function visaSvarMeddelande(meddelande) {
  svar.textContent = meddelande;
  svar.classList.remove("is-hidden");

  // Starta om animationen varje gång
  svar.classList.remove("visas-igen");
  void svar.offsetWidth;
  svar.classList.add("visas-igen");
}

async function hamtaOchVisaUrsakt() {
  const aktivitet = input.value.trim();

  if (aktivitet === "") {
    visaSvarMeddelande("Skriv vad du vill undvika.");
    return;
  }

  input.value = "";
  startaLaddning();
  try {
    const data = await hamtaNaasSvar();
    visaNaasSvar(data, aktivitet);
  } catch (fel) { console.error(fel);
    visaFel(FEL.ursakt);
  } finally {
    stoppaLaddning();
  }
}

// Hämtar position, väder och ort, och skriver ut dem i formulärkortet.
function startaVader() {
  const platsElement = document.querySelector("#plats");
  const vaderElement = document.querySelector("#vader");

  platsElement.classList.add("laddar");
  vaderElement.classList.add("laddar");

  hamtaPosition()
    .then((position) => {
      return Promise.allSettled([
        hamtaVader(position.lat, position.lon),
        hamtaOrt(position.lat, position.lon),
      ]);
    })
    .then(([vaderRes, ortRes]) => {
      // Vädret
      if (vaderRes.status === "fulfilled") {
        try {
          aktuelltVader = tolkaVader(vaderRes.value);
          visaVader(aktuelltVader);
        } catch (fel) {
          console.error(fel);
          vaderElement.textContent = FEL.vader;
        }
      } else {
        console.error(vaderRes.reason);
        vaderElement.textContent = FEL.vader;
      }

      // Platsen
      if (ortRes.status === "fulfilled") {
        aktuellOrt = ortRes.value;
        visaPlats(aktuellOrt);
      } else {
        console.error(ortRes.reason);
        platsElement.textContent = FEL.plats;
      }
    })
    .catch((fel) => {
      // Hit kommer vi bara om själva positionen misslyckas
      console.error(fel);
      platsElement.textContent = `${fel.message} ${FEL.plats}`;
      vaderElement.textContent = FEL.vaderUtanPlats;
    })
    .finally(() => {
      platsElement.classList.remove("laddar");
      vaderElement.classList.remove("laddar");
    });
}
// Allt som ska hända när sidan laddas.
function init() {
  startaVader();
  knapp.addEventListener("click", hamtaOchVisaUrsakt);

  // Enter i fältet gör samma sak som att klicka på knappen.
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      hamtaOchVisaUrsakt();
    }
  });
}

init();