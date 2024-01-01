const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

console.log(`params =`, params.id);
let fname = document.getElementById('name');
let femail = document.getElementById('email');
let fmobile = document.getElementById('mobile');

fetch(`http://localhost:3000/users/${params.id}`)
.then(res => res.json())
.then(res => {
    console.log('single =', res);
    fname.value = res.name;
    femail.value = res.email;
    fmobile.value = res.mobile;
}).catch(err => console.log(err.message));

function updateUser(e) {
    e.preventDefault();
    let user = {
        name: fname.value,
        email: femail.value,
        mobile: fmobile.value
    };
    fetch(`http://localhost:3000/users/${params.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
    .then(res => {
        alert("User info updated successfully");
        window.location.href = "/index.html";
    }).catch(err => console.log(err.message));
}