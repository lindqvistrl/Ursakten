import "./style.scss";
import { hamtaPosition, hamtaVader, tolkaVader, visaVader, hamtaOrt, visaPlats } from "./vader.js";

const svar = document.querySelector("#svar");

function visaSvar(text) {
  svar.textContent = text;
  svar.classList.remove("is-hidden");
}

function doljSvar() {
  svar.textContent = "";
  svar.classList.add("is-hidden");
}
function visaNaasSvar(data) {
  if (!data || !data.reason) return; // inget svar → rutan förblir dold
  visaSvar(data.reason);
}

// function visaNaasSvar(data) {
//   console.log(data); // tillfällig, ta bort efteråt
//   if (!data || !data.reason) return;
//   visaSvar(data.reason);
// }
// const data = await hamtaNaasSvar(); 
// visaNaasSvar(data);
// // funktionen från #50, byt till rätt namn

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
  });

  // visaNaasSvar({ reason: "Testursäkt" });  // Sätt raden längst ner i main.js, kolla att rutan visas när sidan laddas, och ta bort den sedan.
  