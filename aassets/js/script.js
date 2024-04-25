
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
//getCoordinatesAndPollenData();

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
pollenDataStructure(data);


})
.catch(error => {
//console.error('Fetch error:', error);
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
                    <p>Birk <br>
                    <span style="font-weight: bold;">${myCurrentData.birch_pollen}</span>
                    <span class="value">&nbsp;p/m&sup3;</span><br><button type="button" id="birchBtn" title="birch"></button></p>
                    </div>
                    <div>
                    <img src="aassets/images/grass-allergies.jpg" alt="grass">
                    <p>Græs <br><span style="font-weight: bold;"> ${myCurrentData.grass_pollen}</span>
                    <span class="value">&nbsp;p/m&sup3;</span><br><button  id="grassBtn" type="button"  title="grass"></button></p>
                    </div>
                    <div>
                    <img src="aassets/images/csm_shutterstock_1783989908_484801fba8.jpg" alt="bynke">
                    <p>Bynke <br><span style="font-weight: bold;"> ${myCurrentData.mugwort_pollen}</span>
                    <span class="value">&nbsp;p/m&sup3;</span><br><button  id="bynkeBtn" type="button"  title="bynke"></button></p>
                    </div>
                    <div>
                    <img src="aassets/images/ragweed-pollen-woes-BT.webp" alt="ambrosie">
                    <p>Ambrosie <br><span style="font-weight: bold;">${myCurrentData.ragweed_pollen}</span>
                    <span class="value">&nbsp;p/m&sup3;</span><br><button id="ambrosieBtn" type="button"  title="ambrosie"></button></p>
                    </div>

                    </ul>`

myDisplayElement.innerHTML = myCurrentHTML

updateButtonSizeAndColor(myCurrentData);
}

// //Show pollen data for other cities

function getSelectedLocation() {
    const locationSelect = document.getElementById("locationSelect");
    const selectedLocation = locationSelect.value;

    if (selectedLocation === "Aarhus") {
        getCoordinatesAndPollenData("Aarhus");
    } else if (selectedLocation === "Copenhagen") {
        getCoordinatesAndPollenData("Copenhagen");
    }
    // Add more else if conditions for other cities if needed
}

function getCoordinatesAndPollenData(city) {
    if (city === "Aarhus") {
        getpollenData(56.1629, 10.2039); // Latitude and longitude for Aarhus
    } else if (city === "Copenhagen") {
        getpollenData(55.6761, 12.5683); // Latitude and longitude for København (Copenhagen)
    }
   
}





// Function to update the button based on the data
function updateButtonSizeAndColor(recivedData) {
    const birchButton = document.getElementById('birchBtn');
    const grassButton = document.getElementById('grassBtn');
    const bynkeButton = document.getElementById('bynkeBtn');
    const ambrosieButton = document.getElementById('ambrosieBtn');
console.log(recivedData);
    // Get the data values
    const birchPollenValue =  recivedData.birch_pollen;
    const grassPollenValue = recivedData.grass_pollen;
    const bynkePollenValue =  recivedData.mugwort_pollen;
    const ambrosiePollenValue = recivedData.ragweed_pollen;

    if (recivedData.birch_pollen === 0) {
       // birchButton.style.backgroundColor = 'gray';
       // birchButton.style.width = '0';
    } else if (recivedData.birch_pollen > 0 && recivedData.birch_pollen < 5) {
        birchButton.style.backgroundColor = 'green';
        birchButton.style.width = '30px';
    } else if (recivedData.birch_pollen >= 5 && recivedData.birch_pollen < 10) {
        birchButton.style.backgroundColor = 'yellow';
        birchButton.style.width = '60px';
    } else {
        birchButton.style.backgroundColor = 'red';
        birchButton.style.width = '80px';
    }

    if (recivedData.grass_pollen === 0) {
        //grassButton.style.backgroundColor = 'gray';
        //grassButton.style.width = '16px';
    } else if (recivedData.grass_pollen > 0 && recivedData.grass_pollen < 5) {
        grassButton.style.backgroundColor = 'green';
        grassButton.style.width = '30px';
    } else if (recivedData.birch_pollen >= 5 && recivedData.birch_pollen < 10) {
        grassButton.style.backgroundColor = 'yellow';
        grassButton.style.width = '60px';
    } else {
        grassButton.style.backgroundColor = 'red';
        grassButton.style.width = '80px';
    }

    if (recivedData.mugwort_pollen === 0) {
       // bynkeButton.style.backgroundColor = 'gray';
        //bynkeButton.style.width = '16px';
    } else if (recivedData.grass_pollen > 0 && recivedData.grass_pollen < 5) {
        bynkeButton.style.backgroundColor = 'green';
        bynkeButton.style.width = '30px';
    } else if (recivedData.birch_pollen >= 5 && recivedData.birch_pollen < 10) {
        bynkeButton.style.backgroundColor = 'yellow';
        bynkeButton.style.width = '60px';
    } else {
        bynkeButton.style.backgroundColor = 'red';
        bynkeButton.style.width = '80px';
    } 

    if (recivedData.ragweed_pollen === 0) {
        //ambrosieButton.style.backgroundColor = 'gray';
        //ambrosieButton.style.width = '0';
    } else if (recivedData.grass_pollen > 0 && recivedData.grass_pollen < 5) {
        ambrosieButton.style.backgroundColor = 'green';
        ambrosieButton.style.width = '30px';
    } else if (recivedData.birch_pollen >= 5 && recivedData.birch_pollen < 10) {
        ambrosieButton.style.backgroundColor = 'yellow';
        ambrosieButton.style.width = '60px';
    } else {
        ambrosieButton.style.backgroundColor = 'red';
        ambrosieButton.style.width = '80px';
    }
}





