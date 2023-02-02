
//Airtable variables
const url = 'https://api.airtable.com/v0';
const baseid = 'appUlYCnhrd4aThSa';
const token = 'patAS4wp6LrawbyJe.0f7be9909c4a041087bdcacd6016a8ba379a4cd07e3676ad65bad3af2631ebd5';
const apiKey = 'keyNlBBq7AaqCM48y';

//Table Ids
const flower = 'tblb5xIIr65HVMKth';
const login = 'tbl9r9dgjLVJOTffq';


const getBtn = document.getElementById('login-submit');


const sendRequest= (method, url) => {
    //Allow .then statement
    const promise = new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = "json";

        xhr.onload = () => {
            resolve(xhr.response)

        }
        xhr.send();
    });

    return promise;
};

$("#login-submit").on("click", function(e) {

    //e.PreventDefault();
    let name = $("#login-name").val();
    let password = $("#login-password").val();

    console.log(name);
    
    checkLogin(name, password);
})

const checkLogin = (name, password) =>{
    //Get login data
    sendRequest('GET', `${url}/${baseid}/${login}?api_key=${apiKey}`)

    //Log response from airtable, if successful
    .then(responseData => {
        console.log(responseData);

    })
    //Log error if unsuccessful
    .catch(error => {
        console.log(error)
    })

}

getBtn.addEventListener('click', checkData);