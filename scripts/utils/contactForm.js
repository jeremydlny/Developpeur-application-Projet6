function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.remove();

}

function validateForm() {
    const form = document.getElementById("contact_modal");
    const firstname = document.getElementById("firstname");
    const name = document.getElementById("lastname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const error = document.getElementById("error");

    let messages = [];

    if (firstname.value === "" || name.value == null) {
        messages.push("Le nom est obligatoire");
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
        form.submit();
    }
}