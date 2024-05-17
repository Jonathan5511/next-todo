// pages/api/update-todo/[id].js

import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const id = req.query.id; // Get the ID from the URL parameter
    const { isCompleted } = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://jonathan:rLvjt5YZu0Ny3Bhs@cluster0.rrqsftw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();
    const todosCollection = db.collection("todos");

    // Update the "isCompleted" property for the specified todo item
    await todosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isCompleted } }
    );

    client.close();

    res.status(200).json({ message: "Task updated" });
  }
};

export default handler;
