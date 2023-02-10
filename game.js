const url = 'https://api.airtable.com/v0';
const baseid = 'appUlYCnhrd4aThSa';
const token = 'patAS4wp6LrawbyJe.0f7be9909c4a041087bdcacd6016a8ba379a4cd07e3676ad65bad3af2631ebd5';
const apiKey = 'keyNlBBq7AaqCM48y';
const userid = sessionStorage.getItem("id");

calculateDist();
Codes();

function Codes(){


let loginTable = 'tbl9r9dgjLVJOTffq'

console.log(userid)


var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "get",
            headers: myHeaders,
            redirect: "follow", 
        };
        fetch(`${url}/${baseid}/${loginTable}/${userid}?api_key=${apiKey}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result)

                console.log(data)

                if(data.fields.Discount[0]){
                    console.log("yes")
                    display = `
                    <div>
                    <h3>Reedemable discount: </h3>
                    <p>${data.fields.DiscName}
                    </div>`

                    document.getElementById("codes").insertAdjacentHTML('beforeend', display);
                }

            })
            .catch(error => console.log('error', error));
        }


function iShoot(enemy){

    //alert("Boom!")
    enemy.classList.add("dead")

    if (!livingEnemies().length)
    {
        alert("You win!")

        Reward();
        //window.location.reload();
    }
}

function enemyAttacks(enemy){

    enemy.classList.add("showing")
    setTimeout( ()=>{
        enemyShoots(enemy);
    }, 2000)

    setTimeout( ()=> {
        enemy.classList.remove("showing");
    }, 3000)
}

function enemyShoots(enemy){


    if (!enemy.classList.contains("dead"))
    {
        enemy.classList.add("shooting")
        updateHealthPoints(healthPoints - 20)


        setTimeout( ()=>{
            enemy.classList.remove("shooting")
        }, 200)
    }
}

function livingEnemies() {
    return document.querySelectorAll(".enemy:not(.dead)");
}

function randomEnemyAttacks(){


    var randomEnemyNo = Math.random() * livingEnemies().length;
    randomEnemyNo = Math.floor(randomEnemyNo)
    var enemy = livingEnemies() [randomEnemyNo];

    var randomDelay = Math.random() * 2000 + 1000

    setTimeout( ()=>{
        enemyAttacks(enemy);
        randomEnemyAttacks();
    }, randomDelay)

    
}

var healthPoints = 100

function updateHealthPoints(points){

    healthPoints = points;
    var healthBar = document.querySelector("#healthBar");

    healthBar.style.width = points + "%"
    if (healthPoints < 1){

        alert("game over!")
        window.location.reload();

    }

}

function NewGame(){

    console.log(sessionStorage.getItem("id"))

    if (!sessionStorage.getItem("id")){
        $("#login").modal("show")
    }
    else{
        healthPoints = 100
        updateHealthPoints(healthPoints)

        randomEnemyAttacks();
        document.querySelector(".button").style.display= "none";
        document.querySelector("#healthBar").style.display= "block";
    }
}

function calculateDist(){

    var frameWidth = document.getElementById("gameFrame").offsetWidth;
    console.log(frameWidth)

    var section = frameWidth/10
    console.log(section)

    document.getElementById("enemy1").style.left=`${section}px`
    document.getElementById("enemy2").style.left=`${3 * section}px`
    document.getElementById("enemy3").style.left=`${5 * section}px`
    document.getElementById("enemy4").style.left=`${7 * section}px`
    document.getElementById("enemy5").style.left=`${9 * section}px`
}


function Reward(){
    number = Math.floor(Math.random() * 100);
    if(number == 1){
        alert("You did not gain a voucher!")
    }

    else{
        alert("Congratulations, you have obtained a discount voucher!")
        //Rewards table
        let reTable = 'tbl8jsXKd32jBngLA'

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "get",
            headers: myHeaders,
            redirect: "follow", 

        };
        fetch(`${url}/${baseid}/${reTable}/?api_key=${apiKey}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result).records
                //console.log(data)
                var discount = Math.floor(Math.random() * 2)
                //console.log(data[discount].id)

                var codes = data[discount].Discount

                updateLogin(data[discount])
            })
            .catch(error => console.log('error', error));
        }
}

function updateLogin(code){

    //let loginTable = 'tbl9r9dgjLVJOTffq'


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "put",
            headers: myHeaders,
            redirect: "follow", 
            body: JSON.stringify([{
                "id": userid,
                "fields": {
                    "Discount" : [code.id]
                }
            }])

        };
        fetch(`https://v1.nocodeapi.com/heheheha/airtable/BwYeNkanDmXJJuVy?tableName=Login`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result).records
            })
            .catch(error => console.log('error', error));
}

