document.addEventListener("DOMContentLoaded", () => {




const urlConnexion = "http://localhost:5678/api/users/login";



function seConnecter() {
 

    // Créer un listener qui envoie les informations sur l'API

    const boutonConnexion = document.querySelector(".btn-connexion");

    boutonConnexion.addEventListener("click",  function (event) {
        event.preventDefault();

        // Récupérer les informations du formulaire

    const utilisateur = document.querySelector("#email").value;
    const motDePasse = document.querySelector("#password").value;

    // Placer les informations du formulaire dans un objet JSON
    const identifiants = {
        email : utilisateur,
        password : motDePasse
    };

    const chargeUtile = JSON.stringify(identifiants);  // pour inverser "json.parse()"
   
         fetch(urlConnexion, {   // utiliser then
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            body: chargeUtile
        })
        
     .then(reponse =>{
                if(!reponse.ok) {
                    console.log("erreur de connexion")
                }
                return reponse.json();
                }) 
    .then(donnees => {
        console.log(donnees)
        location.href ="index.html"; 
    });         
});
        
    };


// rediriger utilisateur : utiliser location.href


seConnecter();

});