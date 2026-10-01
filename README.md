# En ursäkt

En webbapp som hjälper dig att slippa göra saker.

## Vad den gör

Skriv in vad du vill undvika. Appen hämtar en ursäkt från NaaS API och väderdata från SMHI baserat på din plats, och kombinerar dem till ett personligt svar på varför du inte borde göra det.

## Byggd med

- HTML, CSS (Sass), JavaScript (Vanilla)
- Vite som byggverktyg
- API NaaS
- API Open Meteo
- API BigDataCloud 


## Kom igång

Du behöver node.js
npm install
npm run dev

Öppna adressen som visas i terminalen.

<img width="930" height="1077" alt="Wireframe av appen" src="https://github.com/user-attachments/assets/3ee2e34f-e0da-411e-8ad8-3e65bb54ac46" />

## Personuppgifter

Appen frågar efter din position för att visa väder och ort. Positionen skickas till två externa tjänster:

- **Open-Meteo**, för att hämta vädret.
- **BigDataCloud**, för att ta fram ortnamnet. BigDataCloud ser också din IP-adress.

Vi sparar ingenting. Nekar du positionen fungerar appen ändå, men utan väder och ort.

