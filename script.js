let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

// Function to format time
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milliseconds = String(ms % 1000).padStart(3, "0").slice(0, 2); // Display first 2 digits of milliseconds
    return `${minutes}:${seconds}:${milliseconds}`;
}

// Function to update display
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Start or pause the stopwatch
startPauseBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = "Start";
    } else {
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startPauseBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
});

// Reset the stopwatch
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    updateDisplay();
    startPauseBtn.textContent = "Start";
    lapsList.innerHTML = ""; // Clear lap times
});

// Record a lap
lapBtn.addEventListener("click", () => {
    if (isRunning) {
        const lapTime = document.createElement("li");
        lapTime.textContent = formatTime(elapsedTime);
        
        // Insert new lap at the top of the list
        lapsList.insertBefore(lapTime, lapsList.firstChild);

        // If there are more than 5 laps, remove the oldest one (last item in the list)
        if (lapsList.children.length > 5) {
            lapsList.removeChild(lapsList.lastChild);
        }

        // Scroll to the top after a new lap
        lapsList.scrollTop = 0;
    }
});
