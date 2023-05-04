function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        article.insertAdjacentHTML("beforeend",
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

        return (article);
    }

    // Récupération de la page photographe
    function getUser() {

        let photographerCard = document.createElement('section');
        photographerCard.classList.add('photographer_header');
        photographerCard.insertAdjacentHTML("beforeend",
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
        const contactBtn = photographerCard.querySelector('.button');
        contactBtn.addEventListener('click', () => {
            const modalContainer = getContactModal();
            modalContainer.style.display = 'block';
        });

        return (photographerCard);

    }

    // Affichage du nombre de likes total
    function TotalLikes() {

        let total = 0;
        let alllikes = document.getElementsByClassName("likes");

        for (let i = 0; i < alllikes.length; i++) {
            /* console.log("Like" + (i + 1) + " : " + alllikes[i].textContent); */
            total += parseInt(alllikes[i].textContent);
        }

        return total;
    }


    // Affichage du formulaire de contact
    function getContactModal() {
        console.log('getContactModal() called');

        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';

        const contactModal = document.createElement('section');
        contactModal.id = 'contact-modal';
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

        const closeButton = document.createElement('button');
        closeButton.id = 'close-button';
        const closeImg = document.createElement('img');
        closeImg.src = 'assets/icons/close.png';
        closeImg.alt = 'Fermer';
        closeButton.appendChild(closeImg);
        closeButton.addEventListener('click', () => {
            modalContainer.remove();
            console.log('Modal closed');
        });

        const form = contactModal.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let contactForm = {
                firstname: form.firstname.value,
                lastname: form.lastname.value,
                email: form.email.value,
                message: form.message.value,
            }
            console.log(contactForm);
            form.reset();
            alert('Le formulaire a été soumis avec succès !');
        });

        modalContainer.append(contactModal, closeButton);
        document.body.appendChild(modalContainer);

        console.log('Modal created');

        return modalContainer;
    }

    return { name, picture, city, country, tagline, price, getUserCardDOM, getUser, /* DisplayLightboxImgAndVideo */ TotalLikes, getContactModal };
}