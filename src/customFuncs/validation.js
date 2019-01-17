export const validateEmail = email => {
  const err = [];
  const re = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
  if (!re.test(email)) {
    err.push("The Email did not pass the validation!");
  }
  return err.length === 0 ? true : err;
};

export const validatePassword = (password, passwordConf) => {
  const error = [];
  if (password.length < 5) {
    error.push("5 characters");
  }
  const re_upperCase = /[A-Z]/;
  if (!re_upperCase.test(password)) {
    error.push("uppercase");
  }
  const re_lowerCase = /[a-z]/;
  if (!re_lowerCase.test(password)) {
    error.push("lowercase");
  }
  const re_numOrSym = /[-!$%^&*()_+|~=`\[\]:";'<>?,.\/1-9]/;
  if (!re_numOrSym.test(password)) {
    error.push("number/symbol ");
  }
  if (password != passwordConf) {
    error.push("passwordConf");
  }
  return error.length === 0 ? true : error;
};

export const validateName = name => {
  const error = [];
  if (name.length < 3) {
    error.push("3 characters!");
  }
  const re = /^[\w-_.]*$/;
  if (!re.test(name)) {
    error.push("The name can only contain letters, numbers and '-', '_', '.'!");
  }
  return error.length === 0 ? true : error;
};
