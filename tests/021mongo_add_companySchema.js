const Schema = require('mongoose').Schema;
const Mongofast = require('../index.js');

const collectionName = 'company-test_First';

// schema
const options = {
  collection: collectionName, // default collection
  _id: true, // disable _id
  id: false, // set virtual id property
  autoIndex: true, // auto-create indexes in mognodb collection on mongoose restart
  minimize: true, // remove empty objects
  // safe: true, // pass errors to callback
  strict: true, // values not defined in schema will not be saved in db
  validateBeforeSave: true, // validate doc before saving. prevent saving false docs
  timestamps: { // create timestamps for each doc 'created_at' & 'updated_at'
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  new: true,
  // skipVersioning: { myProp: true }, // prevent changing version __v when 'myProp' is updated
  // versionKey: '_myV', // replace __v with _myV (not needed in most cases)
};

const Sch = new Schema({
  // fields from the CSV file
  name: { type: String, required: 'Company name is required.' },
  address: String,
  employees: Number
}, options);

const SchCloned = Sch.clone(); // test with the cloned schema



const main = async () => {
  // connection
  const mo_uri = 'mongodb://user:pass@5.189.161.70:27017/dex8-freepool03';
  const mongofast = new Mongofast();
  await mongofast.connect(mo_uri);

  // compile 'mongo-test_FirstMD'
  await mongofast.compileModel(Sch); // model compiled with the company schema
  // await mongofast.compileModel(SchCloned); // model compiled with the company schema

  // take a model
  mongofast.useModel(collectionName);

  // create new doc
  const doc = {
    name: 'Test Ltd',
    address: 'Lorum Street 21',
    employees: 55
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


