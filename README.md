# Projektöversikt: Dashboard med API-integrationer

Detta projekt består av en personlig startsida med flera funktionella komponenter som samverkar för att visa information om väder, kryptomarknad, klocka, bakgrundsbild, snabbanteckningar och snabblänkar. Huvudfunktionerna använder sig av externa API:er samt `localStorage` för att skapa en responsiv och användarvänlig upplevelse.

---

## Styrkor i implementationen

### 1. **Modulär struktur**
Varje större funktion är placerad i en egen modul/fil (t.ex. `fetchWeather.js`, `fetchMarket.js`, `saveNotes.js`), vilket gör det lätt att läsa, förstå och vidareutveckla projektet. Att dela upp funktionalitet på detta sätt är viktigt inom modern webbutveckling.

### 2. **Klar separation mellan logik och DOM-hantering**
Koden för att hämta data (t.ex. väder, kryptopriser, bakgrundsbilder) är separerad från den kod som uppdaterar DOM:en. Detta förbättrar både läsbarhet och testbarhet.

### 3. **Felhantering och fallback-lösningar**
Väderkomponenten använder geolocation men faller tillbaka till Stockholm om platsinformation inte kan hämtas. Likaså har kryptofunktioner och bakgrundsbilder sin felhantering via `try/catch` eller `catch()` i `.then()`-kedjor. Det gör att sidan fortfarande fungerar även om ett API misslyckas.

### 4. **Säker DOM-manipulation**
Användning av `replaceChildren() och createElement()` i stället för `innerHTML` minimerar XSS-risker och säker DOM-hantering.

### 5. **Responsivitet och användarinteraktion**
Användaren kan söka efter väder genom att skriva en stad och trycka på knappen eller `Enter`. Snabblänkar kan läggas till och tas bort med direkt återkoppling i gränssnittet, vilket ger bra UX.

---

## Brister och förbättringsområden

### 1. **Begränsad återkoppling till användaren**
Felmeddelanden och status (t.ex. "Hämtar väder..." eller "Ogiltig stad") skrivs enbart till konsolen. Dessa kan eventuellt visas i gränssnittet för att användaren inte ska bli förvirrad om något går fel.

### 2. **API-nycklar hårdkodas i importen**
Trots att nycklarna ligger i `env.js` exponeras de fortfarande i frontend-kod som körs i webbläsaren. Det vore säkrare att använda en proxy eller backend för att dölja nycklar vid externa anrop.

### 3. **Begränsad validering av användarinput**
När användaren lägger till en snabblänk görs ingen egentlig validering av URL:en mer än trim och visningsnamn. Här finns utrymme för förbättring genom att kontrollera t.ex. giltig domän eller att länken faktiskt fungerar.

### 4. **Få CSS filer** 
Nästan all styling utförs i en CSS fil. Eventuellt skulle man kunna separera koden utefter komponenten de stylar likt ett React upplägg. Detta skulle innebära att färre kommentarer behövs samtidigt som koden blir lättare att hitta. 

---

## Summering

Koden är funktionell, läsbar och till stor del säker. Några brister finns i återkoppling till användaren och säker hantering av API-nycklar, men dessa påverkar inte kärnfunktionerna i större grad. 
---

