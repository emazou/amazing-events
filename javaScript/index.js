let form = document.forms //htmlcollection
let cardsContainer = document.getElementById("cardContainerIndex")
let dataEvents = data.events
let submit = document.querySelector('input[type="submit"]')
let inputText = document.querySelector('input[type="search"]')
function categories(arrayEvents) {
    let arrayCategories = []
    arrayEvents.forEach(event => {
        if (!arrayCategories.includes(event.category)) {
            arrayCategories.push(event.category)
        }
    })
    arrayCategories.forEach(category => {
        let fieldset = document.createElement('fieldset')
        fieldset.className = 'px-2 rounded-4'
        fieldset.innerHTML = `<input type="checkbox" name="${category}" class="categories" value="${category}" id="${category}">
        <label for="${category}">${category}</label>`
        form[0].appendChild(fieldset)
    })
}
categories(dataEvents)
createCards(data.events)

function searchText(textoABuscar,arrayEventosDondeVoyABuscar){
    let arrayEventosFiltradosSearch = arrayEventosDondeVoyABuscar.filter(evento => evento.name.toLowerCase().includes(textoABuscar.toLowerCase()))
    return arrayEventosFiltradosSearch
}
function filtrarCategoriasCheckeadas(arrayEventos){
    let nodeListCheckbox = document.querySelectorAll('input[type="checkbox"]')
    let checkboxes = Array.from(nodeListCheckbox).filter(checkbox => checkbox.checked).map(check => check.value)
    if(checkboxes.length>0){
        let arrayEventosFiltradosPorCategorias = arrayEventos.filter(evento => checkboxes.includes(evento.category))
        return arrayEventosFiltradosPorCategorias
    }
    return arrayEventos
}
form[0].addEventListener('change',()=>{
    createCards(filtrarCategoriasCheckeadas(searchText(inputText.value,dataEvents)))
})
submit.addEventListener('click',(e)=>{
    e.preventDefault()
    createCards(filtrarCategoriasCheckeadas(searchText(inputText.value,dataEvents)))
})
inputText.addEventListener('keyup',()=>{
    createCards(filtrarCategoriasCheckeadas(searchText(inputText.value,dataEvents)))
})
function message(){
    let message = document.createElement('p')
        message.textContent = "Event not found, adjust search filter";
        message.className = "message";
        cardsContainer.appendChild(message)
}
function createCards(arrayEventsFiltereds) {
    cardsContainer.innerHTML = ""
    arrayEventsFiltereds.forEach(element => {
        let card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `<img src="${element.image}" class="card-img-personal w-100 p-2" alt="Image event">
                        <div class="card-body d-flex flex-column justify-content-between pt-1 ">
                        <div>
                            <h5 class="card-title text-center text-light pb-0">${element.name}</h5>
                            <p class="card-text my-0">${element.description}</p>
                        </div>
                        <div class="d-flex justify-content-between justify-content-center">
                            <p class="fs-5 text-white fw-bold"> $${element.price}</p>
                            <a href="./details.html?id=${element._id}" class="btn text-light bgb">Read more &rarr;</a>
                        </div>
                    </div>`
        cardsContainer.appendChild(card)
    })
    if(arrayEventsFiltereds.length === 0 ){
        message()
    }
}