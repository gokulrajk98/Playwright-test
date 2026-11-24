import { test, expect } from '@playwright/test';

const baseUrl = "https://eventhub.rahulshettyacademy.com/";

async function loginAndGoToBooking(page) {
    await page.goto(baseUrl);
    await page.getByPlaceholder("you@email.com").fill("testplaywrighta1@gmail.com");
    await page.locator("#password").fill("Testing@123");
    await page.getByRole("button", { name: 'Sign In' }).click();
}

test('Refund eligibility', async ({ page }) => {
    await loginAndGoToBooking(page);

    //Booking one ticket
    await page.getByTestId("nav-events").click();
    const eventCard = page.locator("#event-card");
    await expect(eventCard.getByRole('link', { name: 'New Concert' })).toBeVisible();

    const noOfticketsinitially = await eventCard.filter({ hasText: 'New Concert' }).locator('span.text-emerald-600').textContent();

    console.log("Before booking", noOfticketsinitially);

    await eventCard.filter({ hasText: 'New Concert' }).locator("div[class*='flex']").locator("#book-now-btn").click();

    let tickcount = 1
    for (let i = 1; i < tickcount; ++i) {

        await page.getByRole("button", { name: '+' }).click();
    }

    await page.getByPlaceholder("Your full name").fill("Test User");

    await page.getByPlaceholder("you@email.com").fill("concertuser@gmail.com");

    await page.getByPlaceholder("+91 98765 43210").fill("1234567890");

    await page.getByRole("button", { name: 'Confirm Booking' }).click();

    //expect(await page.getByText("Booking Confirmed! 🎉")).toBeVisible();


    //2. Checking the refund eligibility
    await page.getByTestId("nav-bookings").click();
    await page.getByTestId("booking-card").first().getByRole("link", { name: 'View Details' }).click();

    await page.locator("#check-refund-btn").click();
    await expect(page.locator('#refund-spinner')).toBeVisible();

    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 5000 });

    const eligibityText = await page.locator('#refund-result');

    await expect(eligibityText).toBeVisible();

    const resultText = eligibityText.textContent();


    console.log(resultText);

    //await expect(resultText).hasText("Eligible for refund");
})

test('Refund not eligible', async ({ page }) => {
    await loginAndGoToBooking(page);
    //Booking three ticket
    await page.getByTestId("nav-events").click();
    const eventCard = page.locator("#event-card");
    await expect(eventCard.getByRole('link', { name: 'New Concert' })).toBeVisible();

    const noOfticketsinitially = await eventCard.filter({ hasText: 'New Concert' }).locator('span.text-emerald-600').textContent();

    console.log("Before booking", noOfticketsinitially);

    await eventCard.filter({ hasText: 'New Concert' }).locator("div[class*='flex']").locator("#book-now-btn").click();

    let tickcount = 3
    for (let i = 1; i < tickcount; ++i) {

        await page.getByRole("button", { name: '+' }).click();
    }

    await page.getByPlaceholder("Your full name").fill("Test User");

    await page.getByPlaceholder("you@email.com").fill("concertuser@gmail.com");

    await page.getByPlaceholder("+91 98765 43210").fill("1234567890");

    await page.getByRole("button", { name: 'Confirm Booking' }).click();

    //expect(await page.getByText("Booking Confirmed! 🎉")).toBeVisible();


    //2. Checking the refund eligibility
    await page.getByTestId("nav-bookings").click();
    await page.getByTestId("booking-card").first().getByRole("link", { name: 'View Details' }).click();

    await page.locator("#check-refund-btn").click();
    await expect(page.locator('#refund-spinner')).toBeVisible();

    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 5000 });

    const eligibityText = page.locator('#refund-result');

    await expect(eligibityText).toBeVisible();

    const resultText = eligibityText.textContent();

    console.log(resultText);



    //await expect(resultText).hasText("Not eligible for refund");*/

})