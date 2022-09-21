const qs = require('node:querystring');
const cheerio = require('cheerio');

const { Joi, validate } = require('../utils/validate');
const { get } = require('../utils/request');
const { zipObject } = require('../utils/util');
const { response } = require('../utils/response');
const { baseEth } = require('../settings/config');


const getTransactions = async (req, res) => {
  const query = req.query || {};

  validate(query, {
    page: Joi.number().min(1),
    perpage: Joi.number().valid([10, 25, 50, 100]),
    a: Joi.string().regex(/^[0-9a-z]{34,64}$/i).required(),
  });

  const page = parseInt(query.page) || 1;
  const perpage = parseInt(query.perpage) || 10;

  const body = await grabEthWebsite({ page, perpage, address: query.a });
  const list = (getWebsiteJson(body) || []).filter((item) => {
    return Object.keys(item).length > 0;
  });

  response(res, {
    page,
    perpage,
    listLength: list.length,
    list,
  });
};

async function grabEthWebsite({ page, perpage, address }) {
  const url = `${baseEth}/txs?${qs.stringify({ ps: perpage, p: page, a: address })}`;
  console.log('perpare to request url ', url);
  return get(url);
}

function getWebsiteJson(body) {
  const $ = cheerio.load(body);
  const headers = $('#paywall_mask').find('thead>tr').first().map((i1, tr) => {
    return $(tr).find('th').map((i2, td) => {
      return $(td).text().trim();
    }).get();
  }).get();

  console.log('get headers', headers);
  headers[4] = 'Age';
  headers[9] = 'Txn Fee';

  return $('#paywall_mask').find('tbody>tr').map((i1, tr) => {
    return zipObject(headers, $(tr).children().map((i2, td) => {
      return $(td).text().trim();
    }).get());
  }).get();
}



module.exports = {
  getTransactions,
};
