const actionImages = document.querySelectorAll('.sustainability-actions img');

actionImages.forEach(image => {
    image.addEventListener('click', () => {
        image.classList.toggle('popup'); // Toggle the 'popup' class on click
    });
});

// Define styles for the 'popup' class in style.css (optional):

.popup {
    /* Add styles for the pop-up effect (e.g., larger size, position absolute) */
    /* Add transition properties for smooth animation (e.g., transform, opacity) */
}

/* Example styles for the 'popup' class: */

.popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%; /* Adjust width as needed */
    height: auto;
    background-color: #fff; /* Optional background color */
    box
