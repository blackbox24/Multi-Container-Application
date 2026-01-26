import { getTodosCollection, todosCollection } from "../config/db.js";
import { ObjectId, BSON } from "mongodb";
import { todoInput, handleControllerError } from "../middleware/validate.js";

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
        const {body} = await todoInput.parseAsync(req);
        
        if(!body){
            return resp.status(400).json({"message":""})
        }

        const cursor = await todosCollection;

        await cursor.insertOne({
            title: body.title,
            is_complete: body.is_complete || false,
            created_At: Date()
        })
        console.log("Successfully insert data")
        return resp.status(201).json({message:"Successfully added todo"})
    } catch (error) {
        if (error instanceof Error) {
            return handleControllerError(error, resp, "Add Todo");
        }
        return resp.status(500).json({error:error})
    }
} 


export const getSingleTodo =  async(req, resp) => {
    try{
        const {id} = req.params;
        const query = {
            _id: new ObjectId(id),
        }
        const cursor = await todosCollection;
        const todo = await cursor.findOne(query);
        console.log(todo.is_complete)

        return resp.status(200).json({"message":"Fetch successful",data:todo});
    }catch(error){
        if ( error instanceof BSON.BSONError){
            console.error(error)
            return resp.status(404).json({"message":"Not found",data:[]});
        }
        return resp.status(400).json({"message":"Error occurred"})
    }
}

export const updateTodo = async(req, resp) => {
    try{
        const {id} = req.params;
        const {is_complete } = req.body;
        const query = {
            _id: new ObjectId(id),
        }
        const cursor = await todosCollection;
        const todo = await cursor.updateOne(query,{
            $set: {is_complete}
        });
        
        if(!todo.matchedCount){
            return resp.status(400).json({"message":"Failed to update data",reason: "No match found"})
        }

        return resp.status(200).json({"message":"update successful",});
    }catch(error){
        if ( error instanceof BSON.BSONError){
            console.error(error)
            return resp.status(404).json({"message":"Not found",data:[]});
        }
        return resp.status(500).json({"message":"Error occurred",error})
    }
}

export const deleteTodo = async(req, resp) => {
    try{
        const {id} = req.params;
        const query = {
            _id: new ObjectId(id),
        }
        const cursor = await todosCollection;
        const todo = await cursor.deleteOne(query);
        console.log(todo)
        if(!todo.deletedCount){
            return resp.status(400).json({"message":"Failed to update data",reason: "No match found"})
        }

        return resp.status(200).json({"message":"delete successful",});
    }catch(error){
        if ( error instanceof BSON.BSONError){
            console.error(error)
            return resp.status(404).json({"message":"Not found",data:[]});
        }
        return resp.status(500).json({"message":"Error occurred",error})
    }
}