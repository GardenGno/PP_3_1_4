document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("formNewUser").addEventListener('submit', addNewUser);
});

async function createNewUser(user) {
    const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        const errorMessage = await response.text(); // Читаем текст ошибки
        alert(`Error: ${response.status}\nMessage: ${errorMessage}`);
        return;
    }
}

async function addNewUser(event) {
    event.preventDefault();

    const newUser = {
        firstName: document.getElementById("Firstname").value.trim(),
        lastName: document.getElementById("Lastname").value.trim(),
        age: document.getElementById("age").value.trim(),
        email: document.getElementById("email").value.trim(),
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value.trim(),
        roles: Array.from(document.getElementById("setListRole").selectedOptions)
            .map(option => option.value)
    };

    await createNewUser(newUser);
    document.getElementById("formNewUser").reset();
    document.querySelector('button#home-tab').click();
    adminShowAllUsers();
}
