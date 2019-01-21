export const nameErrors = state => {
  if (state.nameErrors.length && state.nameErrors.symbols) {
    return (
      formLabels.name.errors.length + "\n" + formLabels.name.errors.symbols
    );
  } else if (state.nameErrors.length) {
    return formLabels.name.errors.length;
  } else if (state.nameErrors.symbols) {
    return formLabels.name.errors.symbols;
  } else {
    return "";
  }
};
export const companyErrors = state => {
  if (state.companyErrors.symbols) {
    return formLabels.company.errors.symbols;
  } else {
    return "";
  }
};
