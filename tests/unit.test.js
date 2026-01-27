import { describe, expect, it } from "vitest";
import supertest from "supertest";
import app from "../index"

describe("Health Checks", ()=>{
    it("GET / should return status 200 and a message", async()=>{
        const response = await supertest(app).get("/");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Server is healthy")
    })
})