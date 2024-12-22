import {test, expect} from "@playwright/test"
import exp from "constants";
import { request } from "http"

test("GET /products", async ({request }) => {
    const apiUrl="https://api.practicesoftwaretesting.com";
    const response= await request.get(apiUrl+ "/products");
    expect(response.status()).toBe(200);
    const body= await response.json();
    // console.log(body);
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);
});
test("POST /users/login", async ({request }) => {
    const apiUrl="https://api.practicesoftwaretesting.com";
    const response= await request.post(apiUrl+ "/users/login", {
        data:{
            email: "customer@practicesoftwaretesting.com",
            password:"welcome01",
        },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.access_token).toBeTruthy();
    console.log(body);
});