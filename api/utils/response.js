
const response = (res, data) => {
  const json = {
    code: 0,
    msg: 'success',
    result: data,
  };

  console.log('api response ', JSON.stringify(json));

  res.json(json);
};

module.exports = {
  response,
}
