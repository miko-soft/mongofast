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

  // create new doc
  const doc = {
    url: 'http://added.com',
    text: 'Lorem ipsum',
    depth: 55
  };
  mongofast.add(doc)
    .then(docNew => {
      console.log(`New doc added to dex8-freepool03/${collectionName} collection:`);
      console.log(docNew);
      mongofast.disconnect();
    });

  // disconnection
  await mongofast.disconnect();
};


main().catch(console.log);

