export const arrayIncludes = (requiredArray, actualArray) => {
  for (let i in requiredArray) {
    if (!actualArray.includes(requiredArray[i])) {
      return false;
    }
  }
  return true;
};
