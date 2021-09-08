const mongoose = require("mongoose");

const PgSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  ac: {
    type: Boolean,
    required: true,
  },
  food: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

const Pg = mongoose.model("Pg", PgSchema);
module.exports = Pg;
