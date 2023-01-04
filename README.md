# Q1. Design a database in mongo to store a binary tree. Write an Express API to do a breadth-first search on the database given a particular starting node. Submit your assignment to GitHub and share the link.

> This code can query the database for the binary tree data and do a breadth-first search on the database given a particular starting node.

#### Database Schema

```js
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
```

- Here 'value' stores the value of the node and left/right store the id of the child nodes

#### BFS API:

```js
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
```

Here `id` is the id of the node
