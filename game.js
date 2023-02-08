const start = Date.now();

function iShoot(enemy){

    //alert("Boom!")
    enemy.classList.add("dead")

    if (!livingEnemies().length)
    {
        alert("You win")
        const end = Date.now();
        var time = start - end

        checkReward(time);

        document.querySelector("#healthBar").style.display= "none";
        document.querySelector(".button").style.display= "block";
    }
}

function enemyAttacks(enemy){

    enemy.classList.add("showing")
    setTimeout( ()=>{
        enemyShoots(enemy);
    }, 1000)

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
        }, 1000)
    }
}

function livingEnemies() {
    return document.querySelectorAll(".enemy:not(.dead)");
}

function randomEnemyAttacks(){
    if (healthPoints < 1){
        return;
    }

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
        document.querySelector("#healthBar").style.display= "none";
        document.querySelector(".button").style.display= "block";

    }

}

function NewGame(){

    if (!livingEnemies().length)
    {
        const elements = document.querySelectorAll('*');

        elements.forEach((element) => {
            element.classList.remove('dead');
        });
    }

    healthPoints = 100
    updateHealthPoints(healthPoints)

    randomEnemyAttacks();
    document.querySelector(".button").style.display= "none";
    document.querySelector("#healthBar").style.display= "block";
}

function checkReward(time){

}

 