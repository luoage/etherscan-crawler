const zipObject = (a1, a2) => {
  const result = {};
  if (Object.keys(a2).length === 0) {
    return result;
  }

  a1 = a1 || [];

  for (let i = 0; i < a1.length; i++) {
    if (a1[i]) {
      result[a1[i]] = a2[i];
    }
  }
  return result;
};

module.exports = {
  zipObject,
};
