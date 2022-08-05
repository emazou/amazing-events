// location.search  devuelve la parte de consulta de una URL, incluido el signo de interrogación (?).
// new URLSearchParams la interfaz URLSearchParams define métodos útiles para trabajar con los parámetros de búsqueda de una URL.
//El operador new permite a los desarrolladores crear una instancia de un tipo de objeto definido por el usuario o de uno de los 
//tipos de objeto integrados que tiene un función constructora
const params = new URLSearchParams(location.search)  
const id = parseInt(params.get('id')) // me da el id y lo paso a un entero ya que nuestra data maneja el id con datos de tipo numero
let detailEvent = (data.events).find(event => event._id === id )
let cardDetail = document.querySelector('.card-details')
cardDetail.innerHTML =`<img src="${detailEvent.image}" class="card-img-personal-details p-2" alt="Card" />
<div class="card-body-details p-3 d-flex flex-column">
    <h5 class="card-title text-center text-light">${detailEvent.name}</h5>
    <p class="text-end my-2 date">${detailEvent.date}</p>
    <p class="card-text mx-0 text-justify my-2">${detailEvent.description}</p>
    <div class="d-flex flex-wrap justify-content-center gap-5 py-2 text-white fw-bolder">
        <p class="m-0 category">${detailEvent.category}</p>
        <p class="m-0 text-center">${detailEvent.place}</p>
    </div>
    <div>
    <p class="card-text m-0">Capacity: ${detailEvent.capacity}</p>
    <p class="card-text m-0">Assistance or stimate: ${detailEvent.estimate || detailEvent.assistance}</p>
    </div>
    <p class="mt-3 price fs-5 align-self-center">$${detailEvent.price}</p>
</div>`