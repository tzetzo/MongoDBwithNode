const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  it("handles a POST request to /api/drivers and creates new driver", done => {
    Driver.countDocuments().then(count => {
      request(app)
        .post("/api/drivers")
        .send({ email: "john1@yahoo.com" })
        .end((err, response) => {
          Driver.countDocuments().then(c => {
            assert(count + 1 === c);
            done();
          });
        });
    });
  });

  it("handles a PUT request to /api/drivers/:id and updates a driver", done => {
    const driver = new Driver({ email: "bobafett@yahoo.com" });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end((err, resp) => {
          Driver.findOne({ email: "bobafett@yahoo.com" }).then(drv => {
            assert(drv.driving === true);
            done();
          });
        });
    });
  });

  it("handles a DELETE request to /api/drivers/:id and deletes a driver", done => {
    const driver = new Driver({ email: "bobafett@yahoo.com" });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end((err, resp) => {
          Driver.findOne({ email: "bobafett@yahoo.com" }).then(drv => {
            assert(drv === null);
            done();
          });
        });
    });
  });
});
