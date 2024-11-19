document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('userUpdateButton').addEventListener('click', saveEditedUser);
    document.getElementById("delete-form").addEventListener("submit", userDelete);
});

async function saveEditedUser(event) {
    event.preventDefault();

    const editedUser = {
        id: document.getElementById('editId').value,
        firstName: document.getElementById('editFirstName').value.trim(),
        lastName: document.getElementById('editLastName').value.trim(),
        age: document.getElementById('editAge').value.trim(),
        email: document.getElementById('editEmail').value.trim(),
        username: document.getElementById('editUsername').value.trim(),
        password: document.getElementById('editPassword').value.trim(),
        roles: Array.from(document.getElementById("editRole").selectedOptions)
            .map(option => option.value)
    };

    const response = await fetch("/api/admin/update", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editedUser)
    });

    if (response.ok) {
        document.getElementById("updateClose").click();
        adminShowAllUsers();
    } else {
        alert(`Error, ${response.status}`);
    }
}

async function userDelete(event) {
    event.preventDefault();
    const deleteId = document.getElementById('deleteId').value;

    const response = await fetch(`/api/admin/${deleteId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    });

    if (response.ok) {
        document.getElementById("deleteClose").click();
        adminShowAllUsers();
    } else {
        alert(`Error, ${response.status}`);
    }
}
