
getLocation()

function getLocation() {

if (navigator.geolocation) {

//  navigator.geolocation.getCurrentPosition requires a succes function name as first param and a error function name as second param.
navigator.geolocation.getCurrentPosition(showPosition, geoError);
} else {
alert('Geolocation is not supported by this browser.')
}
}

// Geo location succes function recieves a data object 
function showPosition(position) {

//console.log( position.coords.longitude);
//console.log(position.coords.latitude);

getHumanReadableLocation(position.coords.latitude, position.coords.longitude)
getpollenData(position.coords.latitude, position.coords.longitude)
}

//Geo error function receivs a Data Object
function geoError(error) {
console.log(error.message);
}


function getHumanReadableLocation(lat, long) {

const apiKey = '65fbf0de0f61e376389185ezy817940';
const myUrl = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${apiKey}`;

fetch(myUrl)
 .then(response => {
  if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
 buildLocationName(data.address.city);
})
.catch(error => {
//console.error('Fetch error:', error);
return null;
});
}


// ViewCode
function buildLocationName(myCity) {

    console.log(myCity);

    let myNameElement = document.getElementById("app");

    myNameElement.innerHTML = `<h1>Location:${myCity}</h1>`

}

function getpollenData(lat, long) {

const timeZone = 'Europe%2FBerlin';

const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=${timeZone}&forecast_days=1`

console.log('get pollen data');
console.log(lat, long);

fetch(url)
    .then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
pollenDataStructure(data)
})
.catch(error => {
console.error('Fetch error:', error);
return null;
});
}

//Controller Code

function pollenDataStructure(data) {

let myViewData = []

//Data with current values
myViewData.push(data.current)

buildPollenView(myViewData)
}

//View Code

function buildPollenView(viewData) {

// Display data
let myDisplayElement = document.getElementById('pollenData')

console.log(viewData[0]);

let myCurrentData = viewData[0] 

let myCurrentHTML = `<h2>Pollental</h2>
                    <ul>
                    <li>Birk ${myCurrentData.birch_pollen}</li>
                    <li>Elm ${myCurrentData.mugwort_pollen}</li>
                    <li>Grass ${myCurrentData.grass_pollen}</li>
                    </ul>`

myDisplayElement.innerHTML = myCurrentHTML
}



// getLocation()




// function getLocation() {

//     if (navigator.geolocation) {

//         //  navigator.geolocation.getCurrentPosition requires a succes function name as first param and a error function name as second param.

//         navigator.geolocation.getCurrentPosition(PositionRecieved, geoError);

//     } else {
//         alert("Geolocation is not supported by this browser.")
//     }
// }

// // Geo location succes function recieves a data object 
// function PositionRecieved(position) {
//     //console.log(position);
//     console.log(position.coords.longitude);
//     console.log(position.coords.latitude);

//     // get location name
//     //GetHumanReadableLocation(position.coords.latitude, position.coords.longitude)

//     // // get pollen data on location
//     // GetPollenData(position.coords.latitude, position.coords.longitude)
// }


// //geo error function recievs a data object
// function geoError(error) {

//     console.log(error.message);
// }


// // View code
//  function buildLocationName(city) {

    
//     let myCity = document.getElementById("location");

//      myCity.innerText = city
//      myCity.innerHTML = '<h1><span>Location: </span>' + city + '</h1>'}





