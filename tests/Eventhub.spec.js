import {test,expect} from '@playwright/test';

/*test('Eventhub registration',async({browser,page})=>
{
    await page.goto("https://eventhub.rahulshettyacademy.com/login");

    //Clicking on Register
    await page.getByRole('link', { name: 'Register' }).click();

    await page.getByText("Create your account").waitFor();

    await page.getByPlaceholder("you@email.com").fill("testplaywrighta1@gmail.com");
    await page.locator("#register-password").fill("Testing@123");
    await page.getByPlaceholder("Repeat your password").fill("Testing@123");

    await page.getByRole("button",{name:'Create Account'}).click();

});*/

test('Eventhub Login', async({browser, page})=>
{
    page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.getByPlaceholder("you@email.com").fill("testplaywrighta1@gmail.com");
    await page.locator("#password").fill("Testing@123");
    await page.getByRole("button",{name:'Sign In'}).click();

    await page.waitForLoadState('networkidle');

    await page.getByRole("button",{name:'Admin'}).click();
    await page.getByRole("navigation").getByRole("link",{name:'Manage Events'}).click();

    await page.getByLabel("Title").fill("New Concert");
    await page.getByPlaceholder("Describe the event…").fill("Welcome to the Great Karikalan Show");

    await page.getByLabel("Category").selectOption("Concert");

    await page.locator("#city").fill("Bangalore");

    await page.getByLabel("Venue").fill("Nice Grounds");

    await page.locator('input[type="datetime-local"]').fill('2026-12-15T18:30');

    await page.getByLabel("Price ($)").fill("");

    await page.getByLabel("Price ($)").fill("2500")

    await page.getByLabel("Total Seats").fill("200");

    await page.getByRole("button",{name:'Add Event'}).click();

    await page.getByRole("link",{name:'Events'}).first().click();

    const eventCard= page.locator("#event-card");

    await expect(eventCard.getByRole('link', { name: 'New Concert' })).toBeVisible();

    const noOfticketsinitially = await eventCard.filter({hasText:'New Concert'}).locator('span.text-emerald-600').textContent();

    console.log("Before booking",noOfticketsinitially);

    await eventCard.filter({hasText:'New Concert'}).locator("div[class*='flex']").locator("#book-now-btn").click();

    let tickcount=1
    for(let i=1;i<tickcount;++i)
    {

       await page.getByRole("button",{name:'+'}).click(); 
    }

    await page.getByPlaceholder("Your full name").fill("Test User");

    await page.getByPlaceholder("you@email.com").fill("concertuser@gmail.com");

    await page.getByPlaceholder("+91 98765 43210").fill("1234567890");

    await page.getByRole("button",{name:'Confirm Booking'}).click();

    expect(await page.getByText("Booking Confirmed! 🎉")).toBeVisible();

    await page.getByRole("link",{name:'Events'}).first().click();

    await page.reload();

    const noOfticketavailable = await eventCard.filter({hasText:'New Concert'}).locator('span.text-emerald-600').innerText();

    console.log("After booking tickets available:",noOfticketavailable);

    
}
)

