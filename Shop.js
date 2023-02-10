const url = 'https://api.airtable.com/v0';
const baseid = 'appUlYCnhrd4aThSa';
const token = 'patAS4wp6LrawbyJe.0f7be9909c4a041087bdcacd6016a8ba379a4cd07e3676ad65bad3af2631ebd5';
const apiKey = 'keyNlBBq7AaqCM48y';


let Logtable = "tbl9r9dgjLVJOTffq"
var userid = sessionStorage.getItem("id")
//Special then flower then garden
const tableIds = ['tblo8Jfq2LGvlSsrW', 'tblb5xIIr65HVMKth', 'tblyQ6O0YQquoSP3A'];


const getCart = (table) =>{

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
        
    };

    fetch(`${url}/${baseid}/${table}/${userid}/?api_key=${apiKey}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result)
            console.log(data)
            
            let Price = 0;

            if (data.fields.Special){
                data.fields.Special.forEach(flower => {
                  displayCart(tableIds[0], flower)
                  Price = Price + parseInt(sessionStorage.getItem("price"))
                  console.log(Price)
                  
                });                
            }
            if (data.fields.Flowers){
              data.fields.Flowers.forEach(flower => {

                displayCart(tableIds[1], flower)
                Price = Price + parseInt(sessionStorage.getItem("price"))
              });
            }
            if(data.fields.Gardening){
              data.fields.Gardening.forEach(flower => {

                displayCart(tableIds[2], flower)
                Price = Price + parseInt(sessionStorage.getItem("price"))
              });

            }

            console.log(Price)

            calcPrice(Price)

        })
        .catch(error => console.log('error', error));
};

getCart(Logtable)



function displayCart(table, id){


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
            console.log(id)
            
            data.forEach(data => {

                if(data.id == id){
        
                const flower = data.fields;
                
                const display = `
                <div class="d-flex align-items-center mb-5">
                <div class="flex-shrink-0">
                  <img src="${flower.Photo[0].url}" class="img-fluid" style="width: 150px;" alt="Generic placeholder image">
                </div>
                <div class="flex-grow-1 ms-3">
                  <a href="#!" id="removeItem" class="float-end text-black"><i class="fas fa-times"></i></a>
                  <h5 class="text-primary">${flower.Name}</h5>
                  <h6 style="color: #9e9e9e;">${flower.Description}</h6>
        
                  <div class="d-flex align-items-center">
                    <p class="fw-bold mb-0 me-5 pe-3">$${flower.Price.toFixed(2)}</p>
                  </div>
                </div>
              </div>`;

                //Put data into div
                document.getElementById("cart").insertAdjacentHTML('afterend', display);
                //console.log(flower.Price)
                
                sessionStorage.setItem("price", flower.Price);
                }


            })

            
        })
        .catch(error => console.log('error', error));
}

function calcPrice(price){
  let table = 'tbl9r9dgjLVJOTffq'


  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
        
    };

    fetch(`${url}/${baseid}/${table}/${userid}/?api_key=${apiKey}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let data = JSON.parse(result)

        if(data.fields.Discount){

          var disc = data.fields.Code[0]

          var discount = price * disc
          price = price - discount

          const CalTotal = `
          <h5 class="fw-bold mb-0">$${price.toFixed(2)}</h5>
          `;
          const disTotal = `
          <h5 class="fw-bold mb-0">$${discount.toFixed(2)}</h5>
          `;
        document.getElementById("total").insertAdjacentHTML('beforeend', CalTotal);
        document.getElementById("discount").insertAdjacentHTML('beforeend', disTotal);
        

        }

    else{
      const CalTotal = `
          <h5 class="fw-bold mb-0">$${price.toFixed(2)}</h5>`;

          document.getElementById("total").insertAdjacentHTML('beforeend', CalTotal);

    }

    sessionStorage.removeItem("price")
    })
}