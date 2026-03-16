const textInput = document.querySelector("#text-input"),
    readerButton = document.querySelector("#reader-btn"),
    currentWord = document.querySelector("#current-word"),
    speedInput = document.querySelector("#speed")

// Converts reading speed from words per minute (WPM) to delay per word in milliseconds.
// Input:  wpm (number) → words read per minute (e.g., 300)
// Output: delay (number) → milliseconds between each word display (e.g., 200 ms)
const wpmToDelay = (wpm) => 60000 / wpm;

let i = 0, isRunning = false, interval = null, textArray, intervalTime = wpmToDelay(500)

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
        interval = setInterval(displayText, intervalTime)
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
    console.log('hiii')
    intervalTime = wpmToDelay(Number(e.target.value))
    console.log("🚀 ~ intervalTime:", intervalTime)
})

document.addEventListener('keyup', e => {
    if (e.code === 'Space') {
        runHandler()
    }
})

readerButton.addEventListener("click", runHandler)
