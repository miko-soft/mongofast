const Mongofast = require('../index.js');

const main = async () => {
  // connection
  const mo_uri = 'mongodb://user:pass@5.189.161.70:27017/dex8-freepool03';
  // const mo_uri = 'mongodb+srv://test:freedom@testni-cluster0.vveso.mongodb.net/test-db?retryWrites=true&w=majority';
  const mongofast = new Mongofast();
  await mongofast.connect(mo_uri);

  await new Promise(r => setTimeout(r, 2100));

  // delete the collection
  const resp = await mongofast.deleteCollection('probni-coll');
  console.log('resp::', resp);

  // disconnection
  await mongofast.disconnect();
};


main().catch(console.log);

