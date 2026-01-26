import { expect, test } from "vitest";

function sampletest(){
    return "Hello world"
}

test("display hello world", ()=>{
    expect(sampletest()).toBe("Hello world")
})