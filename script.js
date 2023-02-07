

$("#carousel-slider").slick({
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    mobileFirst: true
});


const searchInputSidenav = document.getElementById('search-input-sidenav');
const sidenavOptions = document.querySelectorAll('#sidenav li .sidenav-link');

searchInputSidenav.addEventListener('input', () => {
  const filter = searchInputSidenav.value.toLowerCase();
  showSidenavOptions();
  const valueExist = !!filter.length;

  if (valueExist) {
    sidenavOptions.forEach((el) => {
      const elText = el.textContent.trim().toLowerCase();
      const isIncluded = elText.includes(filter);
      if (!isIncluded) {
        el.style.display = 'none';
      }
    });
  }
});

const showSidenavOptions = () => {
  sidenavOptions.forEach((el) => {
    el.style.display = 'flex';
  });
};



/*$("#sign-up").on("click", function(e) {
  $("#sign-up-popup").fadeIn(5000)
});

document.querySelector("#sign-up").addEventListener("click", function(){
  document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click", function(){
  document.querySelector(".popup").classList.remove("acitve");
});
*/

const search = document.querySelector["[search]"];
search.addEventListener("input", e => {
  const value = e.target.value
  console.log(value)
})
