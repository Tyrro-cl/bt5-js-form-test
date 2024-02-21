import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import InscriptionForm from "./Components/InscriptionForm";
// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
// import carousel from "bootstrap/js/dist/carousel";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".js-dom-ready").classList.remove("hidden");
  new InscriptionForm();

  /*window.onload = () => {
    localStorage.setItem("name", document.getElementById("fname").value);
    localStorage.setItem("lname", document.getElementById("flname").value);
    localStorage.setItem("email", document.getElementById("email").value);
    localStorage.setItem(
      "birthday",
      document.getElementById("fbirthday").value,
    );
  };

  localStorage.getItem("name");
  localStorage.getItem("lname");
  localStorage.getItem("email");
  localStorage.getItem("birthday");*/
});
