
/* Gérer la modale pour l'ajout de nouveaux projets */
document.addEventListener('DOMContentLoaded', () => {

    btnAjouterProjet = document.getElementById("btn-ajout-photo");
    let modaleDeux =null
    const ouvrirModaleDeux = function (e) {
        e.preventDefault()
        document.querySelector('.modale-background.un').style.display="none";
        const target = document.querySelector('.modale-background.deux');
        target.style.display = "block";
        modaleDeux = target;
        modaleDeux.addEventListener("click", fermerModale);
        modaleDeux.querySelector(".fermer-modale").addEventListener("click", fermerModale);
        modaleDeux.querySelector(".stop-propagation").addEventListener("click", stopPropagation);
    }
    
    const fermerModale = function (e) {
        e.preventDefault();
        modaleDeux.style.display = "none";
        modaleDeux.removeEventListener("click", fermerModale);
        modaleDeux.querySelector(".fermer-modale").removeEventListener("click", fermerModale);
        modaleDeux.querySelector(".stop-propagation").removeEventListener("click", stopPropagation);
        modaleDeux = null;
    }
    
    const stopPropagation = function (e) {
        e.stopPropagation();
    }
    
    btnAjouterProjet.addEventListener("click", ouvrirModaleDeux);
    btnRevenirModaleUn.addEventListener("click", fermerModale);
    
    /* Ajouter un nouveau projet */
const formAjout = document.querySelector(".form-ajout-projet");
formAjout.addEventListener("submit", ajouterProjet);

let imageUrl;

function afficherPreview() {

    const apercuNouveauProjet = document.querySelector(".insere-img");

    document.getElementById('import-photo').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            imageUrl = this.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('img-ajout').src = e.target.result;
                apercuNouveauProjet.innerHTML= "";
            };
            reader.readAsDataURL(imageUrl);
        }
    });        
}
afficherPreview()

function effacerPreview(e) {
    const zoneAjout = document.querySelector(".zone-ajout-photo")
    zoneAjout.innerHTML = "";
    const imageNouveauProjet = document.createElement('img');
    imageNouveauProjet.id = "img-ajout";
    imageNouveauProjet.src="./assets/icons/picture-svgrepo-com 1.png";
    const apercuNouveauProjet = document.createElement("div");
    apercuNouveauProjet.className = "insere-img";
    const imageInput = document.createElement("input");
    imageInput.id = "import-photo";
    imageInput.type = "file";
    imageInput.setAttribute("name", "import-photo");
    imageInput.style.display = "none";
    imageInput.accept = "images/png, images/jpg"
    const boutonImport = document.createElement("label");
    boutonImport.className = "btn-import-photo";
    boutonImport.textContent = "+ Ajouter photo";
    boutonImport.setAttribute("for", "import-photo");
    const infoAjoutImage = document.createElement("p");
    infoAjoutImage.textContent = "jpg, png : 4mo max";

    zoneAjout.appendChild(imageNouveauProjet);
    zoneAjout.appendChild(apercuNouveauProjet);
    apercuNouveauProjet.appendChild(imageInput);
    apercuNouveauProjet.appendChild(boutonImport);
    apercuNouveauProjet.appendChild(infoAjoutImage);


    afficherPreview();

}
function actualiserForm() {
    
    document.getElementById('titre-projet').value="";
    document.getElementById('select-categorie').value = "";

    // j'ouvre la modale 1
    document.querySelector('.modale-gallerie').innerHTML="";
    const target = document.querySelector('.modale-background.un');
    target.style.display = "block";
    modale = target;
    modale.addEventListener("click", fermerModale);
    modale.querySelector(".fermer-modale").addEventListener("click", fermerModale);
    modale.querySelector(".stop-propagation").addEventListener("click", stopPropagation);

    // Je ferme la modale 2

    modaleDeux.style.display = "none";
    modaleDeux.removeEventListener("click", fermerModale);
    modaleDeux.querySelector(".fermer-modale").removeEventListener("click", fermerModale);
    modaleDeux.querySelector(".stop-propagation").removeEventListener("click", stopPropagation);
    modaleDeux = null;

    gererModale();
    document.querySelector(".gallery").innerHTML="";
    console.log("gallerie vidée")
    recupererTravauxParCategorie([1,2,3]);
    console.log("gallerie affichée de nouveau")


}
function ajouterProjet(event) {
        event.preventDefault();
        const formData = new FormData();
        const titre = formData.get('titre');
        let categorieId;
        switch (event.target.categorie.value) {
            case "Objets":
                categorieId = 1;
            break;
            case "Appartements":
                categorieId = 2;
            break;
            case "Hotels & restaurants":
                categorieId = 3;
            break;
        }
        formData.append('title', event.target.titre.value);
        formData.append('category', categorieId);
        formData.append('image', imageUrl)

        fetch('http://localhost:5678/api/works', {
            method : "POST",
            headers : {
                'accept': 'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("token"))
            },
            body : formData
        })
        .then(response => {
            if(!response.ok) {
                console.log(response);
            }
            else {
                console.log(response)
                effacerPreview();
                actualiserForm();
                const messageForm = document.querySelector('.msg-form');
                setTimeout(function() {
                    messageForm.textContent="Votre projet a bien été ajouté !"
                    messageForm.style.display ="block";

                }, 400)
                setTimeout(function() {
                    messageForm.style.display="none";
                }, 4000);
            }
        })

    }


})




