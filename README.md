# LinkedinLogin
Eigen project Rudy, login met Linkedin om de weerstverwachting te zien

Dit is een schoolproject waarbij ik onderzoek hoe men met een 3e party op een website kan inloggen.

Wat wil ik graag maken? Ik wil op een andere manier inloggen dan met een account uit een eigen database. Dus het aanmaken en beheren van useraccounts zit er niet in. Het is wel de bedoeling dat de website alleen bezocht kan worden door geverifieerde gebruikers. Dus bijvoorbeeld: login met Fontys account, LinkedIn of bijvoorbeeld een Google account.
In plaats van een koppeling met een eigen database wil ik een keer gebruik maken van een database elders. Dus na het inloggen kun je informatie bekijken die ik via een API op het Internet bij een andere organisatie aan de bezoeker toon.
DevOps integratie: Omdat ik voor deze optie waarschijnlijk geen database en backend nodig ga hebben kan ik waarschijnlijk met een NGINX image en de code zelf een nieuwe Docker image maken die alles bevat voor de website. Het uiteindelijke doel is dus om hiervan een microservice te maken. Dit is onderdeel van het onderzoek om webdesign te integreren in de DevOps lessen (Kubernets cluster). Ik kon geen certificaat voor de website maken -> Dit was niet nogelijk, heb nl maar 1 extern IP en HTTPS was nodig voor ArgoCD. Deze wordt getriggerd door GitHub Actions
Omdat ik het beste leer met kleine stukje, is de ontwikkeling opgedeeld in 3 iteraties: De Kubernets omgeving, de inlog en later de weerpagina.

Waarom geen server nodig is?
Ik gebruik alleen client-side JavaScript (auth.js en localStorage).
LinkedIn SDK wordt rechtstreeks geladen vanuit https://platform.linkedin.com/in.js.
Geen backend-logica (geen database, geen API-calls naar je eigen server).

Waarom index.html in public/?
Best practice: Statische bestanden horen in een aparte map (public/ of dist/).
Dockerfile: Kopieert alleen de public/ map naar de nginx webroot.
Geen dubbele index.html nodig: Alleen de versie in public/ wordt gebruikt.

Waarom package.json in de root?
Alleen voor versiebeheer (GitHub Actions gebruikt jq -r '.version' package.json).
Geen npm install nodig (je hebt geen Node.js-dependencies).

ARM Compatibiliteit
De Dockerfile is specifiek geconfigureerd voor ARM64 architectuur met FROM --platform=linux/arm64 node:18-alpine. Dit zou moeten werken op je ARM-computers.

project-root/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── kubernetes/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── Dockerfile
├── package.json       (alleen voor versiebeheer)
├── public/            (statische bestanden)
│   ├── index.html
│   ├── home.html
│   ├── auth.js
│   ├── style.css
│   └── script.js
└── README.md