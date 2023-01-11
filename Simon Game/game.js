var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level1 =0;
$(document).on('keydown' , function () {
    if(!started){
        $("#level-title").text("Level  "+level1);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatedPress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});
function checkAnswer(cureenLevel) {
    if(userClickedPattern[cureenLevel]===gamePattern[cureenLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else
    {
        playSound("wrong");
        $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");

    }, 200);
    $("#level-title").text("Game Over , Press Any Key to Restart");
    startOver();

    }
}
function animatedPress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");

    }, 100);
}
function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function nextSequence() {
    userClickedPattern=[];
    level1++;        
    $("#level-title").text("Level  "+level1);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function startOver() {
    level1=0;
    gamePattern=[];
    started = false;
}
