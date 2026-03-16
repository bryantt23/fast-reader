const textInput = document.querySelector("#text-input"), readerButton = document.querySelector("#reader-btn")
let i = 0, isRunning = false, interval = null, textArray
const INTERVAL_TIME = 500

const delay = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, INTERVAL_TIME)
    })
}

const displayText = async () => {
    console.log(textArray[i++])
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

readerButton.addEventListener("click", runHandler)
