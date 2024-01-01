let fname = document.getElementById('name');
let femail = document.getElementById('email');
let fmobile = document.getElementById('mobile');

// generating random id
function genId() {
    return Math.floor(Math.random() * 10000)
}

function createUser(e) {
    e.preventDefault();
    let user = {
        id: genId(),
        name: fname.value,
        email: femail.value,
        mobile: fmobile.value
    };
    console.log(`new user =`, user);

    // to validate duplicates
    fetch(`http://localhost:3000/users`)
    .then(res => res.json())
    .then(res => {
        let extEmail = res.find(item => item.email === user.email)
        let extMobile = res.find(item => item.mobile === user.mobile)
        if(extEmail){
            alert(`${user.email} already exists`)
        } else if(extMobile){
            alert(`${user.mobile} already exists`)
        } else {
            save(user)
        }
    }).catch(err => console.log(err))
}

// to store user values
function save(user) {
    fetch(`http://localhost:3000/users`,{
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(res => {
        alert('New user info created successfully');
        window.location.href = "index.html"
    }).catch(err => console.log(err))
}