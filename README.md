# Web-advanced
 Projectbeschrijving en functionaliteiten

Deze webapp toont een interactieve Pokédex waarmee je Pokémon kunt bekijken, filteren, sorteren en favorieten kunt aanduiden. De gegevens worden live opgehaald via de PokéAPI, en alles werkt in de browser zonder extra installatie.

Gebruikte API

PokéAPI – https://pokeapi.co
De site maakt gebruik van deze publieke API om informatie op te halen over de eerste 50 Pokémon, inclusief naam, afbeelding, type(s), gewicht, hoogte en abilities.



Technische functionaliteiten


-HTML structuur ->index.html

-API-koppeling met JavaScript ->fetchPokemon() in main.js (vanaf lijn 9)

-Dynamisch tonen van data ->displayPokemon() lijn 34

-Zoekfunctie ->Inputveld + updateDisplayedPokemon() lijn 63

-Filter op type->type-filter dropdown + populateTypeFilter()  lijn 107

-Sorteeropties-> (ID, naam, hoogte, gewicht)	sortPokemon() lijn 115

-Favorieten met localStorage->toggleFavorite() lijn 86 + gebruik in andere functies

-Responsief ontwerp->Flexbox + media queries in style.css

Installatiehandleiding

1.Clone deze repository of download de bestanden.

2.Open de map waarin de bestanden staan in VS Code
Zorg dat de projectstructuur er als volgt uitziet:

    index.html – de hoofdpagina van de applicatie
    src/
    styles.css – bevat de opmaak van de applicatie
    app.js – bevat de logica van de applicatie


3.Open index.html in een moderne webbrowser.

4.De app draait volledig lokaal – geen installatie vereist 

desclaimer! Zorg voor een stabiele internetverbinding, zodat de app de data van de API correct kan laden.


![alt text](<pokemon home page.png>)



![alt text](<pokemon fav.png>)



![alt text](<pokemon type_fire.png>)


![alt text](<pokemon sort Z-A.png>)


PokéAPI documentatie – voor het ophalen van data

MDN Web Docs – naslagwerk voor HTML, CSS en JavaScript

github

stackoverflow

cursusmateriaal

https://chatgpt.com/share/682f9cbe-f1cc-8011-b96f-5ab3d31619fa