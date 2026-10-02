import "./style.scss";
import { hamtaPosition, hamtaVader, tolkaVader, visaVader, hamtaOrt, visaPlats } from "./vader.js";
import { hamtaNaasSvar } from "./naas.js";
import { startaLaddning, stoppaLaddning } from "./knapp.js";

const svar = document.querySelector("#svar");
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
  const input = document.getElementById("undvika").value.trim();

  if (input === "") {
    return;
  }
  
  startaLaddning();
  try {
    const data = await hamtaNaasSvar();
visaNaasSvar(data, input);
  } catch (fel) {
    visaFel();
  } finally {
    stoppaLaddning();
  }
  
}
document
  .querySelector("#generera")
  .addEventListener("click", hamtaOchVisaUrsakt);

//try {
//  const data = await hamtaNaasSvar(); // funktionen från #50, använd rätt namn
// visaNaasSvar(data);
//} catch (fel) {
// visaFel();
//}
// if (!response.ok) {
//  throw new Error("NaaS svarade inte");
//}
//try mm tillhör kort #50, ta bort när #50 är klar

// function visaNaasSvar(data) {
//   console.log(data); // tillfällig, ta bort efteråt
//   if (!data || !data.reason) return;
//   visaSvar(data.reason);
// }
// const data = await hamtaNaasSvar(); 
// visaNaasSvar(data);
// // funktionen från #50, byt till rätt namn

// Visar laddningssymbol medan plats och väder hämtas
document.querySelector("#plats").classList.add("laddar");
document.querySelector("#vader").classList.add("laddar");

// Hämtar position, väder och ort, och skriver ut dem i formulärkortet.
hamtaPosition()
  .then((position) => {
    return Promise.all([
      hamtaVader(position.lat, position.lon),
      hamtaOrt(position.lat, position.lon)
    ]);
  })
  .then(([vader, ort]) => {
  aktuelltVader = tolkaVader(vader);
  aktuellOrt = ort;

  visaVader(aktuelltVader);
  visaPlats(aktuellOrt);
})
  .catch((fel) => {
    document.querySelector("#plats").textContent = fel.message;
  })
  .finally(() => {
    document.querySelector("#plats").classList.remove("laddar");
    document.querySelector("#vader").classList.remove("laddar");
  });


const input = document.querySelector("#undvika");
const knapp = document.querySelector("#generera");

knapp.addEventListener("click", function () {

  if (input.value.trim() === "") {
    alert("Vänligen skriv in något du vill undvika.");
  }
  input.value = "";
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    knapp.click();
  }
});
// visaNaasSvar({ reason: "Testursäkt" });  // Sätt raden längst ner i main.js, kolla att rutan visas när sidan laddas, och ta bort den sedan.


