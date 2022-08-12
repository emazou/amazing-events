let eventsTable = document.getElementById("eventsTable")
let upComingEventsTable = document.getElementById("upComingEventsTable") 
let pastEventsTable = document.getElementById("pastEventsTable")
let url = 'https://amazing-events.herokuapp.com/api/events'
async function fetchData(urlApi){
    try{
        let response = await fetch(urlApi)
        let data = await response.json()
        let dataEvents = data.events
        firstTable(eventsTable,dataEvents)
        createTableBody(statisticsCategory(pastEvents(dataEvents,data.currentDate)),pastEventsTable)
        createTableBody(statisticsCategory(upComingEvents(dataEvents,data.currentDate)),upComingEventsTable)
    }catch(err){
        console.log(err)
    }
}
fetchData(url)
function porcentage(capacity,assistance){ 
    return (parseFloat(assistance) * 100)/parseFloat(capacity)
}
function morePorcentage(arrayEvents) {
    let eventName;
    let max = porcentage(parseFloat(arrayEvents[0].capacity),(arrayEvents[0].assistance)) 
    arrayEvents.forEach(event =>{
        //let porcentage = ((event.assistance) * 100) / event.capacity 
        if(porcentage(event.capacity,event.assistance) > max){
            max = porcentage(event.capacity,event.assistance)
            eventName = event.name
        }
    })
    return {name:eventName, porcentage:max}
}
function lowestPorcentage(arrayEvents) {// CREO QUE PUEDO USAR LA FUNCION ANTERIOR XD *REVISAR*
    let eventName;
    let min = porcentage(parseFloat(arrayEvents[0].capacity),(arrayEvents[0].assistance)) 
    arrayEvents.forEach(event =>{
        if(porcentage(event.capacity,event.assistance) < min){
            min = porcentage(event.capacity,event.assistance)
            eventName = event.name
        }
    })
    return {name:eventName, porcentage:min}
}
function moreCapacity(arrayEvents){ 
    return arrayEvents.sort((a, b) => b.capacity - a.capacity)[0]
}
function firstTable(node,arrayEvents){
    let tr = document.createElement('tr')
    tr.innerHTML = `<td>${morePorcentage(arrayEvents).name} : ${morePorcentage(arrayEvents).porcentage}%</td>
                    <td>${lowestPorcentage(arrayEvents).name} : ${lowestPorcentage(arrayEvents).porcentage}%</td>
                    <td>${moreCapacity(arrayEvents).name} : ${moreCapacity(arrayEvents).capacity} people</td>`
    node.appendChild(tr)
}
function upComingEvents(arrayEvents,date){
    return arrayEvents.filter(item => item.date > date)
}
function pastEvents(arrayEvents,date){
    return arrayEvents.filter(item => item.date < date)
}
function statisticsCategory(arrayEvents){
    let arrayObjectStatisticsForCategory = []
    categories(arrayEvents).forEach(category => {
        let arrayFilteredForCategory = arrayEvents.filter(event => event.category == category)
        let revenuesForCategory = Math.round(revenues(arrayFilteredForCategory) / arrayFilteredForCategory.length)
        let porcentageEvent = []
        arrayFilteredForCategory.forEach(event=>{
            porcentageEvent.push(Math.round(porcentage(event.capacity, event.assistance || event.estimate)))
        })
        let porcentageCategory = (porcentageEvent.reduce((sum,porcentage) => sum + porcentage,0) / porcentageEvent.length).toFixed(2)
        let categoryStatistics = {
            category: category,
            revenues: revenuesForCategory,
            porcentage: porcentageCategory
        }
        arrayObjectStatisticsForCategory.push(categoryStatistics)
    })
    return arrayObjectStatisticsForCategory
}
function categories(arrayEvents) {
    let arrayCategories = []
    arrayEvents.forEach(event => {
        if (!arrayCategories.includes(event.category)) {
            arrayCategories.push(event.category)
        }
    })
    return arrayCategories
}
function revenues(arrayEventsCategory){
    return arrayEventsCategory.reduce((sum , event) => sum + event.price * (parseFloat(event.assistance) || parseFloat(event.estimate)) , 0)
}
function createTableBody(arrayObjects,node){
    arrayObjects.forEach(element =>{
        let tr = document.createElement('tr')
        tr.innerHTML = `
                        <td>${element.category}</td>
                        <td>$${element.revenues}</td>
                        <td>${element.porcentage}%</td>
        `
        node.appendChild(tr)
    })
    
}