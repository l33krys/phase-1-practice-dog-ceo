console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    addListener()
    //const optionA = document.querySelector("[value='a']");
// const select = document.querySelector("select") 
// select.addEventListener("change", (e) => console.log(e.target.value)  
// 		) 
})

initialize()

function initialize() {
    getDogData()
    getDogType()
    
}

function getDogData() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
    .then(r => r.json())
    // Data returned is an array buried in a key
    // Go one level down before running .forEach()
    .then(dogData => dogData.message.forEach(renderDogs))
    //.then(dogData => console.log(dogData))

}

function renderDogs(dog) {
    const dogContainer = document.querySelector('#dog-image-container')
    const img = document.createElement('img')
    img.src = dog

    dogContainer.append(img)
    
}

function getDogType() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
    .then(r => r.json())
    //.then(dogType => console.log(dogType))
    //.then(dogType => renderBreed(dogType))
    .then(dogType => Object.keys(dogType.message).forEach(renderBreed))
}


function renderBreed(breed) {
    const breedContainer = document.querySelector('#dog-breeds')
    // const breedArr = Object.keys(breed.message)
    // breedArr.forEach(breed => {
        let li = document.createElement('li')
        li.innerText = breed
        li.id = breed
        breedContainer.append(li)
        document.querySelector(`li#${breed}`).addEventListener('click', (e) => document.querySelector(`li#${breed}`).style.color = 'blue')
        }
    // })
    
// Listener on filter
function addListener() {
    const select = document.querySelector("select") 
    select.addEventListener("change", (e) => {
        const selection = e.target.value
        getFilterDogType(selection)
        document.querySelector('#dog-breeds').innerHTML = "" 
})
}

// Fetch dog data for filtering
function getFilterDogType(selection) {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
    .then(r => r.json())
    .then(dogType => {
        //Object.keys(dogType.message).forEach(filter)
        Object.keys(dogType.message).forEach((breed) => filter(breed, selection))

    })
}

// Use selection from add listener
// Variable kept to filtering below
function filter(breed, selection) {
    const breedContainer = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    li.innerText = breed
    li.id = breed
    if (breed[0] === selection) {
        breedContainer.append(li)
    }
}

