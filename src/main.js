import "./style.scss";
import { hamtaPosition, hamtaVader } from "./vader.js";

// Tillfälligt test: position, sedan väder
hamtaPosition()
  .then((position) => hamtaVader(position.lat, position.lon))
  .then((vader) => console.log(vader))
  .catch((fel) => {
    document.querySelector("#plats").textContent = fel.message;
  });
