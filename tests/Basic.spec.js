import {test, expect} from '@playwright/test';

   test('Login', async ({ browser, page }) => 
{
   const selectionProduct="iphone 13 pro";
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill("ashgf3541624@gmail.com");
   await page.locator("#userPassword").fill("Password@123");
   await page.locator("input[type='submit']").click();
   await page.waitForLoadState("networkidle");
   await page.locator(".card-body b").first().waitFor();
   console.log(await page.locator(".card-body b").nth(2).textContent());
   const product=await page.locator(".card-body");

   const count= await product.count();
   console.log("Count:",+count);

   for (let i=0; i < count ; ++i)
   {
      
      
      const productName = await product.locator("b").nth(i).textContent();
      
      if(productName === selectionProduct)
      {

         await product.locator("text = Add To Cart").nth(i).click();
         console.log("Product added to cart");
         break;
      }
      
   }
   await page.locator('[routerLink="/dashboard/cart"]').click();
   await page.locator(".cartSection").first().waitFor();
   const bool=await page.locator("li:has-text('iphone 13 pro')").isVisible();
   expect(bool).toBeTruthy();

   //Checkout button click action
   await page.locator("button[type='button']").last().click();

   await page.locator("input[type='text']").first().waitFor();

   await page.locator("input[type='text']").first().fill(" ");
   //Credit card information
   await page.locator("input[type='text']").first().fill("1111 1111 1111 1111");
   //ExpiryDate - Month
   await page.locator("select[class*=input]").first().selectOption("02");
   //ExpiryDae - Year
   await page.locator("select[class*=input]").last().selectOption("29");
   //CVV
   await page.locator("input[class='input txt']").first().fill("221");
   //Name of card
   await page.locator("input[class='input txt']").last().fill("Gokul Raj");
   //Couponbox
   await page.locator("input[name='coupon']").fill("rahulshettyacademy");
   //Clicking on apply coupon
   //await page.locator("button[type='submit']").click();

    //await page.pause();
   await page.waitForLoadState('load');
   //Entering value on dynamic dropdown
   //await page.locator("input[placeholder='Select Country']").waitFor();

   await page.locator("input[placeholder='Select Country']").pressSequentially("ind");

   //await page.pause();
   
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();

   console.log(await dropdown.allTextContents());

   const dpCount=await dropdown.count();

   for(let i=0 ; i<count; ++i)
   {
      const name=await dropdown.locator("button").nth(i).textContent();
      if(name === " India")
      {
         await dropdown.locator("button").nth(i).click();
         break;
      }
     
   }

   //Clicking on place order button
   await page.locator("a[class*='btnn']").click();

   //Next page wait even

   await page.locator(".hero-primary").waitFor();

   const orderId=await page.locator("tr[class='ng-star-inserted']").first().textContent();

   const splitid=orderId.split(" ");

   console.log("Order Number:",splitid[2]);

  // await page.pause();

  //Clicking on Orders button
await page.locator('[routerLink="/dashboard/myorders"]').first().click();

//Waiting for the page to load
await page.locator("h1[class='ng-star-inserted']").waitFor();

const rows=await page.locator("tbody tr");

console.log("It is in order page");

for(let i=0 ; i<await rows.count(); ++i)
{
   const num=await rows.nth(i).locator("th").textContent();
   if(orderId.includes(num))
   {
      await rows.nth(i).locator("button").first().click();
      break;
   }

}

const orderdetails=await page.locator(".col-text").textContent();
console.log(orderdetails);
expect(orderId.includes(orderdetails)).toBeTruthy();
await page.pause();



});

   

   

