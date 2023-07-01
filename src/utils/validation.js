import validator from 'is_js';
const checkEmpty = (val, key) => {
  if (validator.empty(val.trim())) {
    return `Please enter ${key}`;
  } else {
    return '';
  }
};

const checkMinLength = (val, minLength, key) => {
  if (val.trim().length < minLength) {
    return `minimum 3 characters required for ${key}`;
  } else {
    return '';
  }
};

export default function (data) {
  let error = '';
  const {name, department, task} = data;

  if (name !== undefined) {
    let emptyValidationText = checkEmpty(name, 'Task name');

    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(name, 3, 'Task name');

      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }

  //   if (firstName !== undefined) {
  //     let emptyValidationText = checkEmpty(firstName, "name");

  //     if (emptyValidationText !== "") {
  //       return emptyValidationText;
  //     } else {
  //       let minLengthValidation = checkMinLength(firstName, 3, "name");

  //       if (minLengthValidation !== "") {
  //         return minLengthValidation;
  //       }
  //     }
  //   }

  //   if (lastName !== undefined) {
  //    let emptyValidationText = checkEmpty(lastName, 'last name');
  //    if (emptyValidationText !== '') {
  //      return emptyValidationText;
  //    } else {
  //      let minLengthValidation = checkMinLength(lastName, 3, 'Last name');
  //      if (minLengthValidation !== '') {
  //        return minLengthValidation;
  //      }
  //    }
  //   }

  // if (email !== undefined) {
  //   let emptyValidationText = checkEmpty(email, "email");
  //   if (emptyValidationText !== "") {
  //     return emptyValidationText;
  //   } else {
  //     if (!validator.email(email)) {
  //       return "Please enter valid email";
  //     }
  //   }
  // }

  if (department !== undefined) {
    let emptyValidationText = checkEmpty(department, 'department');

    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(department, 2, 'department');

      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }

  // if (phone !== undefined) {
  //  let emptyValidationText = checkEmpty(phone, 'phone number');
  //  if (emptyValidationText !== '') {
  //    return emptyValidationText;
  //  }
  //  if (!/^[0][1-9]$|^[1-9]\d{8,14}$/.test(phone)) {
  //    return 'Please enter valid mobile number';
  //  }
  // }
  //   if (password !== undefined) {
  //     let emptyValidationText = checkEmpty(password, "password");
  //     if (emptyValidationText !== "") {
  //       return emptyValidationText;
  //     } else {
  //       let minLengthValidation = checkMinLength(password, 6, "password");
  //       if (minLengthValidation !== "") {
  //         if (confirmPassword != undefined) {
  //           return "Password requires minimum 6 characters";
  //         }
  //         return "Password is incorrect";
  //       }
  //     }
  //   }
  //   if (confirmPassword !== undefined) {
  //     let emptyValidationText = checkEmpty(confirmPassword, "confirmPassword");
  //     if (emptyValidationText !== "") {
  //       return emptyValidationText;
  //     }
  //     if (confirmPassword != password) {
  //       return "Password and Confirm Password didn't matched";
  //     }
  //   }
  if (task !== undefined) {
    let emptyValidationText = checkEmpty(task, 'task');

    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(task, 3, 'task');

      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }
}
