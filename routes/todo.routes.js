import Router from "express";
import { getAllTasks, addTodo, getSingleTodo, updateTodo,deleteTodo } from "../controllers/todo.controller.js";

const router = Router()


router.get("",getAllTasks);

router.post("",addTodo);

router.get("/:id",getSingleTodo);

router.put("/:id",updateTodo);

router.delete("/:id",deleteTodo);

export default router;