
document.addEventListener('DOMContentLoaded', () => {

/* Afficher la boite modale sur l'écran de l'utilisateur */

    const btnModale = document.querySelector(".js-modale");
let modale = null

const ouvrirModale = function (e) {
    e.preventDefault()
    const target = document.querySelector('.modale-background.un')
    target.style.display = "block"
    modale = target
    modale.addEventListener("click", fermerModale)
    modale.querySelector(".fermer-modale").addEventListener("click", fermerModale)
    modale.querySelector(".stop-propagation").addEventListener("click", stopPropagation)

}

const fermerModale = function (e) {
    e.preventDefault()
    modale.style.display = "none"
    modale.removeEventListener("click", fermerModale)
    modale.querySelector(".fermer-modale").removeEventListener("click", fermerModale)
    modale.querySelector(".stop-propagation").removeEventListener("click", stopPropagation)
    modale = null

}

const stopPropagation = function (e) {
    e.stopPropagation()
}

btnModale.addEventListener('click', ouvrirModale)
btnRevenirModaleUn = document.getElementById("btn-revenir-modale1");
btnRevenirModaleUn.addEventListener("click", ouvrirModale)

/* Afficher les projets avec une requête fetch */
 const gestionAffichageImage = (travaux) => {
           for(let i = 0; i < travaux.length; i++) {

                let projetMini = travaux[i];
                console.log(projetMini.img); 

                const divGalerieModale = document.querySelector(".modale-galerie");
                const divPhotoModale = document.createElement("div")
                divPhotoModale.className = "modale-photo";
                divPhotoModale.id = projetMini.id;
                const photoModale = document.createElement("img");
                photoModale.src = projetMini.imageUrl;
                const divIconeCorbeille = document.createElement("div");
                divIconeCorbeille.className = "div-icone-corbeille";
                const boutonSupprimer = document.createElement("button");
                boutonSupprimer.className = "btn-supprimer-projet";
                boutonSupprimer.id = projetMini.id;
                boutonSupprimer.addEventListener("click", supprimerProjet);
                const iconeCorbeille = document.createElement("i");
                iconeCorbeille.className ="fa-solid fa-trash";
                iconeCorbeille.style.color = "white";

                divGalerieModale.appendChild(divPhotoModale);
                divPhotoModale.appendChild(photoModale);
                divPhotoModale.appendChild(divIconeCorbeille);
                divIconeCorbeille.appendChild(boutonSupprimer);
                boutonSupprimer.appendChild(iconeCorbeille);
           }
            }
            window.gestionAffichageImage = gestionAffichageImage;


            /* Supprimer les projets*/
            function supprimerProjet() {

                if (confirm("Êtes-vous surs de vouloir supprimer votre projet ?")) {
                   
                
                console.log("http://localhost:5678/api/works/" + this.id);
                console.log(window.localStorage.getItem("token"))

                if (window.localStorage.getItem("token")) {
                    console.log("Le token est présent")
                    // boutonSupprimer = document.querySelector(".btn-supprimer-projet");
                    console.log("projet à supprimer : " + this.id)
                    fetch("http://localhost:5678/api/works/" + this.id, {
                        method : "DELETE",
                        headers : {
                            'Accept': "*/*",
                            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("token"))
                        }
                    })
                    .then(reponse => {
                        if(!reponse.ok) {
                            console.log("Echec de la suppression")
                        } else {
                        
                        const projetASupprimer = this.closest(".modale-photo");
                        console.log("Projet supprimé");
                            projetASupprimer.remove();
                            document.querySelector(".gallery").innerHTML="";
                            console.log("galerie vidée")
                            recupererTravauxParCategorie([1,2,3]);
                            console.log("galerie affichée de nouveau")
                            const messageForm = document.querySelector('.msg-form');
                            setTimeout(function() {
                                messageForm.textContent="Votre projet a bien été supprimé !"
                                messageForm.style.color = "red";
                                messageForm.style.display ="block";
            
                            }, 400)
                            setTimeout(function() {
                                messageForm.style.display="none";
                            }, 4000);
    
                        }
                    }) 
                }
                               
                
            } else {
                console.log("Le projet n'est pas supprimé")
            }
            
        }
        window.supprimerProjet = supprimerProjet;


        function gererModale () {
        fetch(urlTravaux)
        .then(response => response.json())
        .then(travaux => {
        //     gestionAffichageImage(travaux);
        // fetch("http://localhost:5678/api/works")
        // .then(response => response.json())
        // .then(listeImage => {
            document.querySelector(".modale-galerie").textContent ="";
            gestionAffichageImage(travaux)
// })

        })
            
    }
    window.gererModale = gererModale;


gererModale();




})
