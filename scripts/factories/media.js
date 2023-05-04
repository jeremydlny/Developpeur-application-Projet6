class PhotographerMedia {

    constructor(data) {
        const { date, id, likes, photographerId, price, title } = data;
        this.title = title;
        this.likes = likes;
        this.id = id;
        this.liked = false; // ajout de la variable de suivi
    }

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

    createMedia() {
        const card = super.createMedia();
        card.insertAdjacentHTML("afterbegin",
            `
        <img src="${this.image}" class="mediaPicture" alt="${this.title}" tabindex="0"/>
        `)

        let imageModal = card.querySelectorAll('.mediaPicture')
        imageModal.forEach(element => {
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une image permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une image permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    openMediasModal(this.id)
                }
            })
        })

        return (card)
    }

    createMediaModal() {
        const article = document.createElement('div')
        article.setAttribute('id', 'mediaModal_' + this.id)
        article.setAttribute('class', 'mediaModal')
        article.insertAdjacentHTML(
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

    createMedia() {
        const card = super.createMedia()
        card.insertAdjacentHTML(
            "afterbegin",
            `
            <video  alt="${this.title}" class="mediaVideo" tabindex="0">
            <source src="${this.video}" type=video/mp4>
            </video>
            `
        )

        return (card)
    }

    createMediaModal() {
        const article = document.createElement('div')
        article.setAttribute('id', 'mediaModal_' + this.id)
        article.setAttribute('class', 'mediaModal')
        article.insertAdjacentHTML(
            "beforeend",
            `
            <video width="350" height="300" class="video" alt="${this.title}" tabindex="0" controls auto>
            <source src="${this.video}" type=video/mp4>
            </video>
            <p>${this.title}</p> 
            `
        )

        console.log('Creating media modal with id:', 'mediaModal_' + this.id);
        console.log('Video source:', this.video);
        console.log('Video title:', this.title);

        return (article)
    }

}


