const urlAPI = "http://localhost:5678/api/works";

async function recupererTravaux() {
    let requete = await fetch(urlAPI);

    if(!requete.ok) {
        console.log("Un problème est survenu");

    } else {
        let travaux = await requete.json();
        console.log(travaux);

        for(let i = 0; i < travaux.length; i++) {

            let projet = travaux[i];

            // Création des éléments et du contenu de la gallerie
            let recupGallery = document.querySelector(".gallery");
            let figure = document.createElement("figure");
            let imageProjet = document.createElement("img");
            imageProjet.src = travaux.imageUrl;
            let titreProjet = document.createElement("figcaption");
            titreProjet.innerText = travaux.title;

            // Association des éléments parents/enfants
            recupGallery.appendChild(figure);
            figure.appendChild(imageProjet);
            figure.appendChild(titreProjet);
        
        }
    }

}
recupererTravaux();
