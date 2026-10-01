import './style.scss';

import { hamtaPosition } from './vader.js';

// Tillfälligt test av positionen
hamtaPosition()
  .then((position) => console.log(position))
  .catch((fel) => {
    document.querySelector("#plats").textContent = fel.message;
  });





const input = document.querySelector("#undvika");
const knapp = document.querySelector("#generera");


knapp.addEventListener("click", function () {

  const inputText = input.value;

  if (input.value.trim() === "") {
    console.warn("Varning: inputfältet är tomt!");
  } else {
    console.log("Användaren vill undvika:", inputText);
  }
  input.value = "";
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        knapp.click();
    }
});