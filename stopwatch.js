const timerDisplay = document.getElementById("timer-display");
const timerStatus = document.getElementById("timer-status");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

let seconds = 0;
let timerId = null;

function updateDisplay() {
    timerDisplay.textContent = seconds + " seconds";
    startButton.disabled = timerId !== null || seconds >= 30;
    stopButton.disabled = timerId === null;
}

startButton.addEventListener("click", function () {
    if (timerId !== null || seconds >= 30) {
        return;
    }

    timerStatus.textContent = "Running";

    timerId = setInterval(function () {
        seconds += 3;

        if (seconds >= 30) {
            clearInterval(timerId);
            timerId = null;
            timerStatus.textContent = "Finished at 30 seconds. Reset to start again.";
        }

        updateDisplay();
    }, 3000);

    updateDisplay();
});

stopButton.addEventListener("click", function () {
    if (timerId === null) {
        return;
    }

    clearInterval(timerId);
    timerId = null;
    timerStatus.textContent = "Paused";
    updateDisplay();
});

resetButton.addEventListener("click", function () {
    clearInterval(timerId);
    timerId = null;
    seconds = 0;
    timerStatus.textContent = "Ready";
    updateDisplay();
});
