import 'toastr/build/toastr.css';
import toastr from 'toastr';
import './general';
import navbarTemplate from '../js/navigation';
const regeneratorRuntime = require("regenerator-runtime");

/* Part 1 - Check out the validation module in services/formValidation */
import validateRegistrationForm from './services/formValidation/validateRegistrationForm';



class Home {
  constructor() {
    /* Part 2 - Finish the constructor
       - Add references to each of these elements on the page
          this.$form = 
          this.$username = 
          this.$email = 
          this.$phone = 
          this.$profession = 
          this.$experience = 
          this.$comment = 
          this.$submit = 
          this.$loadingIndicator = 
      - Add a submit handler to the form that calls onFormSubmit
        - You don't actually want to submit the form so you'll have to 
          prevent the default behavior on the event when it fires.
          That means that you'll need the event as a parameter to onFormSubmit
    */
          document.body.insertAdjacentHTML('afterbegin', navbarTemplate);
          this.$form = document.getElementById('registrationForm');
          this.$username = document.getElementById('username');
          this.$email = document.getElementById('email');
          this.$phone = document.getElementById('phone');
          this.$profession = document.getElementById('profession');
          this.$experience = document.querySelector('input[name="experience"]');
          this.$comment = document.getElementById('comment');
          this.$submit = document.getElementById('submit');
          this.$loadingIndicator = document.getElementById('loadingIndicator');
          this.validation = null;
          this.$form.addEventListener('submit', (event) => this.onFormSubmit(event));



  }

  /* Part 3 - Write the first version of onFormSubmit */
  onFormSubmit(event) { 
    // make sure the form is not submitted
    // get the values from the form and store in a variable - use getFormValues()
    event.preventDefault();
    const formValues = this.getFormValues()
    /* call the validateRegistrationForm method 
       pass variable from line above as a parameter.
       It will return an object that you should store in a varable
    */
       this.validation = validateRegistrationForm(formValues);
    // if the form is valid
    //    clear the errors
    //    call submitForm with the values from the form as a parameter
    //    (only the stub for submitForm is written. You'll write it  
    //     after testing validation and talking about the ajax call service)
    // otherwise
    //    clear all of the errors
    //    highlight the errors
    // end if
    if (this.validation.isValid) {
      // Clear all errors before highlighting new ones
      this.clearErrors();
      
      this.submitForm(formValues);  
    } else {
        this.clearErrors();
          // Highlight errors
      Object.keys(this.validation.result).forEach(field => {
        if (!this.validation.result[field]) {
          this.highlightErrors(field);
        }
      });
      
    
  
      // You can display a general error message if needed
      console.log('Validation failed. Errors:', this.validation.result);
      alert('Please fix the errors in the form before submitting.');
   
    }
  
    // Form is valid, so you can proceed with the submission
  
  }

  /* Part 4 - Finish these 4 UI related methods */

  /* This method packages up all of the form data into one object
     Get the data from each of the form fields.
     Notice how the experience that is checked is retrieved.
  */
  getFormValues() {
    return {
      username: this.$username.value,
      email: this.$email.value,
      phone: this.$phone.value,
      profession: this.$profession.value,
      experience: document.querySelector('input[name="experience"]:checked').value,
      comment: this.$comment.value,
    };
  }

  /* This method clears each of the form fields.
     It gets called after the form is submitted successfully.
     Do the same kind of thing for the other input fields.
  */
  resetForm() {
    this.$username.value = '';
    this.$email.value = '';
    this.$phone.value = '';
    this.$profession.value = 'school';
    this.$experience.checked = true;
    this.$comment.value = '';
  }

  /* This method styles each of the form fields that contains an error.
     It gets called after the form is validated when errors occurr.
     Do the same kind of thing for the other input fields
  */
     highlightErrors(result) {
      if (this.validation.result[result] === false) {
        this[`$${result}`].classList.add('is-invalid');
      }
    }

  /* This method removes the style for errors from all form fields.
     It gets called after the form is validated.
     Do the same kind of thing for the other input fields.
  */
  clearErrors() {
    this.$username.classList.remove('is-invalid');
    this.$email.classList.remove('is-invalid');
    this.$phone.classList.remove('is-invalid');
  }

  /* TEST - Instantiate a Home object at bottom of file first */

  /* Part 5 - review how you used fetch to get data in the weather app.  This time we'll be making a post request */

  /* Part 6 - Finish this function.  It makes the api call.  TEST */
  submitForm(formValues) {
    console.log('Submitting form...', formValues);
    this.$submit.classList.add('visually-hidden');
    this.$loadingIndicator.classList.remove('visually-hidden');
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    };
  
    fetch('http://citweb.lanecc.net:5000/participants', requestOptions)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.$submit.classList.remove('visually-hidden');
          this.$loadingIndicator.classList.add('visually-hidden');
          toastr.success(formValues.username + ' is successful');
          this.resetForm();
        } else {
          this.$submit.classList.remove('visually-hidden');
          this.$loadingIndicator.classList.add('visually-hidden');
          toastr.error('Error! ' + response.status + ' ' + response.statusText);
        }
      })
      .catch(() => {
        this.$submit.classList.remove('visually-hidden');
        this.$loadingIndicator.classList.add('visually-hidden');
        toastr.error('Error!');
      });
  }
}
 // end of the class definition

// add a window onload handler. 
// It should create an (unnamed) instance of the class for this page

window.onload = () => {
   new Home();
};