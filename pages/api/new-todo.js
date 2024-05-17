import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://jonathan:rLvjt5YZu0Ny3Bhs@cluster0.rrqsftw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();

    const todosCollection = db.collection("todos");

    const result = await todosCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Task added" });
  }
};

export default handler;
