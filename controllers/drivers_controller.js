const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  create(req, res) {
    Driver.create(req.body).then((dr) => {
      res.send(dr);
    })

  }
}
