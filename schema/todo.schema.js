import mongoose from "mongoose";
import { boolean } from "zod";

// Todo Search
export const todoSchema = new mongoose.Schema(
    {
        title: String,
        is_complete: boolean,
        created_At: Date
    }
)
