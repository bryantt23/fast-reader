const textInput = document.querySelector("#text-input")

const delay = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

const displayText = async (text) => {
    const arr = text.split(" "), n = arr.length
    let i = 0
    while (i < n) {
        console.log(arr[i++])
        await delay(1000)
    }

}

window.onload = () => {
    displayText(textInput.value)
}
