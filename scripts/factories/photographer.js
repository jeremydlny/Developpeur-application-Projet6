function photographerFactory(data) { // data = tableau de données
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`; // Création d'une variable picture qui contient le chemin de l'image du photographe.

    function getUserCardDOM() { // Création d'une fonction getUserCardDOM.
        const article = document.createElement('article'); // Création d'un élément article.

        article.insertAdjacentHTML("beforeend", // Ajout du contenu HTML à l'élément article.
            `
                <a href="./photographer.html?id=${id}" tabindex="0">
                    <img src="${picture}" alt="Photo de profil de ${name}">
                    <h2>${name}</h2>
                </a>        
                <h3>${city}, ${country}</h3>
                <p class="tagline">${tagline}</p>
                <p class="price" aria-label="Le coût de prestation de ${name} est de ${price}€ par jour.">${price}€/jour</p>
            `
        );

        return (article); // Retourne l'élément article.
    }

    // Récupération de la page photographe
    function getUser() { // Création d'une fonction getUser.

        let photographerCard = document.createElement('section'); // Création d'un élément section.
        photographerCard.classList.add('photographer_header'); // Ajout d'une classe à l'élément section.
        photographerCard.insertAdjacentHTML("beforeend", // Ajout du contenu HTML à l'élément section.
            `
                 <div class="photographer_header__profile">
                     <h1 class="photographer_header__profile__name">${name}</h1>
                     <h2 class="photographer_header__profile__location">${city}, ${country}</h2>
                     <p class="photographer_header__profile__tagline">${tagline}</p>
                 </div>
                 <div class="photographer_header__profile__contact">
                     <a href="#" class="button">Contactez-moi</a>
                 </div>
                     <img src="${picture}" alt="Photo de profil de ${name}" class="photographer_header__profile__picture">   
                 <div class="photographer_header__profile__price">
                     <div class="likes">
                        <p class="likes__number" id="totalLikes">0</p><p class="likes__text">
                            <img id="like-icon"src="assets/icons/like.png">
                        </p>
                     </div>
                     <p class="price">${price}€/jour</p>
                 </div>
             `
        );

        // Affichage du formulaire de contact
        const contactBtn = photographerCard.querySelector('.button'); // Récupère le bouton contact
        contactBtn.addEventListener('click', () => { // Ajoute un écouteur d'événement au clic sur le bouton contact
            const modalContainer = getContactModal(); // Récupère la modal
            modalContainer.style.display = 'block'; // Affiche la modal
        });

        return (photographerCard); // Retourne l'élément section.

    }

    // Affichage du nombre de likes total
    function TotalLikes() { // Création d'une fonction TotalLikes.

        let total = 0; // Création d'une variable total qui contient la valeur 0.
        let alllikes = document.getElementsByClassName("likes"); // Création d'une variable alllikes qui contient tous les éléments de classe likes.

        for (let i = 0; i < alllikes.length; i++) { // Boucle for qui permet de parcourir tous les éléments de la variable alllikes.
            total += parseInt(alllikes[i].textContent); // Ajoute à la variable total la valeur de la variable alllikes.
        }

        return total; // Retourne la variable total.
    }


    // Affichage du formulaire de contact
    function getContactModal() { // Création d'une fonction getContactModal.
        console.log('getContactModal() called'); // Affiche dans la console le message 'getContactModal() called'.

        const modalContainer = document.createElement('div'); // Création d'un élément div.
        modalContainer.id = 'modal-container'; // Ajout d'un id à l'élément div.

        const contactModal = document.createElement('section'); // Création d'un élément section.
        contactModal.id = 'contact-modal'; // Ajout d'un id à l'élément section.
        contactModal.innerHTML = ` 
          <form class="contact_modal__form" action="">
            <div class="contact_modal__form__photograhper">
              <h2>Contactez-moi</h2>
              <h2 class="name">${name}</h2>
            </div>
            <div class="contact_modal__form__group">
              <label for="firstname">Prénom</label>
              <input type="text" id="firstname" name="firstname" required>
            </div>
            <div class="contact_modal__form__group">
              <label for="lastname">Nom</label>
              <input type="text" id="lastname" name="lastname" required>
            </div>
            <div class="contact_modal__form__group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email"  required>
            </div>
            <div class="contact_modal__form__group">
              <label for="message">Message</label>
              <textarea id="message" name="message"  required></textarea>
            </div>
            <div class="contact_modal__form__group">
              <button type="submit" class="button">Envoyer</button>
            </div>
            <div class="contact_modal__form__group">
              <p id="error"></p>
            </div>
          </form>
        `;

        const closeButton = document.createElement('button'); // Création d'un élément button.
        closeButton.id = 'close-button'; // Ajout d'un id à l'élément button.
        const closeImg = document.createElement('img'); // Création d'un élément img.
        closeImg.src = 'assets/icons/close.png'; // Ajout d'un attribut src à l'élément img.
        closeImg.alt = 'Fermer'; // Ajout d'un attribut alt à l'élément img.
        closeButton.appendChild(closeImg); // Ajout de l'élément img à l'élément button.
        closeButton.addEventListener('click', () => { // Ajout d'un écouteur d'événement au clic sur le bouton close.
            modalContainer.remove(); // Supprime l'élément modalContainer.
            console.log('Modal closed'); // Affiche dans la console le message 'Modal closed'.
        });

        const form = contactModal.querySelector('form'); // Récupère le formulaire.
        form.addEventListener('submit', (event) => { // Ajout d'un écouteur d'événement au clic sur le bouton submit.
            event.preventDefault(); // Empêche le comportement par défaut du bouton submit.
            let contactForm = { // Création d'un objet contactForm.
                firstname: form.firstname.value,
                lastname: form.lastname.value,
                email: form.email.value,
                message: form.message.value,
            }
            console.log(contactForm);
            form.reset(); // Réinitialise le formulaire.
            alert('Le formulaire a été soumis avec succès !'); // Affiche une alerte.
        });

        modalContainer.append(contactModal, closeButton); // Ajout des éléments contactModal et closeButton à l'élément modalContainer.
        document.body.appendChild(modalContainer); // Ajout de l'élément modalContainer au body.

        console.log('Modal created'); // Affiche dans la console le message 'Modal created'.

        return modalContainer; // Retourne l'élément modalContainer.
    }

    return { name, picture, city, country, tagline, price, getUserCardDOM, getUser, TotalLikes, getContactModal };
}