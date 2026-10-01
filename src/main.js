import "./style.scss";
import { hamtaPosition, hamtaVader } from "./vader.js";

const svar = document.querySelector("#svar");

function visaSvar(text) {
  svar.textContent = text;
  svar.classList.remove("is-hidden");
}

function doljSvar() {
  svar.textContent = "";
  svar.classList.add("is-hidden");
}

// Tillfälligt test: position, sedan väder
hamtaPosition()
  .then((position) => hamtaVader(position.lat, position.lon))
  .then((vader) => console.log(vader))
  .catch((fel) => {
    document.querySelector("#plats").textContent = fel.message;
  });