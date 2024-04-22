
var map = L.map('map').setView([0,0], 13); 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([0,0]).addTo(map)
    .bindPopup('Location')
    .openPopup();

// Function to update map location
function updateMapLocation(latitude, longitude) {
    map.setView([latitude, longitude], 13); // Update map view with new coordinates
    L.marker([latitude, longitude]).addTo(map).bindPopup('Your Location').openPopup(); // Add marker at new location
}

// Function to handle getting the user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            updateMapLocation(latitude, longitude); 
// Call function to update map location
        }, function(error) {
            console.error('Error getting user location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Call function to get user's current location
getUserLocation();