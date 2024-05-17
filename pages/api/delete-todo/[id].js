// pages/api/delete-todo/[id].js

import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const id = req.query.id; // Get the ID from the URL parameter

    const client = await MongoClient.connect(
      "mongodb+srv://jonathan:rLvjt5YZu0Ny3Bhs@cluster0.rrqsftw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();
    const todosCollection = db.collection("todos");

    // Delete the specified todo item
    const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      // Successful deletion
      res.status(200).json({ message: "Task deleted" });
    } else {
      // Task with the given ID was not found
      res.status(404).json({ message: "Task not found" });
    }

    client.close();
  }
};

export default handler;
