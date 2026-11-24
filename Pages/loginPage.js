export class LoginPage{
    constructor(page)
    {
        this.page=page;
        this.username=page.locator();
        this.password=page.locator();
        this.loginbutton=page.locator();
    }

    async navigation()
    {
        await this.page.goTo("");
    }

    async login(username,password)
    {
        await this.username.fill(" ");
        await this.password.fill(" ");
        await this.loginbutton.click();
    }

}