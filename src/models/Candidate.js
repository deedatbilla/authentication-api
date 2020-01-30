const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  
  //candidate id
  cid: {
    type: Number,
    required: true
  },
  profileImg: {
    type: String
  }
});

candidateSchema.statics.findByCid = async (cid) => {
  // Search for a candidate by id
  const candidate = await Candidate.findOne({ cid });
  if (!candidate) {
    throw new Error({ error: "Invalid Candidate" });
  }

  return candidate;
};

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;