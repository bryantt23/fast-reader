const text = "hello world this is a speed reader test"

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

displayText(text)