let usersList = document.querySelector('#usersList');

function readUser() {
    fetch(`http://localhost:3000/users`)
    .then(res => res.json())
    .then(res => {
        print(res)
    }).catch(err => console.log(err))
}

function deleteUser(id) {
    if(window.confirm(`Are you sure to delete a user id ${id}?`)) {
        fetch(`http://localhost:3000/users/${id}`,{
            method: "DELETE"
        }).then(res => res.json())
        .then(res => {
            alert(`User info succefully deleted`)
            window.location.reload()
        }).catch(err => console.log(err.message))
    }
}

function print(users) {
    users.forEach(item => {
        usersList.innerHTML += `<tr>
                                   <td>${item.id}</td>
                                   <td>${item.name}</td>
                                   <td>${item.email}</td>
                                   <td>${item.mobile}</td>
                                   <td>
                                       <a href="update.html?id=${item.id}" class="btn btn-success">Edit</a>
                                       <a onclick="deleteUser('${item.id}')" class="btn btn-danger">Delete</a>
                                   </td>
                                </tr>`;
    });
}

readUser();