
//      // Swap function 
//  const toggles = document.querySelectorAll('.toggle');
//     // Add event listeners to swap buttons
//     toggles.forEach(toggle => {
//        toggle.addEventListener("click", () => toggle.classList.toggle("active"));
//    });



const toggles = document.querySelectorAll('.toggle');

// Add event listeners to swap buttons
toggles.forEach(toggle => {
    toggle.addEventListener("click", function() {
        toggle.classList.toggle("active");
        
        const checkbox = toggle.previousElementSibling;
        if (toggle.classList.contains("active")) {
            checkbox.checked = true;
            checkbox.style.display = "block"; // Hide the checkbox
            // Save the state to localStorage
            localStorage.setItem(checkbox.id, 'checked');
        } else {
            checkbox.style.display = ""; // Show the checkbox if it was hidden
            // Remove the state from localStorage
            localStorage.removeItem(checkbox.id);
        }
    });
});