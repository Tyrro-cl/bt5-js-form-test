import flatpickr from "flatpickr";
import "flatpickr/dist/themes/light.css";
import validate from "validate.js";
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
      this.revealPassword();

      flatpickr(getDate, {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
      });
    }
  }

  revealPassword() {
    const getSpans = this.form.querySelectorAll(".js-reveal-password");
    // const getIcon = this.form.querySelector(".js-reveal-eye");

    console.log(getSpans);

    getSpans.forEach((showBtn) =>
      showBtn.addEventListener("click", (e) => {
        const getInput = e.currentTarget.previousElementSibling;

        const getInputIcon = e.currentTarget.firstChild;
        const getIconClasses = getInputIcon.classList;

        if (getInput.value !== "") {
          const getInputType =
            getInput.getAttribute("type") === "password" ? "text" : "password";
          getInput.setAttribute("type", getInputType);

          getIconClasses.toggle("bi-eye-slash-fill");
          getIconClasses.toggle("bi-eye");
        } else {
        }
      }),
    );
  }

  initForm() {
    const component = this; // Declares "component" as a "this" to access the global scope
    this.form.addEventListener("submit", (e) => {
      // Callback function that is composed of 2 events, submit, and the function that handles whatever the requirements and handler are call afterwards

      e.preventDefault(); // Prevents Browser Default Form Handler
      component.validateForm(); // Access to the validateForm method same scope outside the callback function one
    });

    // this.form.addEventListener('keypress', () => {  Acces to the filterInputs method when typing })

    this.filterInputs(); // Initialize filterInputs method
  }

  filterInputs() {
    const component = this;
    const fields = [
      {
        selector: ".js-form-name",
        filter: (input) => {
          return component.filterIdentity(input);
        },
      },
      {
        selector: ".js-form-lname",
        filter: (input) => {
          return component.filterIdentity(input);
        },
      },
      {
        selector: ".js-form-email",
        filter: (input) => {
          return component.filterEmail(input);
        },
      },
      /*{
        selector: ".js-form-password",
        filter: (input) => {
          return component.filterPassword(input.value);
        },
      },*/
    ];

    fields.forEach((field) => {
      const input = component.form.querySelector(field.selector);
      if (input) {
        input.addEventListener("click", () => {
          const isValid = field.filter(input);
          if (isValid) {
            input.classList.add("border-success");
            input.classList.remove("border-danger");
          } else {
            input.classList.add("border-danger");
            input.classList.remove("border-success");
            // field.preventDefault();
          }
          console.log(`Logging values in live filtering ${isValid}`);
        });
      }
    });

    fields.forEach((field) => {
        const input = component.form.querySelector(field.selector);

        if (input) {
          input.addEventListener("blur", async () => {
            try {
              const inputValue = await field.filter(input);
              console.log("Input Value:", inputValue);
            } catch (error) {
              console.error("Error:", error);
            }
          });
        }
      });
  }
  validateForm() {
    const component = this;
    const fields = [
      {
        selector: ".js-form-name",
        validate: (input) => {
          return component.validateIdentity(input.value);
        },
      },
      {
        selector: ".js-form-lname",
        validate: (input) => {
          return component.validateIdentity(input.value);
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
      },
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
        console.log('Logging values in valitadion', typeof isValid);
        if (isValid == undefined){
        console.debug(`Logging value of undefined variable :  ${isValid}`);
        };
      }
    });
  }

  validateAge = (birthday) => {
    const getBirthday = new moment(birthday);
    console.log(`log of variable 'getBirthday' : ${getBirthday}`);

    const minAge = new moment().subtract(18, "years");
    console.log(`log of variable 'minAge' : ${minAge}`);

    const minAgeYear = new moment().diff(minAge, "years"); // prompts actual age inserted
    const yearsDiff = new moment().diff(getBirthday, "years");

    if (yearsDiff >= minAgeYear) {
      return yearsDiff;
    } else {
      return alert(
        `Votre âge de ${yearsDiff} ans n'est pas le minimun de ${minAgeYear} ans comme il est exigé`,
      );
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

    const component = this;
    const getPassConfirm = component.form.querySelector(
      ".js-form-confirm-password",
    ).value;

    if (password == getPassConfirm) {
      return String(password).match(passwordRegex);
    } else {
      return console.log(`Passwords doesn't match`);
    }
  };

  validateIdentity = (identity) => {
    const regexIdentity = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']*$/u;

      // console.log(identity);
      if (identity.match(regexIdentity)) {
        return identity.charAt(0).toUpperCase() + identity.slice(1);
      }
  }


  filterIdentity = (identity) => {
    const identityRegex = /[A-Za-z]/;

    console.log(`1st log of identity parameter : ${identity}`);
    return new Promise((resolve, reject) => {
      identity.addEventListener("input", (e) => {
        const inputValue = e.target.value;

        if (!identityRegex.test(inputValue)) {
          e.target.value = inputValue.replace(/[^a-zA-Z0-9._@-]/g, "");
        }
        console.log(
          `log inside callback of emailValue variable : ${inputValue}`,
        );
      });

      identity.addEventListener("blur", (e) => {
        const inputValue = e.target.value;

        resolve(inputValue);
      });
    });
  };

  /* capitalizeFirstLetter = (e) => {
    return String(e.charAt(0).toUpperCase() + e.slice(1));
  }; */

  filterEmail = (email) => {
    console.log(`1st log of email parameter : ${email}`);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{4,}$/;

    return new Promise((resolve, reject) => {
      email.addEventListener("input", (e) => {
        const inputValue = e.target.value;
        if (!emailRegex.test(inputValue)) {
          e.target.value = inputValue.replace(/[^a-zA-Z0-9._@-]/g, "");
        }
        console.log(
          `log inside callback of emailValue variable : ${inputValue}`,
        );
      });

      email.addEventListener("blur", (e) => {
        const inputValue = e.target.value;

        resolve(inputValue);
      });
    });
  };

  /* filterPassword = (password) => {

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    return new Promise((resolve, reject) => {
      password.addEventListener("input", (e) => {
        const inputValue = e.target.value;

        if (!passwordRegex.test(inputValue)) {
          e.target.value = inputValue.replace()
        }
      });
    });
  }*/
}
