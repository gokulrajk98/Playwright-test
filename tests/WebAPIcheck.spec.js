import { test, expect, request } from '@playwright/test';
let loginToken;
let orderID;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: { userEmail: "ashgf3541624@gmail.com", userPassword: "Password@123" }

        })

    expect(await (loginResponse.ok())).toBeTruthy();
    const loginJSON = await loginResponse.json();
    loginToken = loginJSON.token;

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:
            {
                orders: [
                    {
                         country: "Australia",
                        productOrderedId: "6960eae1c941646b7a8b3ed3"
                    }
                ]
            },
            headers: {
                Authorization: loginToken,
                "Content-Type": "application/json"

            }

        }
    )
    const orderJSON = await orderResponse.json();
    orderID = orderJSON.orders[0];
});

test('Api order', async ({ browser, page }) => {

    // page.addInitScript(value=>{
    //     window.localStorage.setItem('token',value);
    // },loginToken

    // );


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log("Order ID:", orderID);
})

