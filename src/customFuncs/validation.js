export const validate = (type, toCheck1, toCheck2 = null) => {
  const error = [];
  switch (type) {
    case "Email":
      const re_email = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
      if (!re_email.test(toCheck1)) {
        error.push("valid");
      }
      break;
    case "Password":
      if (toCheck1.length < 8) {
        error.push("length");
      }
      const re_upperCase = /[A-Z]/;
      if (!re_upperCase.test(toCheck1)) {
        error.push("uppercase");
      }
      const re_numOrSym = /[-!$%^&*()_+|~=`\[\]:";'<>?,.\/1-9]/;
      if (!re_numOrSym.test(toCheck1)) {
        error.push("symbol");
      }
      break;
    case "Name":
      if (toCheck1.length < 3 && toCheck1.length !== 0) {
        error.push("length");
      }
      if (toCheck1[0] === " " || toCheck1[toCheck1.length - 1] === " ") {
        error.push("space");
      }
      const re_name = /^[\w-_.& ]*$/;
      if (!re_name.test(toCheck1)) {
        error.push("symbols");
      }
      break;

    case "Company":
      const re_company = /^[\w-_.& ]*$/;
      if (!re_company.test(toCheck1)) {
        error.push("symbols");
      }
      if (toCheck1[0] === " " || toCheck1[toCheck1.length - 1] === " ") {
        error.push("space");
      }
      break;

    case "ConfPass":
      if (toCheck1 !== toCheck2) {
        error.push("match");
      }
  }
  return error.length === 0 ? true : error;
};
