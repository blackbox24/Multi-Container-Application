import * as dotenv from "dotenv"
import express from "express"

dotenv.config()
const app = express();
const PORT = process.env.PORT || "5000";

app.use(express.json())

app.get("/",async(req,resp)=>{
    console.log("Healthy")
    resp.status(200).json({"message":"Server is healthy"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})