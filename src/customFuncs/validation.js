export const validateEmail = email => {
  const err = [];
  const re = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
  if (!re.test(email)) {
    err.push("valid");
  }
  return err.length === 0 ? true : err;
};

export const validatePassword = password => {
  const error = [];
  if (password.length < 8) {
    error.push("length");
  }
  const re_upperCase = /[A-Z]/;
  if (!re_upperCase.test(password)) {
    error.push("uppercase");
  }
  const re_numOrSym = /[-!$%^&*()_+|~=`\[\]:";'<>?,.\/1-9]/;
  if (!re_numOrSym.test(password)) {
    error.push("symbol");
  }
  return error.length === 0 ? true : error;
};

export const validateConfPass = (password, confPass) => {
  const error = [];
  if (password !== confPass) {
    error.push("match");
  }
  return error.length === 0 ? true : error;
};

export const validateName = name => {
  const error = [];
  if (name.length < 3) {
    error.push("length");
  }
  const re = /^[\w-_.]*$/;
  if (!re.test(name)) {
    error.push("symbols");
  }
  return error.length === 0 ? true : error;
};

export const validateCompany = company => {
  const error = [];
  const re = /^[\w-_.]*$/;
  if (!re.test(company)) {
    error.push("symbols");
  }
  return error.length === 0 ? true : error;
};
