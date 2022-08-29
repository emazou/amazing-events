const params = new URLSearchParams(location.search)
const id = parseInt(params.get('id'))
let detailEvent = (data.events).find(event => event._id === id)
let cardDetail = document.querySelector('.card-details')
cardDetail.innerHTML = `<img src="${detailEvent.image}" class="card-img-personal-details p-2" alt="Card" />
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