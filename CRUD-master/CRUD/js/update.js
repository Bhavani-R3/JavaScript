// to read query from url
const params = new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams, prop) => searchParams.get(prop)
});

if(params){
    console.log('params =', params.id);
}

let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

let single = users.find(item => item.id === Number(params.id));

console.log(`single =`, single);

let fname = document.getElementById('name');
let femail = document.getElementById('email');
let fmobile = document.getElementById('mobile');

if(single) {
    fname.value = single.name;
    femail.value = single.email;
    fmobile.value = single.mobile;
}

function updateHandler(event) {
    event.preventDefault();
    let data = {
        id: single.id,
        name: fname.value,
        email: femail.value,
        mobile: fmobile.value
    };
    console.log(`update user data =`, data);

    // find the user index
    let userIndex = users.findIndex(item => item.id === Number(params.id))
    console.log(`userIndex =`, userIndex);

    // update the array value
    if(window.confirm(`Are you sure to update user id = ${params.id}?`)) {
        users.splice(userIndex,1,data);
        store(users);
        alert('User data updated successfully');
        window.location.href = "/CRUD";
    } else {
        return;
    }
} 

function store(data) {
    localStorage.setItem("users", JSON.stringify(data));
}