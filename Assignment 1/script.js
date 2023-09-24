document.addEventListener("DOMContentLoaded", function() {
    const mascotImage = document.querySelector(".image");
  
    if (mascotImage) {
      document.addEventListener("mousemove", (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
  
        mascotImage.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
      });
    } else {
      console.error("Element with class 'image' not found.");
    }
  });
  