// Wacht tot de LinkedIn SDK geladen is
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", onLinkedInAuth);
}

// Functie die wordt aangeroepen na authenticatie
function onLinkedInAuth() {
    IN.API.Profile("me").fields("id,firstName,lastName,emailAddress").result(function(profile) {
        // Sla de gebruikersinformatie op in localStorage
        localStorage.setItem('linkedinProfile', JSON.stringify(profile.values[0]));

        // Redirect naar de home pagina
        window.location.href = 'home.html';
    }).error(function(error) {
        console.error("Error fetching profile:", error);
    });
}

// Functie om in te loggen
document.getElementById('linkedin-login').addEventListener('click', function() {
    IN.User.authorize(function() {
        // Deze functie wordt aangeroepen na succesvolle autorisatie
    });
});