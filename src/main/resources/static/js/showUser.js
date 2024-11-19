async function getUser() {
    const response = await fetch("/api/user/info");

    if (response.ok) {
        const user = await response.json();
        showUser(user);
        showUserEmailOnNavbar(user);
    } else {
        alert(`Error, ${response.status}`);
    }
}

function showUser(user) {
    const rolesStrings = user.roles.map(role => role.name.replace("ROLE_", "")).join(', ');
    const targetTable = user.roles.some(role => role.name === "ROLE_ADMIN")
        ? "show-admin"
        : "show-user";
    const tableBody = document.getElementById(targetTable);
    let HTMLData = `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${rolesStrings}</td>
            <td>${"******"}</td>
           
        </tr>
    `;

    tableBody.innerHTML += HTMLData;
}

function showUserEmailOnNavbar(user) {
    const rolesStrings = user.roles.map(role => role.name.replace("ROLE_", "")).join(', ');
    document.getElementById("user-nav-bar").textContent = `${user.username} with roles: ${rolesStrings}`;
}

getUser();

