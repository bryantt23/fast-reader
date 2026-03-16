const textInput = document.querySelector("#text-input"), readerButton = document.querySelector("#reader-btn")

const delay = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

const displayText = async () => {
    const text = textInput.value
    const arr = text.split(" "), n = arr.length
    let i = 0
    while (i < n) {
        console.log(arr[i++])
        await delay(1000)
    }

}

readerButton.addEventListener("click", displayText)
