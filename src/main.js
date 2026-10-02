import "./style.scss";
import { hamtaPosition, hamtaVader, tolkaVader, visaVader, hamtaOrt, visaPlats } from "./vader.js";
import { hamtaNaasSvar } from "./naas.js";
import { startaLaddning, stoppaLaddning } from "./knapp.js";

const svar = document.querySelector("#svar");

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
function visaNaasSvar(data) {
  if (!data || !data.reason) return; // inget svar → rutan förblir dold
  visaSvar(data.reason);
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
    visaNaasSvar(data);
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
    visaVader(tolkaVader(vader));
    visaPlats(ort);
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


