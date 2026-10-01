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