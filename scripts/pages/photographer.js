
/**
 * Création d'une fonction principale "init" qui va appeler les autres fonctions.
 * @async
 * @function [<init>] 
 */
async function init() {

    let url = new URL(window.location.href); // Récupération de l'URL de la page.
    let id = url.searchParams.get("id"); // Récupération de l'id de la page.
    let { photographers, media } = await Getdata(); // Récupération des données du Json.
    let photographer = photographers.find(photographer => photographer.id == id); // Récupération des données du Json.
    let photographerMedia = media.filter(media => media.photographerId == id); // Récupération des données du Json.
    displaydata(photographer, photographerMedia); // Appel de la fonction displaydata.
}

init();

/**
 * Création d'une fonction fetch qui permet de récupérer les informations du Json.
 * @returns {Promise} 
 * @function [<Getdata>] 
 */
function Getdata() {
    return fetch('http://localhost:5500/data/photographers.json') // Récupération des données du Json.
        .then(response => { return response.json() }) // Si la promesse est résolue, on retourne la réponse en format json.
        .catch(error => console.log(error));  // Si la promesse est rejetée, on affiche l'erreur dans la console.
}

/**
 * Création d'une fonction fetch qui permet de récupérer les informations du Json.
 * @function [<displaydata>] 
 * @param {Array} photographer
 * @param {Array} photographerMedia
 */
function displaydata(photographer, photographerMedia) {
    const photographerHeader = document.querySelector(".photograph-header"); // Récupération de la classe photograph-header.

    const photographerModel = photographerFactory(photographer); // Création d'une instance de la classe photographerFactory.
    const photographerData = photographerModel.getUser(); // Appel de la fonction getUser de la classe photographerFactory.
    photographerHeader.appendChild(photographerData);  // Ajout du contenu HTML de la fonction getUser à la classe photograph-header.

    const listmedia = document.querySelector(".ListMedia"); // Récupération de la classe ListMedia.

    const displaymedias = (photographerMedia) => { // Création d'une fonction displaymedias.
        for (let i = 0; i < photographerMedia.length; i++) { // Boucle for permettant de parcourir le tableau photographerMedia.
            if (photographerMedia[i].image) {   // Si l'index i du tableau photographerMedia contient une image, on crée une instance de la classe ImageMedia et on appelle la fonction createMedia.
                let imagemedia = new ImageMedia(photographerMedia[i])  // Création d'une instance de la classe ImageMedia.
                let card = imagemedia.createMedia(); // Appel de la fonction createMedia de la classe ImageMedia.

                listmedia.appendChild(card) // Ajout du contenu HTML de la fonction createMedia à la classe ListMedia.
            } else { // Sinon, on crée une instance de la classe VideoMedia et on appelle la fonction createMedia.
                let videomedia = new VideoMedia(photographerMedia[i]) // Création d'une instance de la classe VideoMedia.
                let card = videomedia.createMedia(); // Appel de la fonction createMedia de la classe VideoMedia.

                listmedia.appendChild(card) // Ajout du contenu HTML de la fonction createMedia à la classe ListMedia.
            }

        }
        document.getElementById("totalLikes").innerHTML = 0; // Initialisation du compteur de likes à 0.
        let totallike = photographerModel.TotalLikes(); // Appel de la fonction TotalLikes de la classe photographerFactory.
        document.getElementById("totalLikes").innerHTML = totallike; // Ajout du contenu HTML de la fonction TotalLikes à la classe totalLikes.
    }
    displaymedias(photographerMedia) // Appel de la fonction displaymedias.
    initmodal(photographerMedia) // Appel de la fonction initmodal.

    // Création du label Trier par et de son dropdown menu.
    const filter = document.createElement("div"); // Création d'un élément div.
    filter.setAttribute("id", "filter_section") // Ajout d'un id à l'élément div.
    photographerHeader.appendChild(filter); // Ajout du contenu HTML à la classe photograph-header.

    // Ajout du contenu HTML au label Trier par et à son dropdown menu.
    filter.insertAdjacentHTML(
        "beforeend",
        `
        <label class="label" for="select">Trier par</label>
        <div class="select__container">
            <div id="select__container-icon">
                <img src="/assets/icons/dropdown.png" alt="icône flèche permettant de déplier le filtre dropdown" tabindex="0"/>
            </div>
            <button id="filter" type="button" role="button" aria-haspopup="listbox" tabindex="0" aria-expanded="false">Filtres</button>
            <div id="dropdown__menu">
            <ul id="dropdown__menu_hidden">
                <li class="dropdown__options" tabindex="0" role="listbox" activedescendant="Popularité">Popularité</li>
                <li class="dropdown__options" tabindex="0" role="listbox" activedescendant="Date">Date</li>
                <li class="dropdown__options" tabindex="0" role="listbox" activedescendant="Titre">Titre</li>
            </ul>
            </div>
        </div>
    `
    )

    // Ajout d'un évènement au clique permettant de dérouler le menu dropdown en ajoutant la classe 'not-hidden' si elle n'est pas présente et en la retirant si elle l'est.
    const activateDropdown = document.querySelector('.select__container'); // Récupération de la classe select__container.
    activateDropdown.addEventListener('click', (e) => { // Ajout d'un évènement au clique.
        const arrow = document.getElementById('select__container-icon'); // Récupération de l'id select__container-icon.
        arrow.classList.toggle('isActive'); // Ajout de la classe isActive à l'id select__container-icon.
        document.getElementById('dropdown__menu').classList.toggle('not-hidden'); // Ajout de la classe not-hidden à l'id dropdown__menu.
        document.getElementById('filter').setAttribute('aria-expanded', filter.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); // Ajout de l'attribut aria-expanded à l'id filter.
    })

    // Ajout d'un évènement au clique permettant de dérouler le menu dropdown en ajoutant la classe 'not-hidden' si elle n'est pas présente et en la retirant si elle l'est.
    const select = document.getElementById('dropdown__menu_hidden') // Récupération de l'id dropdown__menu_hidden.
    select.addEventListener('click', (e) => { // Ajout d'un évènement au clique.
        let filter = document.getElementById("filter"); // Récupération de l'id filter.
        filter.innerHTML = e.target.innerText; // Ajout du contenu HTML de l'élément cliqué à l'id filter.
        photographerMedia.sort((a, b) => { // Tri du tableau photographerMedia en fonction de l'élément cliqué.
            switch (e.target.innerText) { // Ajout d'un switch pour trier le tableau photographerMedia en fonction de l'élément cliqué.
                case 'Popularité': // Si l'élément cliqué est Popularité, on trie le tableau photographerMedia en fonction du nombre de likes.
                    if (a.likes > b.likes) { // Si le nombre de likes de l'index a est supérieur au nombre de likes de l'index b, on retourne 1.
                        return -1 // Si le nombre de likes de l'index a est inférieur au nombre de likes de l'index b, on retourne -1.
                    } else { // Sinon, on retourne 1.
                        return 1 // Sinon, on retourne -1.
                    }
                    break; // On sort du switch.
                case 'Date':  // Si l'élément cliqué est Date, on trie le tableau photographerMedia en fonction de la date.
                    if (a.date > b.date) {
                        return 1
                    } else {
                        return -1
                    }
                    break;
                case 'Titre': // Si l'élément cliqué est Titre, on trie le tableau photographerMedia en fonction du titre.
                    if (a.title > b.title) {
                        return 1
                    } else {
                        return -1
                    }
                    break;
            }
        })
        listmedia.innerHTML = ''; // On vide la classe listmedia.
        displaymedias(photographerMedia);   // On appelle la fonction displaymedias.

    })
}
