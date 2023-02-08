
calculateDist();

function iShoot(enemy){

    //alert("Boom!")
    enemy.classList.add("dead")

    if (!livingEnemies().length)
    {
        alert("You win")
        var time = start - end

        window.location.reload();
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

    healthPoints = 100
    updateHealthPoints(healthPoints)

    randomEnemyAttacks();
    document.querySelector(".button").style.display= "none";
    document.querySelector("#healthBar").style.display= "block";
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


 