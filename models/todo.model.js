import {todoSchema} from "../schema/todo.schema.js"
import mongoose from "mongoose"

export const todoModel = mongoose.model('Todo',todoSchema);