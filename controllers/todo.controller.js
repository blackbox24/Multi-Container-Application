import { todosCollection } from "../config/db.js";

export const getAllTasks = async (req, resp) => {
  try {
    const projection = {_id:0,title:1,is_complete:1}
    const cursor = await todosCollection;

    const tasks = await cursor.find({},projection).toArray()
    console.log(tasks);
    return resp
      .status(200)
      .json({ message: "Successfully fetch data", data: tasks });
  } catch (error) {
    console.error("Error occurred ", error);
    resp.status(400).json({ err: error });
  }
};
