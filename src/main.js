import "./style.scss";
import { hamtaPosition, hamtaVader, tolkaVader, visaVader, hamtaOrt, visaPlats } from "./vader.js";
import { hamtaNaasSvar } from "./naas.js";
import { startaLaddning, stoppaLaddning } from "./knapp.js";

const svar = document.querySelector("#svar");
const input = document.querySelector("#undvika");
const knapp = document.querySelector("#generera");
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
  if (!data || !data.reason) return;

  let text = `Du vill undvika ${aktivitet}.`;

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

async function hamtaOchVisaUrsakt() {
  const aktivitet = input.value.trim();

  if (aktivitet === "") {
    alert("Vänligen skriv in något du vill undvika.");
    return;
  }

  input.value = "";
  startaLaddning();
  try {
    const data = await hamtaNaasSvar();
    visaNaasSvar(data, aktivitet);
  } catch (fel) {
    visaFel();
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
      return Promise.all([
        hamtaVader(position.lat, position.lon),
        hamtaOrt(position.lat, position.lon),
      ]);
    })
    .then(([vader, ort]) => {
      aktuelltVader = tolkaVader(vader);
      aktuellOrt = ort;
      visaVader(aktuelltVader);
      visaPlats(aktuellOrt);
    })
    .catch((fel) => {
      platsElement.textContent = fel.message;
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