# LinkedinLogin
Eigen project Rudy, login met Linkedin om de weerstverwachting te zien

Dit is een schoolproject waarbij ik onderzoek hoe men met een 3e party op een website kan inloggen.

Wat wil ik graag maken? Ik wil op een andere manier inloggen dan met een account uit een eigen database. Dus het aanmaken en beheren van useraccounts zit er niet in. Het is wel de bedoeling dat de website alleen bezocht kan worden door geverifieerde gebruikers. Dus bijvoorbeeld: login met Fontys account, LinkedIn of bijvoorbeeld een Google account.
In plaats van een koppeling met een eigen database wil ik een keer gebruik maken van een database elders. Dus na het inloggen kun je informatie bekijken die ik via een API op het Internet bij een andere organisatie aan de bezoeker toon.
DevOps integratie: Omdat ik voor deze optie waarschijnlijk geen database en backend nodig ga hebben kan ik waarschijnlijk met een Apache2 image en de code zelf een nieuwe Docker image maken die alles bevat voor de website. Het uiteindelijke doel is dus om hiervan een microservice te maken. Dit is onderdeel van het onderzoek om webdesign te integreren in de DevOps lessen. Mogelijk als ik de tijd heb gebruik ik ook nog een certificaat voor de website.
Omdat ik het beste leer met kleine stukje, is de ontwikkeling opgedeeld in 2 iteraties: De inlog en later de weerpagina.
