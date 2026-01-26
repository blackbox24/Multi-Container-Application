import Router from "express";
import { getAllTasks, addTodo } from "../controllers/todo.controller.js";

const router = Router()


router.get("",getAllTasks);

router.post("",addTodo);

export default router;