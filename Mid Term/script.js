// Add this script at the end of the body tag

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
let data = null;
$.ajax({
  method: "get",
  url: "",
  success: function (response) {
    data = response.data;
    $("#table").append();
  },
});

$.ajax({
  method: "get",
  url: "adjf",
})
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("error");
  });

const a = async () => {
  console.log("my name is ahmad");
};

a.then(() => {
  console.log("success");
}).catch(() => {
  console.log("errror");
});
