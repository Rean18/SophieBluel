document.addEventListener("DOMContentLoaded", function() {
    if(window.localStorage.getItem("Connexion") === "validée") {
        const msgConnexionReussie = document.querySelector(".message-connexion");
        msgConnexionReussie.textContent = "Vous êtes connectés !";
        setTimeout(function() {
            msgConnexionReussie.style.display = "block";
        }, 300);
        
        setTimeout(function() {
            msgConnexionReussie.style.display = "none";
            window.localStorage.removeItem("Connexion");
        }, 6000);
    }
    });



