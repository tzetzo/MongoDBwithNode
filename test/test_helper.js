const mongoose = require("mongoose");

before(done => {
  // guarantees test will be run after mongoose connects to MongoDB; run just once!
  mongoose.connect(
    "mongodb://localhost:27017/muber_test",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  );
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections; //mongoose lowercases the names of the collections!

  drivers
    .drop()
    .then(()=>drivers.ensureIndex({'location': '2dsphere'})) //re-creates the index; necessary to make our location queries
    .then(() => done())
    .catch(() => done());
});
