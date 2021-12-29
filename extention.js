let categoriesObj = {
    0: [],
    1: [],
    2: [],
    3: [],
}

let title = document.getElementById("title")
let titlesArray = ["Random", "Tutorials", "Manga", "Movies"]

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const rightBtn = document.getElementById("right-btn")
const leftBtn = document.getElementById("left-btn")
const ulEl = document.getElementById("ul-el")
const removeBtn = document.getElementById("remove-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("Random"))
const tutorialsFromLocalStorage = JSON.parse(localStorage.getItem("Tutorials"))
const mangaFromLocalStorage = JSON.parse(localStorage.getItem("Manga"))
const moviesFromLocalStorage = JSON.parse(localStorage.getItem("Movies"))

if (localStorage.change === undefined){
    localStorage.change = 0
}

if (leadsFromLocalStorage) {
    categoriesObj[0] = leadsFromLocalStorage
}
if (tutorialsFromLocalStorage) {
    categoriesObj[1] = tutorialsFromLocalStorage
}
if (mangaFromLocalStorage) {
    categoriesObj[2] = mangaFromLocalStorage
}
if (moviesFromLocalStorage) {
    categoriesObj[3] = moviesFromLocalStorage
}

render(localStorage.change)

function render(index) {
    title.textContent = titlesArray[index]
    let listItems = ''
    let categoriesObjElement = categoriesObj[index];
    for (let i = 0; i < categoriesObjElement.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${categoriesObjElement[i]}'>${categoriesObjElement[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        categoriesObj[localStorage.change].push(tabs[0].url)
        localStorage.setItem(titlesArray[localStorage.change], JSON.stringify(categoriesObj[localStorage.change]))
        render(localStorage.change)
    })
})
inputBtn.addEventListener("click", function () {
    categoriesObj[localStorage.change].push(inputEl.value)
    localStorage.setItem(titlesArray[localStorage], JSON.stringify(categoriesObj[localStorage.change]))
    render(localStorage.change)
    inputEl.value = ""
})
deleteBtn.addEventListener("dblclick", function () {
    localStorage.removeItem(titlesArray[localStorage.change])
    categoriesObj[localStorage.change] = []
    render(localStorage.change)
})
rightBtn.addEventListener("click", function () {
    if (parseInt(localStorage.change) === 3) {
        localStorage.change = 0
    } else {
        localStorage.change++
    }
    render(localStorage.change)
})
leftBtn.addEventListener("click", function () {
    if (parseInt(localStorage.change) === 0) {
        localStorage.change = 3
    } else {
        localStorage.change--
    }
    render(localStorage.change)
})

function remove(index){
    categoriesObj[localStorage.change].splice(index, 1)
    render(localStorage.change)
}

