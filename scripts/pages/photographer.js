
/**
 * Création d'une fonction principale "init" qui va appeler les autres fonctions.
 * @async
 * @function [<init>] 
 */
async function init() {

    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    let { photographers, media } = await Getdata();
    let photographer = photographers.find(photographer => photographer.id == id);
    let photographerMedia = media.filter(media => media.photographerId == id);
    displaydata(photographer, photographerMedia);
}

init();

/**
 * Création d'une fonction fetch qui permet de récupérer les informations du Json.
 * @returns {Promise}
 * @function [<Getdata>] 
 */
function Getdata() {
    return fetch('http://localhost:5500/data/photographers.json')
        .then(response => { return response.json() })
        .catch(error => console.log(error));
}

/**
 * Création d'une fonction fetch qui permet de récupérer les informations du Json.
 * @function [<displaydata>] 
 * @param {Array} photographer
 * @param {Array} photographerMedia
 */
function displaydata(photographer, photographerMedia) {
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerModel = photographerFactory(photographer);
    const photographerData = photographerModel.getUser();
    photographerHeader.appendChild(photographerData);

    const listmedia = document.querySelector(".ListMedia");

    const displaymedias = (photographerMedia) => {
        for (let i = 0; i < photographerMedia.length; i++) {
            if (photographerMedia[i].image) {
                let imagemedia = new ImageMedia(photographerMedia[i])
                let card = imagemedia.createMedia();

                listmedia.appendChild(card)
            } else {
                let videomedia = new VideoMedia(photographerMedia[i])
                let card = videomedia.createMedia();

                listmedia.appendChild(card)
            }

        }
        document.getElementById("totalLikes").innerHTML = 0;
        let totallike = photographerModel.TotalLikes();
        document.getElementById("totalLikes").innerHTML = totallike;
    }
    displaymedias(photographerMedia)
    initmodal(photographerMedia)

    // Création du label Trier par et de son dropdown menu.
    const filter = document.createElement("div");
    filter.setAttribute("id", "filter_section")
    photographerHeader.appendChild(filter);

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
    const activateDropdown = document.querySelector('.select__container');
    activateDropdown.addEventListener('click', (e) => {
        const arrow = document.getElementById('select__container-icon');
        arrow.classList.toggle('isActive');
        document.getElementById('dropdown__menu').classList.toggle('not-hidden');
        document.getElementById('filter').setAttribute('aria-expanded', filter.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    })

    const select = document.getElementById('dropdown__menu_hidden')
    select.addEventListener('click', (e) => {
        let filter = document.getElementById("filter");
        filter.innerHTML = e.target.innerText;
        photographerMedia.sort((a, b) => {
            switch (e.target.innerText) {
                case 'Popularité':
                    if (a.likes > b.likes) {
                        return -1
                    } else {
                        return 1
                    }
                    break;
                case 'Date':
                    if (a.date > b.date) {
                        return 1
                    } else {
                        return -1
                    }
                    break;
                case 'Titre':
                    if (a.title > b.title) {
                        return 1
                    } else {
                        return -1
                    }
                    break;
            }
        })
        listmedia.innerHTML = '';
        displaymedias(photographerMedia);

    })
}
