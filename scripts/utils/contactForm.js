function displayModal() { // Affiche la modal
    const modal = document.getElementById("contact_modal"); // Récupère la modal
    modal.style.display = "block"; // Affiche la modal
}

function closeModal() { // Ferme la modal
    const modalContainer = document.getElementById('modal-container'); // Récupère la modal
    modalContainer.remove(); // Supprime la modal

}

function validateForm() { // Vérifie que les champs du formulaire sont remplis
    const form = document.getElementById("contact_modal"); // Récupère le formulaire
    const firstname = document.getElementById("firstname");  // Récupère le champ firstname
    const name = document.getElementById("lastname"); // Récupère le champ lastname
    const email = document.getElementById("email"); // Récupère le champ email
    const message = document.getElementById("message"); // Récupère le champ message
    const error = document.getElementById("error"); // Récupère le champ error

    let messages = []; // Création d'un tableau vide

    if (firstname.value === "" || name.value == null) {  // Si le champ firstname est vide, on ajoute un message d'erreur au tableau messages
        messages.push("Le nom est obligatoire"); // Ajout du message d'erreur au tableau messages
    }

    if (lastname.value === "" || lastname.value == null) {
        messages.push("Le prénom est obligatoire");
    }

    if (email.value === "" || email.value == null) {
        messages.push("L'email est obligatoire");
    }

    if (message.value === "" || message.value == null) {
        messages.push("Le message est obligatoire");
    }

    if (messages.length > 0) {
        error.innerText = messages.join(", ");
        return false;
    } else {
        error.innerText = "";
        form.submit(); // Envoie le formulaire
    }
}