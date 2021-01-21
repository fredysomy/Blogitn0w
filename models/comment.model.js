var m = require("mongoose");

var comscs = m.Schema;

var comschemma = new comscs({
  blgid: { type: String, required: true },
  comment: { type: String, required: true },
  comentator: { type: String, required: true },
});
var comsch = m.model("comsch", comschemma);

module.exports = comsch;
