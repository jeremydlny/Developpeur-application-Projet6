class PhotographerMedia {

    constructor(data) {
        const { date, id, likes, photographerId, price, title } = data;
        this.title = title;
        this.likes = likes;
        this.id = id;
        this.liked = false; // ajout de la variable de suivi
    }

    // Fonction permettant de créer un média
    createMedia() {
        const card = document.createElement('article');
        card.insertAdjacentHTML("beforeend",
            `
            <div class ="descriptionPicture">
                <p tabindex="0">${this.title}</p>
                <div class="likes">
                    <p tabindex="0">${this.likes}</p>
                    <img tabindex="0" class="heart heart${this.id}" src="assets/icons/Heart.png" alt="icône coeur permettant de liker un média"/>
                </div>
            </div>  
        `)

        const like = card.querySelector(".heart")
        like.addEventListener('click', () => this.toggleLike()) // Ajout d'un évènement au clique d'un coeur permettant de liker un média.

        return (card)
    }

    // Fonction permettant de liker un média ou de retirer son like 
    toggleLike() {
        let like = document.querySelector('.heart' + this.id)
        if (!this.liked) { // Si l'utilisateur n'a pas encore aimé le contenu
            this.likes++
            console.log("Mise à jour du nombre de likes :", this.likes);
            like.previousElementSibling.innerHTML = this.likes
            this.liked = true // Mis à jour la variable de suivi
        } else { // Si l'utilisateur a déjà aimé le contenu
            this.likes--
            console.log("Mise à jour du nombre de likes :", this.likes);
            like.previousElementSibling.innerHTML = this.likes
            this.liked = false // Réinitialiser la variable de suivi
        }

        // Mise à jour du nombre de likes total
        let totalLikes = document.getElementById('totalLikes')
        let totalLikesNumber = parseInt(totalLikes.innerHTML)
        if (this.liked) { // Si l'utilisateur n'a pas encore aimé le contenu
            totalLikesNumber++
            totalLikes.innerHTML = totalLikesNumber
        } else { // Si l'utilisateur a déjà aimé le contenu
            totalLikesNumber--
            totalLikes.innerHTML = totalLikesNumber

        }
    }

}

class ImageMedia extends PhotographerMedia {

    constructor(data) {
        super(data);
        this.id = data.id;
        this.image = "assets/content/" + data.image;
    }

    createMedia() { // Création d'une carte pour un média de type image
        const card = super.createMedia(); // Appel de la fonction createMedia() de la classe mère
        card.insertAdjacentHTML("afterbegin",
            `
        <img src="${this.image}" class="mediaPicture" alt="${this.title}" tabindex="0"/>
        `)

        let imageModal = card.querySelectorAll('.mediaPicture') // Récupération de toutes les images
        imageModal.forEach(element => { // Pour chaque image
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une image permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une image permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    openMediasModal(this.id) // Appel de la fonction permettant l'ouverture de la modale carroussel.
                }
            })
        })

        return (card)
    }

    createMediaModal() { // Création d'une modale pour un média de type image
        const article = document.createElement('div') // Création d'un élément HTML de type div
        article.setAttribute('id', 'mediaModal_' + this.id) // Ajout d'un attribut id à l'élément HTML
        article.setAttribute('class', 'mediaModal') // Ajout d'un attribut class à l'élément HTML
        article.insertAdjacentHTML( // Ajout du contenu HTML à l'élément HTML
            "beforeend",
            `
                <img src="${this.image}" class="mediaPicture" alt="${this.title}" tabindex="0"/>
                <p>${this.title}</p> 
            `
        )

        return (article)
    }

}

class VideoMedia extends PhotographerMedia {

    constructor(data) {
        super(data);
        this.id = data.id;
        this.video = "assets/content/" + data.video;
    }

    createMedia() { // Création d'une carte pour un média de type vidéo
        const card = super.createMedia() // Appel de la fonction createMedia() de la classe mère
        card.insertAdjacentHTML( // Ajout du contenu HTML à l'élément HTML
            "afterbegin",
            `
            <video  alt="${this.title}" class="mediaVideo" tabindex="0">
            <source src="${this.video}" type=video/mp4>
            </video>
            `
        )

        // Ajout des événements pour la modale carrousel
        const videoModal = card.querySelector('.mediaVideo') // Récupération de la vidéo
        videoModal.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une vidéo permettant l'ouverture de la modale carroussel.
        videoModal.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                openMediasModal(this.id) // Appel de la fonction permettant l'ouverture de la modale carroussel.
            }
        })

        return (card)
    }

    createMediaModal() {
        const article = document.createElement('div') // Création d'un élément HTML de type div
        article.setAttribute('id', 'mediaModal_' + this.id) // Ajout d'un attribut id à l'élément HTML
        article.setAttribute('class', 'mediaModal') // Ajout d'un attribut class à l'élément HTML
        article.insertAdjacentHTML( // Ajout du contenu HTML à l'élément HTML
            "beforeend",
            `
            <video width="350" height="300" class="video" alt="${this.title}" tabindex="0" controls auto>
            <source src="${this.video}" type=video/mp4>
            </video>
            <p>${this.title}</p> 
            `
        )

        console.log('Creating media modal with id:', 'mediaModal_' + this.id); // Affichage dans la console du contenu de la modale
        console.log('Video source:', this.video);
        console.log('Video title:', this.title);

        return (article)
    }

}


