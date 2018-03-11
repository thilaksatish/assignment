
class CookingPage {

    constructor() {
        this.recipeOfTheDayID = "";
        this.recipeCardID = "";
    }

    /**
     * page elements
     */
    get siteLogo() { return browser.element('a.nytc---sitelogo---logoWrapper div.nytc---sitelogo---logo'); }
    get loginButton() { return browser.element('div.nytc---loginbtn---loginBtn span.nytc---loginbtn---navSubLabel'); }
    get recipeBox() {return browser.element('div.nytc---loginbtn---loginBtn a.nytc---navbtn---login-child'); }
    get loginUserNameLabel() { return browser.element('.nytc---loginbtn---navSubLabel'); }
    get userSettingsIcon() { return browser.element('.nytc---signupbtn---loggedIn'); }
    get subscribeButton() { return browser.element('.nytc---subscribenavbtn---loggedOut'); }
    get articleSaveRecipeOfTheDay() { return browser.element('article[data-analytics-category="Recipe of the Day"]'); }
    get articleSaveRecipeOfTheDayButton() { return browser.element('article[data-analytics-category="Recipe of the Day"] div.save-group'); }
    get articleSaveRecipeCard() { return browser.element('article.card.recipe-card:not(.saved):first-child'); }
    get articleSaveRecipeCardButton() { return browser.element('article.card.recipe-card:not(.saved):first-child div.control-save-btn'); }

    /**
     * page methods
    */
    /**
     * Method to go to NYT cooking base URL
     * @param none
     * @return none
    */
    open() {
        browser.maximizeWindow();
        browser.url('/');
    }

    /**
     * Method to click NYT cooking website logo
     * @param none
     * @return none
    */
    clickSiteLogo() {
        if (this.siteLogo.waitForExist()) {
            this.siteLogo.click();
        }
    }

    /**
     * Method to take user to login page
     * @param none
     * @return none
    */
    login() {
         if (this.loginButton.waitForExist()) {
            this.loginButton.click();
         }
    }

    /**
     * Method to go to user recipe inbox
     * @param none
     * @return none
    */
    goToRecipeBox() {
        if (this.recipeBox.waitForExist()) {
            this.recipeBox.click();
        }
    }

    /**
     * Method to get logged in user name
     * @param none
     * @return string - loggedInUser
    */
    getUserName() {
        var loggedInUser = this.loginUserNameLabel.getText();
        console.log("User logged in as " + loggedInUser);
        return loggedInUser;
    }

    /**
     * Method to validate if user is logged in
     * @param userName to check
     * @return boolean
    */
    isUserLoggedIn(userName) {
        console.log("Expected user name " + userName);
        return this.getUserName().includes(userName);
    }

    /**
     * Method to validate if user home page is loaded
     * @param none
     * @return boolean
    */
    isUserHomePageLoaded() {
        return this.userSettingsIcon.waitForExist();
    }

    /**
     * Method to get recipe of the day ID
     * @param none
     * @return string
    */
    getRecipeOfTheDayID() {
        var recipeID = this.articleSaveRecipeOfTheDay.getAttribute('data-id');
        console.log("Recipe of the Day ID - " + recipeID);
        return recipeID;
    }

    /**
     * Method to get recipe ID saved from the general recipe card
     * @param none
     * @return string
    */
    getRecipeID() {
            var recipeID = this.articleSaveRecipeCard.getAttribute('data-id');
            console.log("General Recipe ID - " + recipeID);
            return recipeID;
    }

    /**
     * Method to save recipe of the day
     * @param none
     * @return none
    */
    saveRecipeOfTheDay() {
        if (this.articleSaveRecipeOfTheDayButton.waitForExist()) {
            this.recipeOfTheDayID = this.getRecipeOfTheDayID();
            this.articleSaveRecipeOfTheDayButton.click();
            //browser.debug();
        }
    }

    /**
     * Method to save recipe from the list of recipe cards
     * @param none
     * @return none
    */
    saveRecipeCard() {
        this.articleSaveRecipeCardButton.scroll();
         if (this.articleSaveRecipeCardButton.waitForExist()) {
            this.recipeCardID = this.getRecipeID();
            this.articleSaveRecipeCardButton.click();
            //browser.debug();
         }
    }
}

module.exports = new CookingPage();