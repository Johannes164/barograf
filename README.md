# Barograf

Lufttrykk, værbelastning og planlegging. Statisk side — ingen server, ingen bygg.

## Legg den ut på GitHub Pages

1. Lag et nytt repo, for eksempel `barograf`. Det må være **public** for gratis Pages.
2. Last opp disse filene i rota av repoet:
   - `index.html`
   - `sw.js`
   - `manifest.webmanifest`
   - `icon-180.png`
   - `icon-512.png`
3. Gå til **Settings → Pages**. Under *Source*, velg **Deploy from a branch**, branch `main`, mappe `/ (root)`. Lagre.
4. Vent et minutt. Sida ligger da på `https://<brukernavn>.github.io/barograf/`.

Vil du ha den på rot-adressen i stedet — `https://<brukernavn>.github.io/` — kall repoet `<brukernavn>.github.io`.

## Legg den på hjemskjermen

- **iPhone:** åpne adressen i Safari → Del → *Legg til på Hjem-skjerm*.
- **Android:** åpne i Chrome → menyen → *Installer app* / *Legg til på startskjerm*.

Da starter den uten nettleserlinje, med eget ikon. Service workeren gjør at skallet lastes fra
enheten, og at siste hentede værvarsel vises hvis nettet er borte — toppen sier «frakoblet ·
lagret varsel» når det er tilfellet.

## Data og lagring

Logg, vekter, steder og arkiv ligger i nettleserens egen lagring, knyttet til adressen sida
ligger på. Det overlever at appen lukkes, men ikke at nettleserdata slettes, og det følger ikke
med til en annen telefon.

**Sikkerhetskopi** ligger under Innstillinger:

- *Eksporter* laster ned alt som én JSON-fil.
- *Importer* leser en slik fil tilbake.

### Automatisk gjenoppretting på nye enheter

Legg en eksportert fil i repoet som `data/backup.json`. Første gang sida åpnes på en enhet uten
egen logg, leser den den fila og fyller inn historikken. Det gir enveis synk: oppdater fila i
repoet når du vil at nye enheter skal starte med oppdatert historikk.

```
barograf/
├── index.html
├── sw.js
├── manifest.webmanifest
├── icon-180.png
├── icon-512.png
└── data/
    └── backup.json   ← valgfri, lastes bare når enheten er tom
```

### Hvorfor skriver ikke sida rett til repoet?

GitHub Pages serverer bare filer — det kjører ingen kode på serveren. For at nettsida skulle
skrive til repoet måtte den hatt en GitHub-token liggende i kildekoden, og den koden er offentlig.
Alle som fant den kunne skrevet til repoet ditt. Eksport, import og `data/backup.json` gir det
samme resultatet uten den nøkkelen.

Trengs ekte toveis synk mellom flere enheter senere, er en liten Cloudflare Worker med KV-lagring
den enkleste veien — den kan holde en token skjult og koster ingenting på dette volumet.

## Oppdatering

Service workeren cacher skallet. Når du laster opp en ny `index.html`, bump versjonsnavnene
øverst i `sw.js` (`barograf-shell-v1` → `-v2`) så alle enheter henter den nye utgaven.

## Datakilder

- [MET Norway Locationforecast 2.0](https://api.met.no) — NLOD / CC BY 4.0
- [Open-Meteo](https://open-meteo.com) — reserve, og GFS som uavhengig andremening

Sida cacher værdata i 15 minutter per sted, slik MET ber om. Ikke medisinsk rådgivning.
