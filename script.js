const textInput = document.querySelector("#text-input"),
    readerButton = document.querySelector("#reader-btn"),
    currentWord = document.querySelector("#current-word"),
    speedInput = document.querySelector("#speed"),
    remainingInfo = document.querySelector("#remaining-info")

// Converts reading speed from words per minute (WPM) to delay per word in milliseconds.
// Input:  wpm (number) → words read per minute (e.g., 300)
// Output: delay (number) → milliseconds between each word display (e.g., 200 ms)
const wpmToDelay = (wpm) => 60000 / wpm;

let i = 0,
    isRunning = false,
    interval = null,
    textArray,
    wpm = localStorage.getItem('wpm') || 500,
    intervalTime = wpmToDelay(wpm)

const getHTML = (text) => {
    const middle = Math.floor((text.length - 1) / 2)
    const leftText = text.substring(0, middle), middleText = text.substring(middle, middle + 1), rightText = text.substring(middle + 1)
    return `${leftText}<span class="highlighted">${middleText}</span>${rightText}`
}

const displayText = async () => {
    currentWord.innerHTML = getHTML(textArray[i++])
    if (i === textArray.length) {
        clearInterval(interval)
        isRunning = false
        i = 0;
        readerButton.innerHTML = "Start"
        showRemainingReadingInfo(textArray.length, 0, wpm, true)
        textInput.style.visibility = "visible"
    }
}

// Returns remaining words + estimated reading time
const getRemainingReadingInfo = (totalWords, currentIndex, wpm, finishedReading) => {
    const wordsRemaining = totalWords - currentIndex
    const totalSeconds = Math.ceil((wordsRemaining / wpm) * 60)

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor(totalSeconds / 60) % 60
    const seconds = totalSeconds % 60

    return `${wordsRemaining} words and ${hours} hour(s) and ${minutes} minute(s) and ${seconds} second(s) ${finishedReading ? "read" : "remaining"}`
}

const showRemainingReadingInfo = (totalWords, currentIndex, wpm, finishedReading) => {
    const remainingInfoText = getRemainingReadingInfo(totalWords, currentIndex, wpm, finishedReading)
    remainingInfo.textContent = remainingInfoText
}

function enterFullScreen() {
    if (!document.fullscreenElement) {
        // Request fullscreen for the entire page
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        }
        else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen();
        }
    }
}

const runHandler = () => {
    enterFullScreen()
    if (isRunning) {
        isRunning = false
        readerButton.innerHTML = "Start"
        clearInterval(interval)
        showRemainingReadingInfo(textArray.length, i, wpm, false)
        textInput.style.visibility = "visible"
        document.body.style.cursor = "default"
    }
    else if (textArray) {
        isRunning = true
        interval = setInterval(displayText, intervalTime)
        readerButton.innerHTML = "Pause"
        remainingInfo.textContent = ""
        textInput.style.visibility = "hidden"
        document.body.style.cursor = "none"
    }
}

textInput.addEventListener("input", e => {
    i = 0;
    isRunning = false;
    readerButton.innerHTML = "Start"
    clearInterval(interval)
    const text = textInput.value.trim()
    const PAUSE_PUNCTUATION = ".,?!;:"
    const textArrayTemp = text.split(/\s+/)
    textArray = []
    for (const word of textArrayTemp) {
        textArray.push(word)
        if (PAUSE_PUNCTUATION.indexOf(word[word.length - 1]) > -1) {
            textArray.push(word)
        }
    }
    showRemainingReadingInfo(textArray.length, i, wpm, false)
})

speedInput.addEventListener("input", e => {
    const wpmInput = Number(e.target.value)
    intervalTime = wpmToDelay(wpmInput)
    localStorage.setItem('wpm', wpmInput)
    wpm = wpmInput
    showRemainingReadingInfo(textArray.length, i, wpm, false)
})

document.addEventListener('keyup', e => {
    if (e.code === 'Space') {
        runHandler()
    }
    if (e.code === 'ArrowLeft') {
        i = Math.max(0, i - 10)
    }
})

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
        return
    }

    textInput.focus()
    textInput.select()
})

window.onload = () => {
    speedInput.value = wpm
}

readerButton.addEventListener("click", runHandler)
