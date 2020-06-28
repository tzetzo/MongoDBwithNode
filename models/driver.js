const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema to store a GeoJSON point;
// taken from mongoosejs.com/docs/geojson.html
const PointSchema = new Schema({
  type: { type: String, enum: ["Point"], required: true },
  coordinates: { type: [Number], required: true } //array of 2 numbers - lat & lng
});

const DriverSchema = new Schema({
  email: { type: String, required: true },
  driving: { type: Boolean, default: false },
  location: { // in DB -> location: { coordinates:[-122,49], type: "Point"}
    type: PointSchema, //subdocument using the above schema
    index: '2dsphere'
  }
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
