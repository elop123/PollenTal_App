
var map = L.map('map').setView([56.716442, 10.1146065], 13); 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([56.716442, 10.1146065]).addTo(map)
    .bindPopup('Location')
    .openPopup();
