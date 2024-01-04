
document.addEventListener('DOMContentLoaded', () => {

/* Afficher la boite modale sur l'écran de l'utilisateur */

    const btnModale = document.querySelector(".js-modale");
let modale = null

const ouvrirModale = function (e) {
    e.preventDefault()
    const target = document.querySelector('.modale-background')
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


/* Afficher les projets avec une requête fetch */


    function GererModale () {
        fetch(urlTravaux)
        .then(response => response.json())
        .then(travaux => {
            for(let i = 0; i < travaux.length; i++) {

                let projetMini = travaux[i];
                console.log(projetMini.img); 

                const divGallerieModale = document.querySelector(".modale-gallerie");
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
                const iconeCorbeille = document.createElement("i");
                iconeCorbeille.className ="fa-solid fa-trash";
                iconeCorbeille.style.color = "white";

                divGallerieModale.appendChild(divPhotoModale);
                divPhotoModale.appendChild(photoModale);
                divPhotoModale.appendChild(divIconeCorbeille);
                divIconeCorbeille.appendChild(boutonSupprimer);
                boutonSupprimer.appendChild(iconeCorbeille);

/* Supprimer des Projets */
    
                boutonSupprimer.addEventListener("click", () => {
                    console.log("http://localhost:5678/api/works/"+ boutonSupprimer.id);
                    fetch("http://localhost:5678/api/works/" + boutonSupprimer.id, {
                        method : "DELETE",
                        headers : {
                            "Accept": "*/*",
                            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNDM2NjgyMSwiZXhwIjoxNzA0NDUzMjIxfQ.NUuGshlt_mDgvq3xuYtbH8RVigdKKOCCn-EDHZLl29o'
                        }
                    })
                    .then(reponse => {
                        if(!reponse.ok) {
                            console.log("Echec de la suppression")
                        }
                        const projetASupprimer = boutonSupprimer.closest(".photo-modale");
                    if (projetASupprimer) {
                        console.log("Projet supprimé")
                        projetASupprimer.remove();
                }

                        
                    })
        
    });



            }
        })
            
    }


GererModale();




})
