const Mongofast = require('../index.js');

const main = async () => {
  // mongo instance
  const mongofast = new Mongofast();

  // test connection
  const mo_uri = 'mongodb://user:pass@5.189.161.70:27017/dex8-freepool03';
  await mongofast.connect(mo_uri);

  await new Promise(r => setTimeout(r, 2100));

  // test disconnection
  await mongofast.disconnect();
};


main().catch(console.log);

