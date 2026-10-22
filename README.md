# Ursäkten

Grupparbete i kursen JavaScript, HTML och CSS på Medieinstitutet, hösten 2026.

En webbapp som hjälper dig att slippa göra saker.

## Vad den gör

Skriv in vad du vill undvika. Appen hämtar en ursäkt från NaaS API och väderdata från Open-Meteo baserat på din plats, och kombinerar dem till ett personligt svar på varför du inte borde göra det.

## Skärmbilder

Sidan anpassar sig efter skärmens bredd. På de smalaste skärmarna ligger de tre stegen under varandra. Från 390 px ligger de bredvid varandra.

### Desktop, 1080 px

<img src="readme-bilder/skarm-desktop.png" width="700" alt="Ursäkten på en desktopskärm">

### Surfplatta och mobil

| Surfplatta, 820 px | Mobil, 412 px | Liten mobil, 360 px |
| --- | --- | --- |
| <img src="readme-bilder/skarm-tablet.png" width="300" alt="Ursäkten på en surfplatta"> | <img src="readme-bilder/skarm-412.png" width="200" alt="Ursäkten på en mobil som är 412 px bred"> | <img src="readme-bilder/skarm-360.png" width="200" alt="Ursäkten på en mobil som är 360 px bred"> |

## Byggd med

- HTML, CSS (Sass), JavaScript (Vanilla)
- Vite som byggverktyg
- API NaaS
- API Open Meteo
- API BigDataCloud

## Kom igång

Du behöver Node.js. Kör sedan det här i projektmappen:

```
npm install
npm run dev
```

Öppna adressen som visas i terminalen.

Vill du se den färdiga versionen, så som den byggs för publicering:

```
npm run build
npm run preview
```

## Wireframe

<img src="readme-bilder/wireframe.png" width="700" alt="Wireframe av appen">

## Lighthouse

Testat med Lighthouse 13.4.1 i Chrome mot den byggda versionen.

### Mobil

<img src="readme-bilder/lighthouse-mobil.png" width="700" alt="Lighthouse-rapport för mobil: prestanda 99, tillgänglighet 100, bästa metoder 100, SEO 83">

### Desktop

<img src="readme-bilder/lighthouse-desktop.png" width="700" alt="Lighthouse-rapport för desktop: prestanda 100, tillgänglighet 100, bästa metoder 100, SEO 83">

## Validering

### HTML

Inga fel eller varningar i [Nu Html Checker](https://validator.w3.org/nu/).

<img src="readme-bilder/validering-html.png" width="700" alt="Resultat från Nu Html Checker utan fel eller varningar">

### CSS

Inga fel och sex varningar i [W3C:s CSS-validerare](https://jigsaw.w3.org/css-validator/).

<img src="readme-bilder/validering-css.png" width="700" alt="Resultat från W3C:s CSS-validerare utan fel">

## Personuppgifter

Appen frågar efter din position för att visa väder och ort. Positionen skickas till två externa tjänster:

- **Open-Meteo**, för att hämta vädret.
- **BigDataCloud**, för att ta fram ortnamnet. BigDataCloud ser också din IP-adress.

Vi sparar ingenting. Nekar du positionen fungerar appen ändå, men utan väder och ort.

## Deltagare
- [Elina Aspman](https://github.com/ElinaAspman)
  
- [Dennis Kvarnström](https://github.com/DEKV1)
  
- [Yanica Svensson](https://github.com/sweets86)

- [Richard Lindqvist](https://github.com/lindqvistrl):
- ## Min del 

Jag skrev 47 av projektets 92 uppgifter i backloggen och byggde stora delar av HTML-strukturen.

**Väderfunktionen**
- [Hämtar användarens position](https://github.com/lindqvistrl/Ursakten/commit/9c097fa)
- [Anropar Open-Meteo med koordinaterna](https://github.com/lindqvistrl/Ursakten/commit/7c76f30)
- [Plockar ut temperatur och väder ur svaret](https://github.com/lindqvistrl/Ursakten/commit/ee5b1b3)
- [Visar ortnamn i formulärkortet](https://github.com/lindqvistrl/Ursakten/commit/e69ad61)

**HTML** (som medförfattare)
- [Grund i index.html med svenska och titel](https://github.com/lindqvistrl/Ursakten/commit/9585378)
- [Header med logga och sidnamn](https://github.com/lindqvistrl/Ursakten/commit/b409a94)

**Tillgänglighet**
- [Klassen visuellt-dold](https://github.com/lindqvistrl/Ursakten/commit/203b6af)
- [Svarsrutan läses upp av skärmläsare](https://github.com/lindqvistrl/Ursakten/commit/317a611)
- [Focus-state på knappen](https://github.com/lindqvistrl/Ursakten/commit/30eb5eb)

**Prestanda och publicering**
- [Krympte bakgrundsbilden från 3 MB till 548 kB](https://github.com/lindqvistrl/Ursakten/commit/35905fb)
- [Publicering till GitHub Pages via GitHub Actions](https://github.com/lindqvistrl/Ursakten/commit/8a59df4)
  



