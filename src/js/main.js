import "../scss/styles.scss";
import InscriptionForm from "./Components/InscriptionForm";
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".js-dom-ready").classList.remove("hidden");
  new InscriptionForm();

  // init Swiper:
  const swiper = new Swiper('.swiper', {
    speed: 400,
    spaceBetween: 100,
    effect: 'cards',
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
      },
    snapOnRelease: true, 
    
  });
  // 
});
