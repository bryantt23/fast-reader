const textInput = document.querySelector("#text-input"),
    readerButton = document.querySelector("#reader-btn"),
    currentWord = document.querySelector("#current-word"),
    speedInput = document.querySelector("#speed"),
    remainingInfo = document.querySelector("#remaining-info")

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

// Returns a formatted string showing words remaining and estimated time.
// Input:
//   totalWords   → total number of words in the text
//   currentIndex → current word position
//   wpm          → reading speed in words per minute
//
// Output example:
//   "432 words — 1 min(s) 28 sec(s) remaining"

const getRemainingReadingInfo = (totalWords, currentIndex, wpm) => {
    const wordsRemaining = totalWords - currentIndex
    const totalSeconds = Math.ceil((wordsRemaining / wpm) * 60)

    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${wordsRemaining} words and ${minutes} minute(s) and ${seconds} second(s) remaining`
}

const showRemainingReadingInfo = (totalWords, currentIndex, wpm) => {
    const remainingInfoText = getRemainingReadingInfo(totalWords, currentIndex, wpm)
    remainingInfo.textContent = remainingInfoText
}

const runHandler = () => {
    if (isRunning) {
        isRunning = false
        clearInterval(interval)
        readerButton.innerHTML = "Start"
        showRemainingReadingInfo(textArray.length, i, speedInput.value)
    }
    else {
        isRunning = true
        interval = setInterval(displayText, intervalTime)
        readerButton.innerHTML = "Pause"
        remainingInfo.textContent = ""
    }
}

textInput.addEventListener("input", e => {
    i = 0;
    isRunning = false;
    clearInterval(interval)
    const text = textInput.value
    textArray = text.split(/\s+/)
    showRemainingReadingInfo(textArray.length, i, speedInput.value)
})

speedInput.addEventListener("input", e => {
    const wpm = Number(e.target.value)
    intervalTime = wpmToDelay(wpm)
})

document.addEventListener('keyup', e => {
    if (e.code === 'Space') {
        runHandler()
    }
})

readerButton.addEventListener("click", runHandler)
