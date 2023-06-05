
/**
 * Création d'une fonction principale "init" qui va appeler les autres fonctions.
 * @async
 * @function [<init>] 
 */
async function init() {

    let { photographers } = await Getdata();
    displaydata(photographers);
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
 * @param {Array} photographers
 */
function displaydata(photographers) {
    const photographersList = document.querySelector('.photographer_section');
    photographers.forEach(photographer => {
        const photographerCard = photographerFactory(photographer);
        photographersList.appendChild(photographerCard.getUserCardDOM());
    });
}