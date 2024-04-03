const mongoose = require("mongoose");
const mentorschema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  field: {
    type: String,
    required: true,
  },

  experience: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Mentor", mentorschema);
