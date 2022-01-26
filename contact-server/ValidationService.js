// Validate form input elements
const validateLib = require('./ValidationLib');

/**
 * Validate form data
 * @param data
 * @returns {boolean|{msg: string, isNotValid: boolean}|{isNotValid}|*}
 */
function validateFormData(data) {
    // Check required fields
    let result = validateLib.checkRequired("firstName", data.firstName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("lastName", data.lastName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("email", data.email);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("username", data.username);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("password", data.password);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("password2", data.password2);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("telefon", data.telefon);
    if (result.isNotValid) { return result; }

    //check length
    result = validateLib.checkLength("username",data.username, 3, 12);
    if (result.isNotValid) { return result; }

    result = validateLib.checkLength("password",data.password, 4, 20);
    if (result.isNotValid) { return result; }

    //check email syntax
    result = validateLib.checkEmail("email", data.email);
    if (result.isNotValid) { return result; }

    //check syntax
    result = validateLib.checkName("firstName", data.firstName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkName("lastName", data.lastName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkNumber("telefon", data.telefon);
    if (result.isNotValid) { return result; }

    result = validateLib.checkPassword("password2", data.password2);
    if (result.isNotValid) { return result; }
    //all inputs are valid and isNotValid=false
    return false;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    validateContact: validateFormData
}
