import './style.scss';

import './style.scss';
import { hamtaPosition } from './vader.js';

// Tillfälligt test av positionen
hamtaPosition()
  .then((position) => console.log(position))
    .catch((fel) => {
    document.querySelector("#plats").textContent = fel.message;
  });

