var runners = document.getElementsByClassName("runner");
var donuts = document.getElementsByClassName("donut");
var tracks = document.getElementsByClassName("track");

var vampire = 0;
var robot = 0;
var skull = 0;
var cowboy = 0;

function randomNumber() {
    return Math.floor(Math.random() * 101);
}

function winnerCheck() {
    for (var i = 0; i < runners.length; i++) {
        if ((parseInt(runners[i].style.left) + runners[i].offsetWidth) >= donuts[i].offsetLeft) {
            console.log(runners[i].innerText, " just won!");
            document.removeEventListener('keydown', game);
        }
    }
}

function game(e) {
    if (e.keyCode === 32) {
        vampire += randomNumber();
        robot += randomNumber();
        skull += randomNumber();
        cowboy += randomNumber();
        
        runners[0].style.left = vampire + "px";
        runners[1].style.left = robot + "px";
        runners[2].style.left = skull + "px";
        runners[3].style.left = cowboy + "px";
        
        winnerCheck();
    }
}

function randomColor() {
    return Math.floor(Math.random() * 256);
}

for (var i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('click', function(e) {
        if (e.target.classList.value === 'track') {
            e.target.style.backgroundColor = "rgb(" + randomColor() + ", " + randomColor() + ", " + randomColor() + ")";
        }
    });
}

document.addEventListener("keydown", game);