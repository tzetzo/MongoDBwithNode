const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  create(req, res, next) {
    Driver.create(req.body)
      .then(dr => {
        res.send(dr);
      })
      .catch(next); //transfers controll over to the error handling middleware(see app.js)
  }
};
