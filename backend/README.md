# Postup pre inštaláciu a supstenie backendového serveru
Je potrebné nainštalovať docker, inštalácia je podrobne popísana [tu](https://docs.docker.com/get-docker/)

Po uspešnej inštalacií sa presunieme do 
`backend/docker/depends/container/`

Tam spustíme nasledujúci príkaz pre vytvorenie docker image `docker build --tag worker .`

Po dokonćení sa presunieme naspať do priečinku `backend` tam si pripravíme `.env` file prikazom `cp .env.example .env`, pre potrebné dáta k súboru .env ma prosím kontaktujte

K spusteniu servera nám stačí nainštalovat potrebné moduly pomocou `npm install` a nasledovné  spustenie `node index.js`
