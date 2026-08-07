# Barograf

Lufttrykk, værbelastning og planlegging. Statisk side - ingen server, ingen bygg.

## Legg den på hjemskjermen

- **iPhone:** åpne adressen i Safari → Del → *Legg til på Hjem-skjerm*.
- **Android:** åpne i Chrome → menyen → *Installer app* / *Legg til på startskjerm*.

Da starter den uten nettleserlinje, med eget ikon. Service workeren gjør at skallet lastes fra
enheten, og at siste hentede værvarsel vises hvis nettet er borte - toppen sier "frakoblet ·
lagret varsel" når det er tilfellet.

## Data og lagring

Logg, vekter, steder og arkiv ligger i nettleserens egen lagring, knyttet til adressen sida
ligger på. Det overlever at appen lukkes, men ikke at nettleserdata slettes, og det følger ikke
med til en annen telefon.

**Sikkerhetskopi** ligger under Innstillinger:

- *Eksporter* laster ned alt som én JSON-fil.
- *Importer* leser en slik fil tilbake.

## Datakilder

- [MET Norway Locationforecast 2.0](https://api.met.no) - NLOD / CC BY 4.0
- [Open-Meteo](https://open-meteo.com) - reserve, og GFS som uavhengig andremening

Sida cacher værdata i 15 minutter per sted, slik MET ber om. Ikke medisinsk rådgivning.
