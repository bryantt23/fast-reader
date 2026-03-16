const textInput = document.querySelector("#text-input"),
    readerButton = document.querySelector("#reader-btn"),
    currentWord = document.querySelector("#current-word"),
    speedInput = document.querySelector("#speed")

let i = 0, isRunning = false, interval = null, textArray
const INTERVAL_TIME = 500

const displayText = async () => {
    currentWord.innerHTML = textArray[i++]
    if (i === textArray.length) {
        clearInterval(interval)
        isRunning = false
        i = 0;
        readerButton.innerHTML = "Start"
    }
}

const runHandler = () => {
    if (isRunning) {
        isRunning = false
        clearInterval(interval)
        readerButton.innerHTML = "Start"
    }
    else {
        isRunning = true
        interval = setInterval(displayText, INTERVAL_TIME)
        readerButton.innerHTML = "Pause"
    }
}

textInput.addEventListener("input", e => {
    i = 0;
    isRunning = false;
    clearInterval(interval)
    const text = textInput.value
    textArray = text.split(/\s+/)
})

speedInput.addEventListener("input", e => {
    console.log(e.target.value)
})

readerButton.addEventListener("click", runHandler)
