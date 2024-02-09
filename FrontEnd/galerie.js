const urlTravaux = "http://localhost:5678/api/works";

 async function recupererTravaux() {
    let requeteTravaux = await fetch(urlTravaux);

    if(!requeteTravaux.ok) {
        console.log("Un problème est survenu");

    } else {
        console.log("Requete ok")

       return await requeteTravaux.json();   
    }

}

// Fonction 1 : Création des éléments HTML 
 async function recupererTravauxParCategorie(categorie) {
    const travaux = await recupererTravaux();

    const travauxFiltres = travaux.filter(function(travail){
        return categorie.includes(travail.category.id);

    })

    for(let i = 0; i < travauxFiltres.length; i++) {

        let projet = travauxFiltres[i];

        // Création des éléments et du contenu de la galerie
        let recupGallery = document.querySelector(".gallery");
        let figure = document.createElement("figure");
        let imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        let titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projet.title;

        // Association des éléments parents/enfants
        recupGallery.appendChild(figure);
        figure.appendChild(imageProjet);
        figure.appendChild(titreProjet);
        

    }
 }
 // Me permet de réutiliser cette fonction dans d'autres scripts
 window.recupererTravauxParCategorie = recupererTravauxParCategorie;
 recupererTravauxParCategorie([1,2,3]);


 // Fonction 2 qui crée des évènements click sur les différents boutons de filtrage 
async function boutonFiltrage() {
    const boutonTous = document.querySelector(".btn-tous");
    const boutonFiltreObjet = document.querySelector(".btn-objet");
    const boutonFiltreAppartement = document.querySelector(".btn-appartement");
    const boutonFiltreHotel = document.querySelector(".btn-hotel");
    
   boutonTous.addEventListener("click", function() {
    console.log("bouton tous ok");
    document.querySelector(".gallery").innerHTML = "";
        recupererTravauxParCategorie([1,2,3]);
   })

    boutonFiltreObjet.addEventListener("click", function() {
            console.log("Bouton objet ok");
            document.querySelector(".gallery").innerHTML="";
            recupererTravauxParCategorie([1]);
            
    
})
    boutonFiltreAppartement.addEventListener("click", function() {
        console.log("Bouton Appartement ok");
        document.querySelector(".gallery").innerHTML = "";
        recupererTravauxParCategorie([2]);
    })

    boutonFiltreHotel.addEventListener("click", function() {
        console.log("Bouton hotel ok");
        document.querySelector(".gallery").innerHTML = "";
        recupererTravauxParCategorie([3]);
    })
};

boutonFiltrage();

