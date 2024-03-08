// Notice the export statement and the import in home.js
// Notice the structure of the parameter and the return value
export default function validateRegistrationForm(formValues) {

  const result = {
    username: validateUserName(formValues.username),
    email: validateEmail(formValues.email),
    phone: validatePhone(formValues.phone),
    profession: validateProfession(formValues.profession),
    experience: validateExperience(formValues.experience),
  };

  let field, isValid = true;
  for(field in result) {
    isValid = isValid && result[field];
  }

  return {
    isValid,
    result,
  };

}

/* Part 1 - Regular expressions 
   Write each of the functions below using a regular expression
   to do the actual validation whenever possible.  
   
   You can write the expressions yourself or find one on the internet.  
   
   You might test your regular expressions
   in the html page I gave you OR you might create a codepen or jsfiddle
   playground to test your functions as you write them.

   The function above calls all of these functions.  You're ready to add 
   validation to home.js.
*/

// must be longer than 3 chars.  Use a regular expression.
function validateUserName(name) {
  const pattern = /^[a-zA-Z]{3,}$/;
  return pattern.test(name);
}

// must be a valid email address.  Use a regular expression
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
  
}

// must be a valid 10 digit phone number.  Use a regular expression
function validatePhone(phone) {
  const pattern = /^(\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4})$/;
  return pattern.test(phone);
 
}

// must be either school, college, trainee or employee.  No reg exp.
function validateProfession(profession) {
  const validProfessions = ['school', 'college', 'trainee', 'employee'];
  return validProfessions.includes(profession.toLowerCase());
 
}

// must be beginner, intermediate or advanced.  Use a regular expression.
function validateExperience(experience) {
  const pattern = /^(beginner|intermediate|advanced)$/i; // case-insensitive matching
  return pattern.test(experience);
}
