// alert("Hello");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        started = true;
        nextSequence();
    }
})

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];
    
    level++;
    $("#level-title").text("Level " + level);
    
    // console.log(randomChosenColour);
    
    gamePattern.push(randomChosenColour);
    
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

}

function playSound(colorButton){
    var audio = new Audio("sounds/" + colorButton +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");

    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("right");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }else{
        // console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();

    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}


$(".btn").click( function(event){
    var buttonId = event.target.id;
    // console.log(event.target.id);
    var userChosenColour = buttonId;

    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(buttonId);
    animatePress(buttonId);

    checkAnswer(userClickedPattern.length - 1);
});




