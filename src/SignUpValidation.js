function Validation(values) {
    let errors = {};
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /.{8,}/;
    const phonePattern = /^\d{10}$/;
  
    if (!values.name) {
      errors.name = "Name should not be empty";
    } 
    // else {
    //   errors.name = null;
    // }
  
    if (!values.email) {
      errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Invalid email format";
    } 
    // else {
    //   errors.email = null;
    // }
  
    if (!values.password) {
      errors.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
      errors.password = "Password should be at least 8 characters long";
    } 
    // else {
    //   errors.password = null;
    // }
  
    if (!values.country) {
      errors.country = "Country should not be empty";
    } 
    // else {
    //   errors.country = null;
    // }
  
    if (!values.phone) {
      errors.phone = "Phone should not be empty";
    } else if (!phonePattern.test(values.phone)) {
      errors.phone = "Invalid phone format";
    } 
    // else {
    //   errors.phone = null;
    // }
  
    if (!values.profilePicture) {
      errors.profilePicture = "Profile picture should not be empty";
    } 
    // else {
    //   errors.profilePicture = null;
    // }
  
    return errors;
  }
  
  export default Validation;
  