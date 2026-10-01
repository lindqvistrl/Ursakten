import './style.scss';
const svar = document.querySelector("#svar");

function visaSvar(text) {
  svar.textContent = text;
  svar.classList.remove("is-hidden");
}

function doljSvar() {
  svar.textContent = "";
  svar.classList.add("is-hidden");
}
