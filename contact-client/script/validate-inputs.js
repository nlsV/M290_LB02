// elemente benennen
let ALL_INPUT_VALID;

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const telefon = document.getElementById('telefon');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

// error anzeigen
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// success anzeigen
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// email überprüfen
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'E-Mail ist ungültig');
        ALL_INPUT_VALID = false;
    }
}

// leere felder
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input){
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} muss angegeben werden`);
            isRequired = true;
            ALL_INPUT_VALID = false;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// länge überprüfen
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} muss mehr als ${min} Buchstaben enthalten`
        );
        ALL_INPUT_VALID = false;
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} muss weniger als ${max} Buchstaben enthalten`
        );
        ALL_INPUT_VALID = false;
    } else {
        showSuccess(input);
    }
}

// fieldName erhalten
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// validateForm input elemente
function validateForm(){
    if(!checkRequired([username, email, password, firstName, lastName, password2, telefon])){
        checkLength(username, 3, 12);
        checkLength(password, 4, 20);
        checkEmail(email);
        checkName(firstName);
        checkName(lastName);
        checkNumber(telefon);
        checkPassword(password2);
    }
}

// überprüfung passwort (equal)
function checkPassword (input){
    var password = document.querySelector('#password').value,
        confirmpassword = document.querySelector('#password2').value;

    if (password != confirmpassword){
        showError(input, 'Passwort stimmt nicht überein');
        return false;
    }
}

// überprüfung nummer
function checkNumber(input) {
    const re = /^(\+41|0041|0){1}(\(0\))?[0-9]{9}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Telefonnummer ist ungültig');
    }
}

// überprüfung name
function checkName(input) {
    const re = /^[a-z ,.'-]+$/i;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Name soll keine Sonderzeichen und Zahlen enthalten');
    }
}

//testcall
window.onload = () => {
    console.log(`Make test call to the server ...`);
    getWelcome().then(
        result => {
            console.log(`Response from server: ${result}`);
        },
        error => {
            console.log(error)
        }
    );
};

// submit button drückt
form.addEventListener('submit', function(e) {
    ALL_INPUT_VALID = true;
    e.preventDefault();
    validateForm();
//send data
    if (ALL_INPUT_VALID){
        let formData = {
            firstName: firstName.value,
            lastName: lastName.value,
            username: username.value,
            email: email.value,
            telefon: telefon.value,
            password: password.value,
            password2: password2.value,
        }
        console.log(`All input is valid. Send data to server: 
            ${JSON.stringify(formData)}`);

        //Variant 1
        //sendForm1(formData);

        //Variante 2
        sendForm2(formData).then(
            result => {
                console.log(`Response from server: ${result}`);
                window.location.href = './confirm.html'
            },
            error => {
                console.log(error);
            }
        );

    } else {
        console.log("At least one validation failed. No data sent to contact-server");
    }
});