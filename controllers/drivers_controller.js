const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  index(req, res, next) { // finds the drivers within 200km of the supplied location(lng, lat)
    const { lng, lat } = req.query;

    // query taken from http://thecodebarbarian.com/80-20-guide-to-mongodb-geospatial-queries
    Driver.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 200000 //200 km
        }
      }
    })
      .then(drivers => res.send(drivers))
      .catch(next);
  },
  create(req, res, next) {
    Driver.create(req.body)
      .then(driver => {
        res.send(driver);
      })
      .catch(next); //transfers controll over to the error handling middleware(see app.js)
  },
  edit(req, res, next) {
    Driver.findByIdAndUpdate(req.params.id, req.body, { new: true }) //"new: true" means the updated document should be returned
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },
  delete(req, res, next) {
    Driver.findByIdAndDelete(req.params.id)
      .then(driver => {
        res.status(204).send(driver);
      })
      .catch(next);
  }
};
