const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  left: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Node",
  },
  right: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Node",
  },
});

const Node = mongoose.model("Node", NodeSchema);

module.exports = Node;
