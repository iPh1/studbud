//Create constants
const timer = document.getElementById("pomodoro-display");
const modeButtons = document.querySelector("[class=pomodoro-modes]");
const workButton = document.getElementById("pomodoro-work");
const shortButton = document.getElementById("pomodoro-short");
const longButton = document.getElementById("pomodoro-long");
const timerButton = document.getElementById("toggle");

//Initialise seconds
let seconds = 0;

//Create object for default values for pomodoro
const TIMER = {
    WORK: 25,
    SHORTBREAK: 5,
    LONGBREAK: 15,
};

//Function to change to different modes
function changeMode(e) {
    timerButton.classList.replace("fa-stop", "fa-play");
    timerButton.dataset.paused = "true";
  
    //Add active class to current mode
    for (let i = 0; i < 3; i++) {
      e.path[1].children[i].classList.remove("active");
    }
    e.target.classList.add("active");
  
    let mode = e.target.dataset.mode;
    timer.dataset.mode = mode;

    //Change starting timer values depending on which mode the user is in
    if (timer.dataset.mode === "work") {
      timer.innerHTML = `${TIMER.WORK}:00`;
    } else if (timer.dataset.mode === "short") {
      timer.innerHTML = `0${TIMER.SHORTBREAK}:00`;
    } else {
      timer.innerHTML = `${TIMER.LONGBREAK}:00`;
    }
  }

//Function to run pomodoro
function pomodoro () {

    //Toggle between different pomodoro modes & set duration
    function setTimer() {
        if(timer.dataset.mode === "work") {
            seconds = TIMER.WORK * 60;
        } else if (timer.dataset.mode === "short") {
            seconds = TIMER.SHORTBREAK * 60;
        } else {
            seconds = TIMER.LONGBREAK * 60;
        }
    }

    //Change button icon when clicked
    if(timerButton.classList.contains("fa-play")){
        timerButton.classList.replace("fa-play", "fa-stop");
        timerButton.dataset.paused = "false";

        //Run timer
        setTimer();

        interval = setInterval(() => {
            //Convert time remaining into minutes/seconds and add leading zeros
            let timeRemaining = ("0" + Math.floor(seconds / 60)).slice(-2) + ":" + ("0" + (seconds % 60)).slice(-2);
            timer.innerHTML = timeRemaining;

            //Clear timer display if user stops the timer or if the timer reaches 0
            if(timerButton.dataset.paused === "true" || seconds === 0) {
                clearInterval(interval);
            }

            //Timer counting down 1s
            seconds--;
        }, 1000);

    } else {
        timerButton.classList.replace("fa-stop", "fa-play");
        timerButton.dataset.paused = "true";
    }
}

//Event listeners
timerButton.addEventListener("click", pomodoro);
modeButtons.addEventListener("click", changeMode);


