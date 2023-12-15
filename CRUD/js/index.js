/* 
localStorage.getItem(key) => returns the stored value
localStorage.setItem(key,value) => set the new item in local storage
localStorage.removeItem(key) => remove individual item
localStorage.clear() => clears all keys 
*/

// variable to read data from localstorage or empty array
let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

// dom
let fname = document.getElementById('name');
let femail = document.getElementById('email');
let fmobile = document.getElementById('mobile');

let usersList = document.getElementById('usersList');

// generate random id 
function genRandom() {
    return Math.floor(Math.random() * 10000);
}

// create handler
function createUser(event) {
    event.preventDefault(); // avoid page refresh
    let newUser = {
        id: genRandom(),
        name: fname.value,
        email: femail.value,
        mobile: fmobile.value
    };
    console.log(`newUser =`, newUser);
    let extEmail = users.find(item => item.email === newUser.email);
    let extMobile = users.find(item => item.mobile === newUser.mobile);

    if(extEmail) {
        alert(`${newUser.email} already exists.`);
    } else if(extMobile) {
        alert(`${newUser.mobile} number already exists`);
    } else {
        users.push(newUser);
        store(users);
        alert('New user added successfully');
        window.location.href = "/CRUD";
    }
    
}

// delete user 
function deleteUser(id) {
    console.log('user id', id);
    if(window.confirm(`Are you sure to delete user id = ${id}?`)) {
        let userIndex = users.findIndex(item => item.id === Number(id))
        console.log('delete index =', userIndex);
        users.splice(userIndex,1);
        store(users);
        alert('user info deleted successfully');
        window.location.reload();
    }
}

// to store values into localstorage
function store(data) {
    // data = array of users
    localStorage.setItem("users", JSON.stringify(data));
}

// display the users
(function(){
    if(users.length > 0) {
    users.forEach(item => {
        usersList.innerHTML += `<tr>
                                   <td> ${item.id} </td>
                                   <td> ${item.name} </td>
                                   <td> ${item.email} </td>
                                   <td> ${item.mobile} </td>
                                   <td>
                                      <a class="btn btn-success" href="update.html?id=${item.id}">Edit</a>
                                      <button class="btn btn-danger" onclick="deleteUser('${item.id}')">Delete</button>
                                   </td>
                                </tr>`
    });
  } else {
    usersList.innerHTML = `<tr>
                              <td colspan="5">No Users Found</td>
                           </tr>`
  }
})()