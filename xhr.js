
$(document).ready(function(){
//Airtable variables
const url = 'https://api.airtable.com/v0';
const baseid = 'appUlYCnhrd4aThSa';
const token = 'patAS4wp6LrawbyJe.0f7be9909c4a041087bdcacd6016a8ba379a4cd07e3676ad65bad3af2631ebd5';
const apiKey = 'keyNlBBq7AaqCM48y';

//Table Ids
//flower = 'tblb5xIIr65HVMKth';
//login = 'tbl9r9dgjLVJOTffq';



$("#login-submit").on("click", function() {
    if (sessionStorage.getItem("id")){
        alert("You are already logged in!")
    }
    else{

    //e.PreventDefault();
    let name = $("#getEmail").val();
    let password = $("#getPassword").val();

    console.log(name);
        
    checkLogin(name, password);
    }
})


const checkLogin = (name, password) =>{
    //Table = login 
    let table = 'tbl9r9dgjLVJOTffq';
    let userid = localStorage.id

    //Get login data
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
        
    };

    fetch(`${url}/${baseid}/${table}/?api_key=${apiKey}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result).records
            
            //Check if user in database
            for (var i = 0; i < data.length; i++) {

                console.log(data[i]);
                
                //Case sensitive****
                if (name == data[i].fields.Name && password == data[i].fields.Password){
                    //Check if the password is correct

                        console.log("Logged In");

                        sessionStorage.setItem('id', data[i].id)
                        alert("You have been logged in!")
                        
                    }

                else{
                    console.log("Incorrect")
                }

      }

        })
        .catch(error => console.log('error', error));


}

$("#register-submit").on("click", function() {

    let Newname = $("#getNewName").val();
    let Newemail = $("#getNewEmail").val();
    let Newpassword = $("#regPassword").val(); 
    let repPassword = $("#getregPassword").val();
    if (repPassword == Newpassword){
        console.log("Registered successfully");
    }
    else{
        console.log("Both passwords do not match");
    }

    registerUser(Newname, Newemail, Newpassword);
})

function registerUser(name, email, password){
    //Table = login 
    let table = 'tbl9r9dgjLVJOTffq';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify([{
                "Name" : name,
                "Email" : email,
                "Password" : password
          }])   
        
    };

    fetch(`${url}/${baseid}/${table}/?api_key=${apiKey}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));  
}


//Get flower
const getItems = (table, div) =>{

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
        
    };

    fetch(`${url}/${baseid}/${table}/?api_key=${apiKey}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result).records
            console.log(data)
            displayProducts(data, div)

        })
        .catch(error => console.log('error', error));
};

const tableIds = ['tblo8Jfq2LGvlSsrW', 'tblb5xIIr65HVMKth', 'tblyQ6O0YQquoSP3A'];
const divIds = ["specialDisplay", "flowerDisplay", "gardenDisplay"];


for (var i = 0; i<tableIds.length; i++){
    getItems(tableIds[i], divIds[i]);
}


function displayProducts(data, div){
    
    data.forEach(data => {
        
        const flower = data.fields;
        
        const display = `
        <div item class="card text-center flex" style="width: 22rem; background-color: #F9F9F9;">
            <img src="${flower.Photo[0].url}" class="card-img-top" alt="CottonV">

                <div class="card-body">
                <h4 class="card-title-flower">${flower.Name}</h4>
                <p class="card-text-flower">${flower.Description}</p>
                <h5 class="card-price-flower">$${flower.Price.toFixed(2)}</h5>
                <a data-id="${data.id}" data-table="${div}" class="btn btn-primary add" style="background-color: #D6E6F2; color: black;">Add to Cart</a>
                </div>

            <div data-id="${data.id}" hidden="hidden"></div>
        </div>`;
        

        //Put data into div
        document.getElementById(div).insertAdjacentHTML('beforeend', display);
        
    })
    
}

$("#specialDisplay, #flowerDisplay, #gardenDisplay").on("click", ".add", function (e) {

    if (!sessionStorage.getItem("id")){
        $("#login").modal("show")
    }
    else{
        e.preventDefault();
        //update our update form values
        let id = $(this).data("id");
        let tableName = $(this).data("table")

        console.log($(this).data("id"));

        for (var i = 0; i < divIds.length; i++){
            if (tableName == divIds[0]){
                var fromTable = tableIds[0]
            }
            else if (tableName == divIds[1]){
                var fromTable = tableIds[1]
            }
            else{
                var fromTable = tableIds[2]
            }
        }

        AddtoCart(id, fromTable)
        
        let table = 'tbl9r9dgjLVJOTffq'

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "get",
            headers: myHeaders,
            redirect: "follow",
            
        };

        fetch(`${url}/${baseid}/${table}/?api_key=${apiKey}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result).records
                console.log(data)

            })
            .catch(error => console.log('error', error));
    }
})


function AddtoCart(Productid, fromTable){
    var table = 'tbl9r9dgjLVJOTffq'

    //let loginTable = 'tbl9r9dgjLVJOTffq'
    let userid = 'recPsWz1AQv6r6xmH'
    var flowers = []
    var special = []
    var gardening = []

    console.log(flowers)

                        
    if (fromTable == 'tblb5xIIr65HVMKth'){
        flowers.push(Productid)
    }
    else if (fromTable == 'tblo8Jfq2LGvlSsrW'){
        special.push(Productid)

    }
    else {
        gardening.push(Productid)
    }
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "put",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify([{
            "id": userid,
            "fields":
            {
                "Special" : special,
                "Flowers" : flowers,
                "Gardening" : gardening
            }
          }])     
    };
//https://v1.nocodeapi.com/heheheha/airtable/BwYeNkanDmXJJuVy?tableName=Login
    
    fetch(`${url}/${baseid}/${table}/?api_key=${apiKey}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }


}); //End of startup
