# @mikosoft/mongofast
> Fast way to start with mongodb. Mongoose schema, model and functions ready to manage database, collection and document.

Mongofast is a helper to manage MongoDB database. It can connect/disconnect to the mongo server, create schema and model and save, list, update and delete documents. Also it can delete database and collection and list db collections.


## Installation
```bash
$ npm install --save @mikosoft/mongofast
```


## Example
```js
/*** NodeJS script ***/
const Mongofast = require('@mikosoft/mongofast');

const main = async () => {
  // connection
  const mo_uri = 'mongodb://user:pass@55.185.161.70:27017/dex8-freepool03';
  const mongofast = new Mongofast();
  await mongofast.connect(mo_uri);

  const collectionName = 'mongo-test';

  // compile 'mongo-testMD'
  const opts = {timestamps: {createdAt: 'created_at',updatedAt: false}};
  const moSchema = {
    first_name: { type: String, required: 'Field first_name is required' },
    age: Number,
  };
  await mongofast.compileModel(collectionName, moSchema, opts);

  // take a model
  mongofast.useModel(collectionName);

  // create new doc
  const doc = {
    url: 'http://saved.com',
    text: 'Lorem ipsum SAVED',
    depth: 55
  };
  await mongofast.save(doc)
    .then(docNew => {
      console.log(`New doc saved to ${collectionName} collection:`);
      console.log(docNew);
      mongofast.disconnect();
    });

  // disconnection
  await mongofast.disconnect();
};


main().catch(console.log);
```

Other examples are in /tests/ folder.


## Generic Schema
The library is using generic (empty & not strict) mongoose schema but user can define any schema.
```
const collection = 'generic';

// options
const opts = {
  collection, // default collection
  _id: true, // disable _id
  id: false, // set virtual id property
  autoIndex: true, // auto-create indexes in mognodb collection on mongoose restart
  minimize: true, // remove empty objects
  // safe: true, // pass errors to callback
  strict: false, // values not defined in schema will not be saved in db
  validateBeforeSave: true, // validate doc before saving. prevent saving false docs
  timestamps: { // create timestamps for each doc 'created_at' & 'updated_at'
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  new: true,
  // skipVersioning: { myProp: true }, // prevent changing version __v when 'myProp' is updated
  // versionKey: '_myV', // replace __v with _myV (not needed in most cases)
};


// mongoose schema
const moSchema = new Schema({}, opts);
```



## API

#### constructor()


#### async connect(mo_uri) :Promise
Connects to the mongoDB server via mongo URI. Used database is also defined.
*mongofast.connect('mongodb+srv://user:pass@cluster0-n4qix.mongodb.net/dbname?retryWrites=true&w=majority')*

#### async disconnect() :Promise
Disconnect from already connected mongoDB server via mongo URI.
*mongofast.disconnect()*

#### deleteDatabase() :Promise[boolean]
Remove whole database.
*mongofast.deleteDatabase()*

#### showCollections() : Promise[array]
Lists all collections in the database.
*mongofast.showCollections()*

#### deleteCollection(collectionName) :Promise[boolean]
Removes collection from the database.
*mongofast.deleteCollection('companies')*


#### async compileModel(moSchema) :Promise[void]
Compiles mongoose model. Parameter must be valid mongoose schema. The model object is pushed into the "this.compiledModels" array.
*mongofast.compileModel(moSchema)*

#### useModel(collectionName) :void
Takes model on which operations will be performed. It defines on which collection documents will be added, listed, updated, removed ...
*mongofast.useModel(collectionName)*

#### save(doc) :Promise[object]
Adds document in collection. Mongoose save function is used.
*mongofast.save({x: 23, y: 'something'})*

#### add(doc | docs) :Promise[object]
Adds document in collection. Parameter can be a single object or array of objects. Mongoose create function is used.
*mongofast.add({x: 23, y: 'something'})*
*mongofast.add([{x: 23, y: 'something'}, {x: 25, y: 'aaa'}])* - database called two times

#### insertMulti(docs, insOpts) :Promise[object]
Bulk insertions. While add() will send multiple db requests for every doc, this method will call database only once. Mongoose create function is used.
```
const insOpts = {
  ordered: false, // (true) if true, will fail fast on the first error encountered and don't execute the remaining writes
  rawResult: true, // (false) will return inserted docs
  lean: false, // (false) if true skip schema validation
  limit: null // (null) limits the number of documents being processed
};

mongofast.insertMulti([{x: 23, y: 'something'}, {x: 25, y: 'aaa'}], insOpts) // database called once
```

#### list(moQuery, limit, skip, sort, select) :Promise[object]
List and count documents from collection by using mongo search query criteria. Mongoose find function is used.
*mongofast.list({x: {$gt3: 3}}, 5, 0, '-x', '-_id')*

#### listFast(moQuery, limit, skip, sort, select) :Promise[object]
List documents from collection by using mongo search query criteria. This is useful for big collections because list() method is using count and is much slower. Mongoose find function is used.
*mongofast.listFast({x: {$gt3: 3}}, 5, 0, '-x', '-_id')*

#### getOne(moQuery, sort, select) :Promise[object]
Fetch one document from collection. Mongoose findOne function is used.
*mongofast.getOne({x: 3})*

#### deleteOne(moQuery) :Promise[object]
Delete just one document. Mongoose findOneAndDelete function is used.
*mongofast.deleteOne({x: 3})*

#### deleteMulti(moQuery) :Promise[object]
Delete multiple documents. Mongoose deleteMany function is used.
*mongofast.deleteMulti({x: {$lt: 5}})*

#### editOne(moQuery, docNew, updOpts) :Promise[object]
Update one document. Mongoose findOneAndUpdate function is used.
```
const updOpts = {
  new: true, // return updated document as 'result'
  upsert: false, // whether to create the doc if it doesn't match (false)
  runValidators: false, // validators validate the update operation against the model's schema
  strict: false, // values not defined in schema will not be saved in db (default is defined in schema options, and can be overwritten here)
  // sort: {created_at: -1} // if multiple results are found, sets the sort order to choose which doc to update
}
mongofast.editOne({x: 3}, {x: 5, y: 'some thing'}, updOpts)
```

#### countDocs(moQuery) :Promise[number]
Count documents according to the given mongo query. Returned value is a number. Mongoose countDocuments function is used.
*mongofast.count({x: {$gt: 10}})*




### License
The software licensed under [MIT](LICENSE).
