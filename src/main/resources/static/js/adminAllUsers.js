
async function adminShowAllUsers() {
    let page = await fetch("/api/admin");
    if(page.ok){
        let listUsers = await page.json();
        adminDisplayAllUsers(listUsers);
        await getCurrentUser();
    }else {
        alert(`Error, ${page.status}`)
    }
}
function adminDisplayAllUsers(listUsers) {
    const people = document.getElementById("show-all-users");
    let HTMLData = "";
    for (let user of listUsers) {
        const rolesStrings = user.roles.map(role => role.name.replace("ROLE_","")).join(', ');
        HTMLData +=  `<tr>
        <td> ${user.id}</td>
        <td> ${user.firstName}</td>
        <td> ${user.lastName}</td>
        <td> ${user.age}</td>
        <td> ${user.email}</td>
        <td> ${user.username}</td>
        <td> ${rolesStrings}</td>
        <td> ${user.password}</td>      
        <td>
        <button type="button" class="btn btn-info text-white" data-bs-toggle="modal"
                    data-bs-target="#editModal" id="admin-edit-button" onClick="fillEditedUserPage(${user.id})"> Edit </button>
</td>
<td>
        <button type="button" class="btn btn-danger text-white" data-bs-toggle="modal"
                    data-bs-target="#deleteModal" id="admin-delete-button" onClick="fillDeleteUserPage(${user.id})"> Delete </button>
</td>
    </tr>`
    }
    people.innerHTML = HTMLData;
}
adminShowAllUsers();

async function getCurrentUser() {
    const urlUser = "/api/user/info"
    let page = await fetch(urlUser);

    if (page.ok) {
        let user = await page.json();
        await showUserEmailOnNavbar(user)
    } else {
        alert(`Error, ${page.status}`);
        return null;
    }
}
document.getElementById('profile-tab').addEventListener('click', async function() {
    await fillRoles("setList");
});
