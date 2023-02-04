
$(document).ready(function(){
//Airtable variables
const url = 'https://api.airtable.com/v0';
const baseid = 'appUlYCnhrd4aThSa';
const token = 'patAS4wp6LrawbyJe.0f7be9909c4a041087bdcacd6016a8ba379a4cd07e3676ad65bad3af2631ebd5';
const apiKey = 'keyNlBBq7AaqCM48y';

//Table Ids
//flower = 'tblb5xIIr65HVMKth';
//login = 'tbl9r9dgjLVJOTffq';




const getBtn = document.getElementById('login-submit');


const sendRequest= (method, url, data) => {
    //Allow .then statement
    const promise = new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = "json";

        xhr.onload = () => {
            resolve(xhr.response)

        }
        xhr.send(JSON.stringify(data));
    });

    return promise;
};

$("#login-submit").on("click", function() {

    //e.PreventDefault();
    let name = $("#getEmail").val();
    let password = $("#getPassword").val();

    console.log(name);
    
    checkLogin(name, password);
})

const checkLogin = (name, password) =>{
    //Table = login 
    let table = 'tbl9r9dgjLVJOTffq';

    //Get login data
    sendRequest('GET', `${url}/${baseid}/${table}?api_key=${apiKey}`)

    //Log response from airtable, if successful
    .then(responseData => {
        //Check if data is received
        //console.log(responseData);

        //Split data to become an array (but still technically a dictionary)
        let data = responseData.records

        //Check if user in database
        for (var i = 0; i < data.length; i++) {

            console.log(data[i]);
            
            //Case sensitive****
            if (name == data[i].fields.Name){
                //Check if the password is correct
                if(password == data[i].fields.Password){
                    console.log("Logged In");
                }
                else{
                    console.log("Incorrect password");
                }
            }
            else{
                console.log("Incorrect")
            }

      }

    })
    //Log error if unsuccessful
    .catch(error => {
        console.log(error)
    })

}

//Get flower
const getItems = () =>{
    //Get flower data
    let table = 'tblb5xIIr65HVMKth';

    sendRequest('GET', `${url}/${baseid}/${table}?api_key=${apiKey}`)

    .then(responseData => {
        //Check if data is received
        //console.log(responseData);

        //Split data to become an array
        let data = responseData.records
        console.log(data)
        displayFlower(data)

    })

    .catch(error => {
        console.log(error)
    })
};

getItems();

function displayFlower(data){

    data.forEach(data => {
        
        const flower = data.fields;
        console.log(flower.Name);
        const display = `
        <div class="card text-center" style="width: 22rem;">
            <img src="${flower.Photo[0].url}" class="card-img-top" alt="CottonV">
            <div class="card-body">
            <h4 class="card-title-flower">${flower.Name}</h4>
            <p class="card-text-flower">${flower.Description}</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
            </div>
        </div>`;

        document.getElementById("flowerDisplay").insertAdjacentHTML('beforeend', display);
    });

    
    }
}
);
//getBtn.addEventListener('click', checkData);

/*<div class="card text-center" style="width: 22rem;">
      <img src="Products/Valentine (Cotton).jpg" class="card-img-top" alt="CottonV">
      <div class="card-body">
        <h4 class="card-title-flower">激励 (Gekirei)</h4>
        <p class="card-text-flower">Flowers Used: Cotton Flowers and Baby's Breath </p>
        <a href="#" class="btn btn-primary">Add to Cart</a>
      </div>
    </div>*/



/*`<div class="card-body">
        <h4 class="card-title-flower">${flower.Name}</h4>
        <p class="card-text-flower">Flowers Used: Cotton Flowers and Baby's Breath</p>
        <a href="#" class="btn btn-primary">Add to Cart</a>
      </div>`;*/