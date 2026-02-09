import {todoModel} from "../models/todo.model.js";
import { ObjectId, BSON } from "mongodb";
import { todoInput, handleControllerError } from "../middleware/validate.js";

export const getAllTasks = async (req, resp) => {
  try {
    const tasks = await todoModel.find()

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

        await todoModel.create({
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
        const todo = await todoModel.findOne({_id:id}).exec();
        if(todo === null){
            return resp.status(404).json({"message":"Not Found",data:[]})
        }
        return resp.status(200).json({"message":"Fetch successful",data:todo});
    }catch(error){
        if ( error instanceof BSON.BSONError || error.name === "CastError"){
            console.error(error.message)
            return resp.status(404).json({"message":"Not found",data:[]});
        }
        console.error(error)
        return resp.status(400).json({"message":"Error occurred",})
    }
}

export const updateTodo = async(req, resp) => {
    try{
        const {id} = req.params;
        const {is_complete } = req.body;
        const query = {
            _id: id
        }
        const todo = await todoModel.findOneAndUpdate(query,{is_complete});
        
        // if(!todo.matchedCount){
        //     return resp.status(400).json({"message":"Failed to update data",reason: "No match found"})
        // }

        return resp.status(200).json({"message":"update successful",});
    }catch(error){
        if ( error instanceof BSON.BSONError || error.name === "CastError"){
            console.error(error.message)
            return resp.status(404).json({"message":"Not found",data:[]});
        }
        return resp.status(500).json({"message":"Error occurred",error:error})
    }
}

export const deleteTodo = async(req, resp) => {
    try{
        const {id} = req.params;
        const query = {
            _id: id,
        }
        const todo = await todoModel.deleteOne(query);
        console.log(todo)
        if(!todo.deletedCount){
            return resp.status(400).json({"message":"Failed to delete data",reason: "No match found"})
        }

        return resp.status(200).json({"message":"delete successful",});
    }catch(error){
        if ( error instanceof BSON.BSONError ||  error.name === "CastError"){
            console.error(error.message)
            return resp.status(404).json({"message":"Not found",data:[]});
        }
        return resp.status(500).json({"message":"Error occurred",error})
    }
}