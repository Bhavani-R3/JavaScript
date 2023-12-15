let answer = document.getElementById('answer');
let buttons = document.querySelectorAll('button');

// result
let screenValue = "";

for(let item of buttons) {
    item.addEventListener('click', function(event) {
        console.log(event.target.innerText);
        let btnTxt = event.target.innerText;

        if(btnTxt === "C") {
            screenValue = "";
            answer.value= screenValue;
        } else if (btnTxt === "=") {
            calculate();
        } else if (btnTxt === "") {
            screenValue = screenValue.slice(0,-1);
            answer.value = screenValue;
        } else {
            screenValue += btnTxt;
            answer.value = screenValue;
        }
    });
}

function calculate() {
    answer.value = eval(screenValue);
}