const knapp = document.querySelector("#generera");

// Sparar knappens innehåll, ikon och text, så att det kan återställas.
const ursprungligtInnehall = knapp.innerHTML;

// Sätter knappen i laddningsläge medan svaret hämtas.
export function startaLaddning() {
  knapp.disabled = true;
  knapp.setAttribute("aria-busy", "true");
  knapp.textContent = "Letar efter lämplig ursäkt...";
}

// Återställer knappen när svaret har kommit, eller om något gick fel.
export function stoppaLaddning() {
  knapp.disabled = false;
  knapp.removeAttribute("aria-busy");
  knapp.innerHTML = ursprungligtInnehall;
}