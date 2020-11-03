const Validator = require('validator');
const isEmpty = require('./isEmpty');



exports.userValidator = function (data) {

  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.mobile = !isEmpty(data.mobile) ? data.mobile : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.street = !isEmpty(data.street) ? data.street : '';
  data.locality = !isEmpty(data.locality) ? data.locality : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.pincode = !isEmpty(data.pincode) ? data.pincode : '';
  data.longitude = !isEmpty(data.longitude) ? data.longitude : '';
  data.latitude = !isEmpty(data.latitude) ? data.latitude : '';

  if(Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if(Validator.isEmpty(data.mobile)) {
    errors.mobile = "Mobile Number is required";
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if(Validator.isEmpty(data.street)) {
    errors.street = "Street is required";
  }

  if(Validator.isEmpty(data.locality)) {
    errors.locality = "Locality is required"
  }

  if(Validator.isEmpty(data.city)) {
    errors.city = "City is required"
  }

  if(Validator.isEmpty(data.state)) {
    errors.state = "State is required"
  }

  if(Validator.isEmpty(data.pincode)) {
    errors.pincode = "Pincode is required"
  }

  if(Validator.isEmpty(data.longitude)) {
    errors.longitude = "longitude is required"
  }

  if(Validator.isEmpty(data.latitude)) {
    errors.latitude = "latitude is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


