# Ohjelmointinayte Talgraf
Tämä on ohjelmointinäyte Talgrafille.

# Json-server
1. Asensin npm install json-server
2. Muokkasin .json tiedoston nimen d3_fronttikoedata.json
3. Pystytin paikallisen json-serverin porttiin 3005 komennolla:
```
npx json-server d3_fronttikoedata.json -p 3005
```

nyt json datan saa osoitteesta:

```
http://localhost:3005/companies
```

4. Jälkeenpäin tajusin, että en voi käyttää GitHubissa json-serveriä, joten tulen muokkaamaan datan koodin sisään myöhemmin.

5. data on hardkoodattu ohjelmaan

# Bootstrap
Päätin käyttää bootstrappia helpon uin vuoksi.<br>
Bootstrapin modal on nätti tapa näyttää D3.js kirjastolla luotua SVG:tä, ja modaliin tehdyn dropdown menu oli helppo toteuttaa myös bootstrapin avulla.<br>

# JSON
Aluksi ajoin käyttää json-serveriä, mutta tajusin myöhemmin, että tämä ohjelmointinäyte tulee näkymään GitHubissa, joten jos olisin halunnut GitHubissakin käyttää json-serveriä, minun olisi pitänyt käyttää dockeria, joten päätin sisällyttää datan ohjelmaan.

# D3.js
En ollut kuullutkaan kyseisestä kirjastosta, mutta materiaalia ja projekteja kyseistä kirjastoa käyttäen löytyi hyvin.<br>
Kirjasto on tehty hyvin, ja antaa ohjelmoijalle vapaat kädet tekemiseen.

# GitHub

Unohdin työntää projektia GitHubiin välillä.


# Opiskelu- ja ohjelmointimateriaalit:
 - https://www.youtube.com/watch?v=TOJ9yjvlapY&ab_channel=Academind (yleinen käsitys)
 - https://d3js.org/getting-started#d3-in-vanilla-html (käyttöönotto)
 - https://d3js.org/ ylipäätänsä koko nettisivu: (niche)
 - https://getbootstrap.com/docs/5.0/components/modal/ (bootstrap modal juttuja)
 - https://getbootstrap.com/docs/5.3/components/dropdowns/ (bootstrap dropdown menu)
 - https://codepen.io/kendsnyder/pen/vPmQbY (projekti kohtaista)
 - https://observablehq.com/@d3/bubble-chart/2?intent=fork (projekti kohtaista)
 - https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b (d3js svg responsiveness)
 - https://icons.getbootstrap.com/ (bootstrap icons)


# Ajankäyttö:
 - Torstai 18.1.24:
 D3 kirjaston opiskelu: 3,5h ja kirjastolla "pelleily" ja "testailu": ~2h.
 - Lauantai 20.1.24:
 Projektin tekemistä: 4h ja opiskelua ~1h
 - Sunnuntai 21.1.24: 2h funktionaalisen toiminnan hiomista, 1,5h responsiivisuuden tekemistä ja ~2h ui
