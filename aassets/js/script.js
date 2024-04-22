
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
    console.log(data);
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
console.log((myDisplayElement));

let myCurrentData = viewData[0] 

let myCurrentHTML = `<h2>Pollental</h2>
                    <ul>
                    <div>
                    <img src="aassets/images/spring-birch-buds-isolated-on-600nw-100045022.webp" alt="birk">
                    <p>Birk <br><span style="font-weight: bold;">${myCurrentData.birch_pollen}</span>
                    <span class="value">&nbsp;p/m&sup3;</span><br><button id="myBtn" class="pressBtn"></button></p>
                    </div>
                    <div>
                    <img src="aassets/images/grass-allergies.jpg" alt="grass">
                    <p>Græs <br><span style="font-weight: bold;"> ${myCurrentData.grass_pollen}</span>
                    <span class="value">&nbsp;p/m&sup3;</span><br><button></button></p>
                    </div>
                    <div>
                    <img src="aassets/images/csm_shutterstock_1783989908_484801fba8.jpg" alt="bynke">
                    <p>Bynke <br><span style="font-weight: bold;"> ${myCurrentData.mugwort_pollen}</span>
                    <span class="value">&nbsp;p/m&sup3;</span><br><button></button></p>
                    </div>
                    <div>
                    <img src="aassets/images/ragweed-pollen-woes-BT.webp" alt="ambrosie">
                    <p>Ambrosie <br><span style="font-weight: bold;">${myCurrentData.ragweed_pollen}</span>
                    <span class="value">&nbsp;p/m&sup3;</span><br><button></button></p>
                    </div>

                    </ul>`

myDisplayElement.innerHTML = myCurrentHTML

}

// Save data to local storage 
localStorage.setItem('myBtn', 'true');
const myBtn = document.getElementsByClassName("pressBtn");
console.log(myBtn);









