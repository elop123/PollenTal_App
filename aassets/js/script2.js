// // Funktion til at gemme valgte pollen typer i localstorage
// function savePollenSelection() {
//     const checkboxes = document.querySelectorAll('input[name="pollen"]:checked');
//     const selectedPollen = Array.from(checkboxes).map(checkbox => checkbox.value);
//     localStorage.setItem('selectedPollen', JSON.stringify(selectedPollen));
//   }

//   // Hent gemte pollen valg fra localstorage og marker afkrydsningsfelterne
//   function loadSavedPollenSelection() {
//     const selectedPollen = JSON.parse(localStorage.getItem('selectedPollen'));
//     if (selectedPollen) {
//       selectedPollen.forEach(pollen => {
//         const checkbox = document.querySelector(`input[value="${pollen}"]`);
//         if (checkbox) {
//           checkbox.checked = true;
//         }
//       });
//     }
//   }
//   // Kald funktionen til indlæsning af gemte valg, når siden indlæses
//   document.addEventListener('DOMContentLoaded', loadSavedPollenSelection);

//   // Lyt efter form submit begivenhed og gem valg i localstorage
//   const form = document.getElementById('pollenForm');
//   form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     savePollenSelection();
//     alert('Dine valg er blevet gemt!');
//   });


// Swap function 
const toggles = document.querySelectorAll('.toggle');

toggles.forEach(toggle => {
    toggle.addEventListener("click", () => toggle.classList.toggle("active"));
});