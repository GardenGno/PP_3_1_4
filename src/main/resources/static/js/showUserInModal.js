async function fillEditedUserPage(id) {
    const response = await fetch(`/api/admin/${id}`);

    if (response.ok) {
        const user = await response.json();
        await showUserInModal(user, "edit");
    } else {
        alert(`Error, ${response.status}`);
    }
}

async function fillDeleteUserPage(id) {
    const response = await fetch(`/api/admin/${id}`);

    if (response.ok) {
        const user = await response.json();
        await showUserInModal(user, "delete");
    } else {
        alert(`Error, ${response.status}`);
    }
}

async function showUserInModal(user, action) {
    document.getElementById(`${action}Id`).value = user.id;
    document.getElementById(`${action}FirstName`).value = user.firstName;
    document.getElementById(`${action}LastName`).value = user.lastName;
    document.getElementById(`${action}Age`).value = user.age;
    document.getElementById(`${action}Email`).value = user.email;
    document.getElementById(`${action}Username`).value = user.username;
    document.getElementById(`${action}Password`).value = user.password;

    await fillRoles(action);

    const roleSelect = document.getElementById(`${action}Role`);
    Array.from(roleSelect.options).forEach(option => {
        option.selected = user.roles.some(role => role.authority === option.value);
    });
}

async function fillRoles(action) {
    const response = await fetch('/api/admin/roles');

    if (response.ok) {
        const roles = await response.json();
        const select = document.getElementById(`${action}Role`);
        select.innerHTML = roles.map(role => `
            <option value="${role.id}">${role.name.substring(5)}</option>
        `).join('');
    } else {
        alert(`Error, ${response.status}`);
    }
}


