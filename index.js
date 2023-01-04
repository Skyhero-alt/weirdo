const express = require("express");
const mongoose = require("mongoose");
const Node = require("./schema");

const app = express();
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/weirdo", { useNewUrlParser: true });

app.get("/bfs/:id", async (req, res) => {
  const startNode = await Node.findById(req.params.id);
  if (!startNode) return res.send({ message: "Node with id not found :(" });

  const queue = [startNode];
  const visited = new Set();

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visited.add(currentNode._id);
    console.log(currentNode.value);

    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
  res.send({ message: "BFS completed" });
});

app.post("/add", async (req, res) => {
  const startNode = req.body.id;
  const value = req.body.value;
  const left = req.body.left;
  const right = req.body.right;
  // if (!startNode) return res.send({ message: "Node with id not found :(" });

  // if (left) {
  //   if (!startNode.left)
  //     return res.send({ message: "Node already has a left child" });
  // }

  // if (right) {
  //   if (!startNode.right)
  //     return res.send({ message: "Node already has a right child" });
  // }

  let node = await Node.create({
    id: startNode,
    value: value,
    left: left,
    right: right,
  });

  console.log(node);
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
