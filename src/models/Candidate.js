const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  //candidate id
  
  profileImg: {
    type: String
  }
});



const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
