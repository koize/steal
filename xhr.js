
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
        xhr.setRequestHeader("Content-Type", "application-json");
        xhr.responseType = "json";

        xhr.onload = () => {
            resolve(xhr.response)
        }
        xhr.onerror = () =>{
            reject('Something went wrong!')
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
    let userid = localStorage.id

    //Get login data
    sendRequest('GET', `${url}/${baseid}/${table}/?api_key=${apiKey}`)

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

                    localStorage.setItem('id', data[i].id)
                    
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
        console.log(responseData)
        display(data, div)

    })

    .catch(error => {
        console.log(error)
    })
};

const tableIds = ["tblo8Jfq2LGvlSsrW", "tblb5xIIr65HVMKth", "tblyQ6O0YQquoSP3A"];
const divIds = ["specialDisplay", "flowerDisplay", "gardenDisplay"];

/*
for (var i = 0; i<tableIds.length; i++){
    searchBar(tableIds[i]);
}*/


for (var i = 0; i<tableIds.length; i++){
    getItems(tableIds[i], divIds[i]);
}

function display(data, div){
    
    data.forEach(data => {
        
        const flower = data.fields;
        
        const display = `
        <div item class="card text-center flex" style="width: 22rem;">
            <img src="${flower.Photo[0].url}" class="card-img-top" alt="CottonV">

                <div class="card-body">
                <h4 class="card-title-flower">${flower.Name}</h4>
                <p class="card-text-flower">${flower.Description}</p>
                <h5 class="card-price-flower">$${flower.Price.toFixed(2)}</h5>
                <a data-id="${data.id}" class="btn btn-primary add">Add to Cart</a>
                </div>

            <div data-id="${data.id}" hidden="hidden"></div>
        </div>`;
        

        //Put data into div
        document.getElementById(div).insertAdjacentHTML('beforeend', display);
        
    })
    
}

async function isLoggedIn () {
    const token = store.get('token')
    if (!token) return false
  }


$("#specialDisplay, #flowerDisplay, #gardenDisplay").on("click", ".add", function (e) {

    e.preventDefault();
    //update our update form values
    let id = $(this).data("id");

    console.log($(this).data("id"));

    for (var i = 0; i < tableIds.length; i++){
        sendRequest('GET', `${url}/${baseid}/${tableIds[i]}?api_key=${apiKey}`)
        .then(responseData => {

        let products = responseData.records;

        //console.log(tableIds[i])
        
        products.forEach(products =>{
            if (id == products.id){

                var fromTable = tableIds[i - 1]
                console.log(fromTable)

                AddtoCart(id, fromTable)
            }

        })
    })
    }

    

    let table = 'tbl9r9dgjLVJOTffq'

    sendRequest('GET', `${url}/${baseid}/${table}?api_key=${apiKey}`)
    .then(responseData => {
        let products = responseData.records;
        console.log(products)
    })

})

function AddtoCart(Productid, fromTable){

    let table = 'tbl9r9dgjLVJOTffq'
    let userid = 'recSwm9wIkwvqL8dU'

    if (fromTable == 'tblo8Jfq2LGvlSsrW'){
        let tableName = "Product : Special Offers"
    }
    else if (fromTable == 'tblb5xIIr65HVMKth'){
        let tableName = "Products : Flowers"
    }
    else if (fromTable == "tblyQ6O0YQquoSP3A"){
        let tableName = "Products : Gardening"
    }


    sendRequest('PUT', `${url}/${baseid}/${table}/${userid}?api_key=${apiKey}`,
    {
            "id":"recSwm9wIkwvqL8dU",
            "createdTime":"2023-01-28T16:05:41.000Z",
            "fields":{
                "Password":"123",
                "Email":"b@gmail.com",
                "Name":"Pp",
                "Products : Flowers":["rec0wcoIpYEMdsdE8"],
                "Products : Gardening":["recHF4yXVUJUTZTdR"],
                "Product : Special Offers":["recDV5qmmV4cpKCME"]
            }
    
    })



    .then(responseData =>(
        console.log(responseData)
    ))

    .catch(error =>(
        console.log(error)
    ))


}

/**/

}); //End of startup


