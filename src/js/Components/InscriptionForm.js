import flatpickr from "flatpickr";
import "flatpickr/dist/themes/light.css";

import moment from "moment";

export default class InscriptionForm {
  // A constructor enables you to provide any custom initialization that must be done before any other methods can be called on an instantiated object.
  constructor() {
    console.log("Inscription form loaded");

    // "this" access to the global scope, then "form" property its appended to it
    this.form = document.querySelector("#contact-form"); // "this.form" variable is declared as an id targeter of "#contact-form"
    const getDate = this.form.querySelector(".js-form-birthday");
    // verifies if "this.form" exist, then initializes "initForm" method
    if (this.form) {
      this.initForm();

      flatpickr(getDate, {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
      });
    }
  }

  initForm() {
    const component = this; // Declares "component" as a "this" to access the global scope
    this.form.addEventListener("submit", function (e) {
      // Callback function that is composed of 2 events, submit, and the function that handles whatever the requirements and handler are call afterwards

      e.preventDefault(); // Prevents Browser Default Form Handler
      component.validateForm(); // Access to the validateForm method same scope outside the callback function one
    });
  }

  validateForm() {
    const component = this;
    const fields = [
      {
        selector: ".js-form-name",
        validate: (input) => {
          return input.value.trim() !== "";
        },
      },
      {
        selector: ".js-form-lname",
        validate: (input) => {
          return input.value.trim() !== "";
        },
      },
      {
        selector: ".js-form-email",
        validate: (input) => {
          return component.validateEmail(input.value);
        },
      },
      {
        selector: ".js-form-birthday",
        validate: (input) => {
          return component.validateAge(input.value);
        },
      },
      {
        selector: ".js-form-password",
        validate: (input) => {
          return component.validatePassword(input.value);
        },
      }
    ];

    fields.forEach((field) => {
      const input = component.form.querySelector(field.selector);
      if (input) {
        const isValid = field.validate(input);
        if (isValid) {
          input.classList.add("border-success");
          input.classList.remove("border-danger");
        } else {
          input.classList.add("border-danger");
          input.classList.remove("border-success");
        }
        console.log(isValid);
      }
    });
  }

  validateAge = (birthday) => {
    //const today = moment();
    //console.log(`FIRST log of variable 'today' : ${today}`)  
    const getBirthday = new moment(birthday);
    console.log(`log of variable 'getBirthday' : ${getBirthday}`)
    // const yearAge = getBirthday.year();
    const minAge = new moment().subtract(18, "years"); // .year if we want just to get the year number
    console.log(`log of variable 'minAge' : ${minAge}`)
    // console.log(`SECOND log of variable 'today' : ${today}`)

    const minAgeYear = new moment().diff(minAge, 'years'); // prompts actual age inserted
    const yearsDiff = new moment().diff(getBirthday, "years");
    //console.log(`THIRD log of variable 'today' : ${today}`)

    // console.log(`log of variable 'minAgeYear' before conditional : ${minAgeYear}`) // removing .year from const 'minAge' stopped prompting '54' in this log
    // console.log(`log of variable 'yearsDiff' before conditional : ${yearsDiff}`)

    if (yearsDiff >= minAgeYear) {
      return yearsDiff;
    } else {
      return alert(`Votre âge de ${yearsDiff} ans n'est pas le minimun de ${minAgeYear} ans comme il est exigé`);
    }
  };

  validateEmail = (email) => {
    const emailRegex =
      /^(?!.*@yopmail\.com$)(?=.{1,254}$)(?=.{1,64}@)(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    return String(email).toLowerCase().match(emailRegex);
  };

  validatePassword = (password) => {
    // Minimum eight characters, at least one letter, one number and one special character:
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
    return String(password).match(passwordRegex);
  };

  /* validateTel = (tel) => {
    const telRegex =
      /^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}$/;
    if (this.phoneFilled) {
      return String(tel).match(telRegex);
    }
  };*/
}
