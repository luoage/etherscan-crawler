// cache

const struct = {
  cacheTimeAt: null,
  key: null,
  data: null,
};

const cache = {};

const getCacheTime = (key) => {
  return (cache[key] || {}).cacheTimeAt || 0;
};

const setCache = (key, data) => {
  cache[key] = Object.assign({}, struct, {
    cacheTimeAt: new Date().getTime(),
    data,
    key,
  });
};

const getCache = (key) => {
  return cache[key];
};

const isCached = (key) => {
  return key in cache;
};

module.exports = {
  getCacheTime,
  setCache,
  getCache,
  isCached,
};
