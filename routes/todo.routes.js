import Router from "express";
import { getAllTasks, addTodo, getSingleTodo, updateTodo } from "../controllers/todo.controller.js";

const router = Router()


router.get("",getAllTasks);

router.post("",addTodo);

router.get("/:id",getSingleTodo);

router.patch("/:id",updateTodo);

export default router;