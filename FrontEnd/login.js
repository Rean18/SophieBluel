document.addEventListener("DOMContentLoaded", () => {




const urlConnexion = "http://localhost:5678/api/users/login";



function seConnecter() {
 

    // Créer un listener qui envoie les informations sur l'API

    const boutonConnexion = document.querySelector(".btn-connexion");

    boutonConnexion.addEventListener("click", (event) => {
        event.preventDefault();

        // Récupérer les informations du formulaire

    const utilisateur = document.querySelector("#email").value;
    const motDePasse = document.querySelector("#password").value;

    // Placer les informations du formulaire dans un objet JSON
    const identifiants = {
        email : utilisateur,
        password : motDePasse
    };

    const identifiantsJson = JSON.stringify(identifiants);  // pour inverser "json.parse()"
   
         fetch(urlConnexion, {   // utiliser then
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            body: identifiantsJson
        })
        
     .then(reponse =>{
        console.log('Réponse du serveur :', reponse);
                if(reponse.status === 401 || reponse.status === 404) {
                    console.log("L'utilisateur n'est pas reconnu")
                    const msgErreur = document.getElementById("msg-erreur");
                    msgErreur.textContent ="L'adresse mail ou le mot de passe ne sont pas corrects"
                } else {
                console.log("Bravo, vous êtes connectés")
                window.localStorage.setItem("Connexion", "validée")
                location.href ="index.html";
                
                return reponse.json();
                
                
                
        }
    })
    
    .then(donnees => {
        console.log(donnees);
        const tokenUser = JSON.stringify(donnees.token)
        window.localStorage.setItem("token",tokenUser);
        const numberUser = JSON.stringify(donnees.userId)
        window.localStorage.setItem("user",numberUser);
    })
    .then(user => {
        console.log(user);
        const numberUser = JSON.stringify(user.userId)
        window.localStorage.setItem("user",numberUser);
    });         
});
        
    };



seConnecter();

});