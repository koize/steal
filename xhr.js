
$(document).ready(function(){
//Airtable variables
const url = 'https://api.airtable.com/v0';
const baseid = 'appUlYCnhrd4aThSa';
const token = 'patAS4wp6LrawbyJe.0f7be9909c4a041087bdcacd6016a8ba379a4cd07e3676ad65bad3af2631ebd5';
const apiKey = 'keyNlBBq7AaqCM48y';

//Table Ids
//flower = 'tblb5xIIr65HVMKth';
//login = 'tbl9r9dgjLVJOTffq';


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
const getItems = (table, div) =>{

    //Get flower data
    sendRequest('GET', `${url}/${baseid}/${table}?api_key=${apiKey}`)

    .then(responseData => {
        //Check if data is received
        //console.log(responseData);

        //Split data to become an array
        let data = responseData.records
        console.log(data)
        display(data, div)

    })

    .catch(error => {
        console.log(error)
    })
};

const tableIds = ["tblo8Jfq2LGvlSsrW", "tblb5xIIr65HVMKth", "tblyQ6O0YQquoSP3A"];
const divIds = ["specialDisplay", "flowerDisplay", "gardenDisplay"];

for (var i = 0; i<tableIds.length; i++){
    getItems(tableIds[i], divIds[i]);
}

function display(data, div){

    
    data.forEach(data => {
        
        const flower = data.fields;
        console.log(data.id);
        const display = `
        <div class="card text-center flex" style="width: 22rem;">
            <img src="${flower.Photo[0].url}" class="card-img-top" alt="CottonV">
            <div class="card-body">
            <h4 class="card-title-flower">${flower.Name}</h4>
            <p class="card-text-flower">${flower.Description}</p>
            <h5 class="card-price-flower">$${flower.Price.toFixed(2)}</h5>
            <a href="#" class="btn btn-primary">Add to Cart</a>
            </div>
            <div class="Id" hidden="hidden">${data.id}</div>
        </div>`;

        //Put data into div
        document.getElementById(div).insertAdjacentHTML('beforeend', display);
    });

}



}); //End of startup
