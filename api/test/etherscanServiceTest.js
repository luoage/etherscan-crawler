const assert = require('node:assert/strict');
const { getTransactionsFromWebsit } = require('../services/etherscanService');

async function test(...fns) {
  for (const fn of fns) {
    console.log(`${fn.name} start`);
    await fn();
    console.log(`${fn.name} end`);
  }
}

async function testDataLessThan50() {
  const addressList = [
    { address: '0x3d36b71a4f8f97e00c1e1b342b4e6ab01011fa9a', page: 1, perpage: 50 },
    { address: '0x3d36b71a4f8f97e00c1e1b342b4e6ab01011fa9a', page: 1, perpage: 100 },
  ];

  for (const address of addressList) {
    try {
      const tansactions = await getTransactionsFromWebsit(address);

      assert.equal(tansactions.length < 50, true);
    } catch (e) {
      console.error(e.message);
    }
  }
}

async function testDataLargeThan25() {
  const addressList = [
    { address: '0x3d36b71a4f8f97e00c1e1b342b4e6ab01011fa9a', page: 1, perpage: 10 },
    { address: '0x3d36b71a4f8f97e00c1e1b342b4e6ab01011fa9a', page: 1, perpage: 25 },
  ];

  for (const address of addressList) {
    try {
      const tansactions = await getTransactionsFromWebsit(address);

      assert.equal(tansactions.length, address.perpage);
    } catch (e) {
      console.error(e.message);
    }
  }
}

async function testWrongAddress() {
  const addressList = [
    { address: '0x3d36b71a4f8f9e00c1e1b342b4e6ab01011fa9a', page: 1, perpage: 10 },
    { address: '0x3d36b71a4f8f9e00c1e1b342b4e6ab01011fa9a', page: 1, perpage: 25 },
  ];

  for (const address of addressList) {
    try {
      const tansactions = await getTransactionsFromWebsit(address);

      assert.equal(tansactions.length, 0);
    } catch (e) {
      console.error(e.message);
    }
  }
}

async function testMultiAddress() {
  const addressList = [
    { address: '0x2730ef3c0c180e7f7bcfca249c757421b208e333', page: 1, perpage: 10 },
    { address: '0x83697AC57B70A8d9cc20FEb2789741395cF04630', page: 1, perpage: 10 },
    { address: '0xbfAccAb3530992114258266D27fa34798C167b9B', page: 1, perpage: 10 },
    { address: '0xf31D0046D26AF057Ba51EF4B2E0372cF9aD990fb', page: 1, perpage: 10 },
    { address: '0x233b0A64E25B71b8e3DF0fA0AaFE61E1Bf52d340', page: 1, perpage: 10 },
  ];

  for (const address of addressList) {
    try {
      const tansactions = await getTransactionsFromWebsit(address);

      console.log('tansactions length', tansactions.length);

      assert.equal(tansactions.length > 0, true);
    } catch (e) {
      console.error(e.message);
    }
  }
}

test(testDataLargeThan25, testWrongAddress, testDataLessThan50, testMultiAddress);
