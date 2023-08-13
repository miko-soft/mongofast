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

  // edit a doc
  const moQuery = { url: 'http://added.com' };
  const docNew = { url: 'http://addizmjena.net' };
  const doc = await mongofast.editOne(moQuery, docNew);
  console.log('edited doc::', doc);

  // disconnection
  await mongofast.disconnect();
};


main().catch(console.log);

