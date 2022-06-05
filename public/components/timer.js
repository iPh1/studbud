//Define time values
let seconds = 0;
let minutes = 0;
let hours = 0;

//Define display values
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

//Define interval to hold the setInterval() function
let interval = null;

//Define status of timer
let status = "stopped";

//Define DOMS and process function when onclick is called
document.getElementById("timer-start").onclick = startTimer;
document.getElementById("timer-stop").onclick = stopTimer;
document.getElementById("timer-reset").onclick = resetTimer;



//Function to determine when to incriment time values
function timer() {
    seconds ++;

    if(seconds / 60 === 1) {
        seconds = 0;
        minutes ++;

        if(minutes / 60 === 1) {
            minutes = 0;
            hours ++;
        }
    }

    //Concatonate display values to time values to show double-digits when under 10sec
    if(seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }

    if(minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }

    if(hours < 10) {
        displayHours = "0" + hours.toString();
    } else {
        displayHours = hours;
    }

    //Display updated time values
    document.getElementById("timer-display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

//Functions to start, stop and reset the timer

function startTimer() {
    if(status === "stopped"){
        interval = window.setInterval(timer, 1000);
        status = "started";
    }
}

function stopTimer() {
    if(status === "started"){
        window.clearInterval(interval);
        status = "stopped";
    }
}

function resetTimer () {
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;

    document.getElementById("timer-display").innerHTML = "00:00:00";
    status = "stopped"
}
