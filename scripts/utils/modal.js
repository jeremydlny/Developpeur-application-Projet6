function initmodal(medias) {

    // Récupération de la modale.
    const modal = document.getElementById("medias_modal");
    modal.style.display = "none";

    // Création du HTML de la modale.
    const modalHtml = `
    <div class="modal_childrens">
        <div class="modal-content">
            <div id="left-side">
                <span class="previous-button"></span>
            </div>
            <div id="carousel"></div>
            <div id="right-side">
                <span class="close-button"></span>
                <span class="next-button"></span>
            </div>
        </div>
    </div>
    `

    modal.innerHTML = modalHtml;

    // Création des différents selecteurs pour viser la modale et ses différents boutons, close, previous et next.
    let closeButton = document.querySelector('.close-button');
    let previousButton = document.querySelector('.previous-button');
    let nextButton = document.querySelector('.next-button');
    let carousel = document.getElementById("carousel");

    // Création des médias dans la modale du carroussel en utilisant les deux classes de médias disponibles.
    for (let i = 0; i < medias.length; i++) { // Boucle permettant de créer les médias dans la modale carroussel.
        if (medias[i].image) { // Si le média est une image, on utilise la classe ImageMedia.
            let imageMedia = new ImageMedia(medias[i]) // Création d'un nouvel objet imageMedia.
            let article = imageMedia.createMediaModal(); // Création du HTML de l'image.
            carousel.appendChild(article); // Ajout de l'image dans le carroussel.

        } else { // Si le média est une vidéo, on utilise la classe VideoMedia.
            let videoMedia = new VideoMedia(medias[i]) // Création d'un nouvel objet videoMedia.
            let article = videoMedia.createMediaModal(); // Création du HTML de la vidéo.
            carousel.appendChild(article); // Ajout de la vidéo dans le carroussel.
        }
    }
    // Ajout d'un évènement au clique sur le bouton close, permettant d'ajouter du style à la modal pour ne plus l'afficher.
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Ajout d'un évènement au clique sur sur le bouton 'previous', permettant de retirer au média affiché la classe 'active', et d'attribuer au média précédent la classe 'active'.
    previousButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.previousElementSibling) {
            m.previousElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:last-child').classList.add('active')
        }
    });

    // Ajout d'un évènement au clique sur sur le bouton 'next', permettant de retirer au média affiché la classe 'active', et d'attribuer au média suivant la classe 'active'.
    nextButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.nextElementSibling) {
            m.nextElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:first-child').classList.add('active')
        }
    });

    document.addEventListener("keydown", function (event) { // Ajout d'un évènement au clavier, permettant de naviguer dans le carroussel avec les flèches gauche et droite, et de fermer la modale avec la touche echap.
        let activeMedia = modal.querySelector('.mediaModal.active') // On récupère le média qui comporte la classe 'active'.

        switch (event.key) { // On utilise un switch pour définir les actions à effectuer en fonction de la touche pressée.
            case "ArrowLeft": // Si la touche pressée est la flèche gauche, on retire au média affiché la classe 'active', et on attribue au média précédent la classe 'active'.
                activeMedia.classList.remove('active') // On retire au média affiché la classe 'active'.

                if (activeMedia.previousElementSibling) { // Si le média précédent existe, on lui attribue la classe 'active'.
                    activeMedia.previousElementSibling.classList.add('active') // On attribue au média précédent la classe 'active'.
                } else {
                    modal.querySelector('.mediaModal:last-child').classList.add('active') // Sinon, on attribue au dernier média la classe 'active'.
                }
                break; // On sort du switch.

            case "ArrowRight": // Si la touche pressée est la flèche droite, on retire au média affiché la classe 'active', et on attribue au média suivant la classe 'active'.
                activeMedia.classList.remove('active') // On retire au média affiché la classe 'active'.

                if (activeMedia.nextElementSibling) { // Si le média suivant existe, on lui attribue la classe 'active'.
                    activeMedia.nextElementSibling.classList.add('active') // On attribue au média suivant la classe 'active'.
                } else {
                    modal.querySelector('.mediaModal:first-child').classList.add('active') // Sinon, on attribue au premier média la classe 'active'.
                }
                break; // On sort du switch.

            case "Escape": // Si la touche pressée est la touche echap, on retire au média affiché la classe 'active', et on ferme la modale.
                modal.style.display = "none"; // On ferme la modale.
                break; // On sort du switch.
        }
    });

    return modal;
}

function openMediasModal(id) {

    const modal = document.getElementById("medias_modal");
    const img = document.getElementById('mediaModal_' + id); // On récupère le média qui comporte l'id 'mediaModal_' + l'ID unique du média choisi.
    console.log(modal)
    modal.style.display = 'block' // On display block la modale.
    modal.querySelectorAll('.mediaModal').forEach(m => {
        m.classList.remove('active') // On vient enlever la classe 'active' à tous les médias de la modale.
    })
    img.classList.add('active') // On vient ajouter la classe 'active' au média choisi pour pouvoir ouvrir la modale directement sur ce média.
}