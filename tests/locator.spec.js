import {test,expect} from '@playwright/test';
test('Locators check', async({browser,page})=>
{
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//Username/Email
await page.getByPlaceholder("email@example.com").fill("ashgf3541624@gmail.com");
//Password
await page.getByPlaceholder("enter your passsword").fill("Password@123");
//Clicking on Login button
await page.getByRole("button",{name:'Login'}).click();

//Await for new page

await page.waitForLoadState('networkidle');

await page.locator(".card-body").first().waitFor();


//Adding Adidas to add to cart
await page.locator(".card-body").filter({hasText: 'Adidas original'}).getByRole("button",{name:'Add to Cart'}).click();

await page.getByRole("listitem").getByRole("button",{name:'cart'}).click();

await page.waitForLoadState('networkidle');
await page.getByText("My Cart").waitFor();

//Clicking on checkout button
await page.getByRole("button",{name:'Checkout'}).click();





await page.getByPlaceholder("Select Country").pressSequentially("us");

await page.getByRole("button",{name:'Cyprus'}).click();



await page.getByText("Place Order ").click();

await expect(page.getByText("Thankyou for the order. ")).toBeVisible();

const ordernumber= await page.locator("td label").last().textContent();

const orderId=ordernumber.match(/[a-z0-9]+/i)?.[0].trim();

console.log("Order ID: ", orderId);

await page.getByRole("button",{name:'Orders'}).click();

const rows=await page.locator("tr");
const matchingRow = rows.filter({
    has: page.locator("th", { hasText: orderId })
});

matchingRow.getByRole('button', { name: 'View' }).click();


await expect(page.getByText(" order summary ")).toBeVisible();

await page.pause();
});

