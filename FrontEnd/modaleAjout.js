
/* Gérer la modale pou l'ajout de nouveaux projets */
document.addEventListener('DOMContentLoaded', () => {

    btnAjouterProjet = document.getElementById("btn-ajout-photo");
    let modaleDeux =null
    const ouvrirModaleDeux = function (e) {
        e.preventDefault()
        document.querySelector('.modale-background.un').style.display="none"
        const target = document.querySelector('.modale-background.deux')
        target.style.display = "block"
        modaleDeux = target
        modaleDeux.addEventListener("click", fermerModale)
        modaleDeux.querySelector(".fermer-modale").addEventListener("click", fermerModale)
        modaleDeux.querySelector(".stop-propagation").addEventListener("click", stopPropagation)
    
    }
    
    const fermerModale = function (e) {
        e.preventDefault()
        modaleDeux.style.display = "none"
        modaleDeux.removeEventListener("click", fermerModale)
        modaleDeux.querySelector(".fermer-modale").removeEventListener("click", fermerModale)
        modaleDeux.querySelector(".stop-propagation").removeEventListener("click", stopPropagation)
        modaleDeux = null
    
    }
    
    const stopPropagation = function (e) {
        e.stopPropagation()
    }
    
    btnAjouterProjet.addEventListener("click", ouvrirModaleDeux);
    btnRevenirModaleUn.addEventListener("click", fermerModale)
    
    
function afficherPreview() {
    const imageNouveauProjet = document.getElementById('img-ajout');
    const imageInput = document.getElementById("import-photo");
    // imageNouveauProjet.src = document.querySelector('#import-photo').value.split('\\')[document.querySelector('#import-photo').value.split('\\').length-1];
    // console.log(document.querySelector('#import-photo').value.split('\\')[document.querySelector('#import-photo').value.split('\\').length-1]);
    const apercuNouveauProjet = document.querySelector(".insere-img");
    document.getElementById('import-photo').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('img-ajout').src = e.target.result;
                // apercuNouveauProjet.innerHTML= "";
            };
            reader.readAsDataURL(this.files[0]);
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
    apercuNouveauProjet.className = ".insere-img";
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

function ajouterProjet(event) {
        event.preventDefault();
        const formData = new FormData(formAjout);
        const titre = formData.get('titre');
        const categorie = formData.get('categorie');
        const imageNouveauProjet = formData.get('img-ajout');
        console.log(titre)

        fetch('http://localhost:5678/api/works', {
            method : "POST",
            headers : {
                'accept': 'application/json',
                'Content-Type' : 'multipart/form-data'
            },
            body : {
                "id": 0,
                "title":titre,
                "imageUrl": imageNouveauProjet,
                "categoryId": categorie,
                "userId": 0
            }
        })
        effacerPreview();
    }

/* Ajouter un nouveau projet */
const formAjout = document.querySelector(".form-ajout-projet");
formAjout.addEventListener("submit", ajouterProjet);

})



