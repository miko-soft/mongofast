const Mongofast = require('../index.js');

const main = async () => {
  // connection
  const mo_uri = 'mongodb://user:pass@5.189.161.70:27017/dex8-freepool03';
  const mongofast = new Mongofast();
  await mongofast.connect(mo_uri);

  const collectionName = 'mongo-test';

  // compile 'mongo-testMD'
  await mongofast.compileModel(collectionName); // model compiled with the generic schema

  // take a model
  mongofast.useModel(collectionName);

  // remove the docs
  const moQuery = {}; // delete all docs
  const resp = await mongofast.deleteMulti(moQuery);
  console.log('deletedMulti resp::', resp);

  // disconnection
  await mongofast.disconnect();
};


main().catch(console.log);

