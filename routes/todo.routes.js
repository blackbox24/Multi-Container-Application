import Router from "express";
import { getAllTasks, addTodo, getSingleTodo } from "../controllers/todo.controller.js";

const router = Router()


router.get("",getAllTasks);

router.post("",addTodo);

router.get("/:id",getSingleTodo);

export default router;