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
function morePorcentage(arrayEvents) {
    let eventName;
    let max = porcentage(parseFloat(arrayEvents[0].capacity),(arrayEvents[0].assistance)) 
    arrayEvents.forEach(event =>{
        let porcentage = ((event.assistance) * 100) / event.capacity 
        if(porcentage > max){
            max = porcentage
            eventName = event.name
        }
    })
    return {name:eventName, porcentage:max}
}
function lowestPorcentage(arrayEvents) {
    let eventName;
    let min = porcentage(parseFloat(arrayEvents[0].capacity),(arrayEvents[0].assistance)) 
    arrayEvents.forEach(event =>{
        let porcentage = ((event.assistance) * 100) / event.capacity 
        if(porcentage < min){
            min = porcentage
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
function porcentage(capacity,assistance){ 
    return (parseFloat(assistance) * 100)/parseFloat(capacity)
}
function statisticsCategory(arrayEvents){
    let arrayObjectStatisticsForCategory = []
    for(let item = 0; item < categories(arrayEvents).length; item++){
        let arrayFilteredForCategory = arrayEvents.filter(event => event.category == categories(arrayEvents)[item])
        let revenuesForCategory = Math.round(revenues(arrayFilteredForCategory) / arrayFilteredForCategory.length)
        let porcentageEvent = []
        arrayFilteredForCategory.forEach(event=>{
            porcentageEvent.push(Math.round(porcentage(event.capacity, event.assistance || event.estimate)))
        })
        let porcentageCategory = (porcentageEvent.reduce((sum,porcentage) => sum + porcentage,0) / porcentageEvent.length).toFixed(2)
        console.log(porcentageCategory)
        let categoryStatistics = {
            category: categories(arrayEvents)[item],
            revenues: revenuesForCategory,
            porcentage: porcentageCategory
        }
        arrayObjectStatisticsForCategory.push(categoryStatistics)
    }
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
    return arrayEventsCategory.reduce((sum , element) => sum + element.price * (parseFloat(element.assistance) || parseFloat(element.estimate)) , 0)
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