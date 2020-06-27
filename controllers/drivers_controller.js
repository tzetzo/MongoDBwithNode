const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
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
