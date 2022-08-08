let form = document.forms
let cardsContainer = document.getElementById("cardContainerIndex")
let url = 'https://amazing-events.herokuapp.com/api/events'
let submit = document.querySelector('input[type="submit"]')
let inputText = document.querySelector('input[type="search"]')
async function fetchData(urlApi){
    try{
        let response = await fetch(urlApi)
        let data = await response.json()
        let dataEvents = data.events
        categories(dataEvents)
        createCards(dataEvents)
        filters(dataEvents)
    }catch(err){
        console.log(err)
    }
}
fetchData(url)
function categories(arrayEvents) {
    let checkboxescontainer = document.querySelector("#cbc")
    let arrayCategories = []
    arrayEvents.forEach(event => {
        if (!arrayCategories.includes(event.category)) {
            arrayCategories.push(event.category)
        }
    })
    arrayCategories.forEach(category => {
        let fieldset = document.createElement('fieldset')
        fieldset.className = 'px-2 rounded-4'
        fieldset.innerHTML = `<input type="checkbox" name="${category}" class="categories check" value="${category}" id="${category}">
        <label class="label" for="${category}">${category}</label>`
        checkboxescontainer.appendChild(fieldset)
    })
}
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
function filters(events){
    form[0].addEventListener('change',()=>{
        createCards(filtrarCategoriasCheckeadas(searchText(inputText.value,events)))
    })
    submit.addEventListener('click',(e)=>{
        e.preventDefault()
        createCards(filtrarCategoriasCheckeadas(searchText(inputText.value,events)))
    })
    inputText.addEventListener('keyup',()=>{
        createCards(filtrarCategoriasCheckeadas(searchText(inputText.value,events)))
    })
}

function message(){
    let message = document.createElement('p')
        message.textContent = "Event not found, adjust search filter";
        message.className = "message";
    let imgSearch = document.createElement('img')
        imgSearch.src = "https://i.ibb.co/c197gp5/searching.png"
        imgSearch.className = "img-search"
        cardsContainer.append(message,imgSearch)
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