import * as dotenv from "dotenv"
import express from "express"
import {db} from "./config/db.js";

dotenv.config()
const app = express();
const PORT = process.env.PORT || "5000";

app.use(express.json())

app.get("/",async(req,resp)=>{
    console.log("Healthy")
    resp.status(200).json({"message":"Server is healthy"})
})

app.get('/test-db',async(req,resp)=>{
    try {
        const collections = await db.collections()
        console.log(collections)
        resp.status(200).json({"collections":collections})
    } catch (error) {
        console.error(`Error occurred: ${error}`)
        resp.status(500).json({"error":error})
    }
})
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})

