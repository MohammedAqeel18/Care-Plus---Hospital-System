let slideIndex = 0;

function showSlides() {
  const slides = document.querySelectorAll(".slide");

  slides.forEach(slide => {
    slide.classList.remove("show"); // Hide all slides
  });

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1; // Reset to first slide if at the end

  slides[slideIndex - 1].classList.add("show"); // Show the current slide

  setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

document.addEventListener("DOMContentLoaded", showSlides);


