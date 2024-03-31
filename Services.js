// Get all slideshow elements
const slideshows = document.querySelectorAll('.slideshow');

slideshows.forEach(slideshow => {
    const slides = slideshow.querySelector('.slides');
    const prevBtn = slideshow.querySelector('.prev-btn');
    const nextBtn = slideshow.querySelector('.next-btn');

    let currentSlide = 0;

    // Function to show the current slide
    const showSlide = function(slideIndex) {
        slides.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
    };

    // Event listener for the "previous" button
    prevBtn.addEventListener('click', () => {
        const prevSlide = currentSlide - 1;
        if (prevSlide >= 0) {
            showSlide(prevSlide);
        }
    });

    // Event listener for the "next" button
    nextBtn.addEventListener('click', () => {
        const nextSlide = currentSlide + 1;
        if (nextSlide < slides.children.length) {
            showSlide(nextSlide);
        }
    });

    // Start the slideshow on the first slide
    showSlide(currentSlide);
});
