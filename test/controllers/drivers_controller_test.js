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
});
