import { getTodosCollection, todosCollection } from "../config/db.js";

export const getAllTasks = async (req, resp) => {
  try {
    const cursor = await todosCollection;

    const tasks = await cursor
      .find(
        {},
        { projection: { _id: 1, title: 1, is_complete: 1, created_At: 1 } },
      )
      .toArray();
    console.log(tasks);
    return resp
      .status(200)
      .json({ message: "Successfully fetch data", data: tasks });
  } catch (error) {
    console.error("Error occurred ", error);
    resp.status(400).json({ err: error });
  }
};

export const addTodo = async (req, resp) => {
    try {
        const {title,} = req.body;
        const cursor = await todosCollection;

        await cursor.insertOne({
            title: title,
            is_complete: req.body.is_complete || false,
            created_At: Date()
        })
        console.log("Successfully insert data")
        return resp.status(201).json({message:"Successfully added todo"})
    } catch (error) {
        console.error("Error occurred: ", error)
        return resp.status(400).json({error:error})
    }
} 
