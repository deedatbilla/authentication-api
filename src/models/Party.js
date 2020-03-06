const mongoose = require("mongoose");

const PartySchema = mongoose.Schema({
  
  
  partyImg: {
    type: String
  },

  partyName: {
    type: String
  }
});



const Party = mongoose.model("Party", PartySchema);

module.exports = Party;
