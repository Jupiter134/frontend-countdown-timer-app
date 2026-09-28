//setInterval -> start repeating action
//interval -> ID of that repeating action
//clearInterval(interval) -> stop repeating action
//interval = null -> reset state to start again safetly
//otherwise 'start' pressed multiple times, intervals stack, 
//timer can speed up


//get elements from html by id
const reveal = document.getElementById("timer"); 
const container = document.getElementById("container");

const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");

/*reveal timer and buttons when timer button clicked*/
reveal.addEventListener("click", () =>
{
    container.classList.toggle("hidden");
});

/*timer functionality*/ 
let time = 60;
let interval = null;
let isPaused = false;

function updateDisplay()
{
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; 
    //change timer font to red with rounded black border 
    // when 15 seconds or less left on timer
    if(time <= 15)
    {
        timeDisplay.classList.add("warning");
    }
    else
    {
        timeDisplay.classList.remove("warning");
    }
}

pauseBtn.disabled = true;
stopBtn.disabled = true;

//start button
startBtn.onclick = () =>
{
    //check if timer is already running,
    //return if it is -> does nothing
    if(interval) return;

    //otherwise, set interval
    interval = setInterval(() =>
    {
        //if it's not paused, decrease timer and update display
        if(!isPaused)
        {
            time--;
            updateDisplay();

            //when timer stops, alert to take a short break
            if(time==0)
            {
                clearInterval(interval);
                interval = null;
                alert("Take a short break");
            }
        }
    }, 1000);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
}

//pause button
pauseBtn.onclick = () => 
{
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
};

//stop button
//stop timer and reset everything to default
stopBtn.onclick = () =>
{
    clearInterval(interval);
    interval = null;

    time = 60;
    updateDisplay();

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;

    pauseBtn.textContent = "Pause";
    isPaused = false;
}