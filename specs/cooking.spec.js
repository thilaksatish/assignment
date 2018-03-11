var assert = require('chai').assert;
var CookingPage = require('../pageobjects/cooking.page');
var LoginPage = require('../pageobjects/login.page');
var SignUpPage = require('../pageobjects/signup.page');
var RecipePage = require('../pageobjects/recipe.page');

describe('Test Suite for cooking site navigation', function () {

    it('Verify Creating New User', function () {
        CookingPage.open();
        CookingPage.login();
        assert.isTrue(LoginPage.isLoaded(), "Login page is NOT loaded");

        LoginPage.signUpUser();
        assert.isTrue(SignUpPage.isLoaded(), "SignUp page is NOT loaded");

        var randomNum = Math.floor(Math.random() * 10);
        var emailAddress = "subramanian" + randomNum + "@outlook.com";

        SignUpPage.enterEmailAddress(emailAddress);
        SignUpPage.enterPassword("Assignment123!");
        SignUpPage.enterConfirmPassword("Assignment123!");
        SignUpPage.createAccount();

        assert.isTrue(CookingPage.isUserLoggedIn("subramanian" + randomNum), "User is NOT logged in. Please check your credentials.");
        assert.isTrue(CookingPage.isUserHomePageLoaded(), "User Cooking Home page is NOT loaded");

    });

    it('Verify Saving Recipe', function () {
        browser.reload();
        CookingPage.open();
        CookingPage.login();
        assert.isTrue(LoginPage.isLoaded(), "Login page is NOT loaded");

        LoginPage.enterUserName("thilak.satish@outlook.com");
        LoginPage.enterPassword("testing123");
        LoginPage.login();
        assert.isTrue(CookingPage.isUserLoggedIn("thilak.satish"), "User is NOT logged in. Please check your credentials.");

        CookingPage.goToRecipeBox();
        var beforeSaveRecipeCount = RecipePage.getRecipeCount();

        CookingPage.clickSiteLogo();
        CookingPage.saveRecipeCard();

        CookingPage.goToRecipeBox();
        assert.isTrue(RecipePage.isLoaded(), "Recipe page is NOT loaded");

        var afterSaveRecipeCount = RecipePage.getRecipeCount();

        assert.equal(afterSaveRecipeCount, beforeSaveRecipeCount + 1,  "Recipe count does NOT match");
        assert.equal(RecipePage.getSavedRecipeID(), CookingPage.recipeCardID, "Saved Recipe ID's do NOT match");

    });

    it('Verify Un-saving Recipe', function () {
        LoginPage.customLogin();
        assert.isTrue(CookingPage.isUserLoggedIn("thilak.satish"), "User is NOT logged in. Please check your credentials.");

        CookingPage.clickSiteLogo();
        CookingPage.saveRecipeCard();

        CookingPage.goToRecipeBox();
        assert.isTrue(RecipePage.isLoaded(), "Recipe page is NOT loaded");

        var beforeDeleteRecipeCount = RecipePage.getRecipeCount();
        console.log("BEFORE - " + beforeDeleteRecipeCount);

        try {
            browser.deleteRecipe(LoginPage.userID, CookingPage.recipeCardID);

            CookingPage.goToRecipeBox();
            assert.isTrue(RecipePage.isLoaded(), "Recipe page is NOT loaded");
            browser.waitUntil(function () {
                   if (RecipePage.getRecipeCount() < beforeDeleteRecipeCount)
                        return true;
                   else {
                        browser.refresh();
                   }
                }, 15000, 'Recipe Count not refreshed yet');


            var afterDeleteRecipeCount = RecipePage.getRecipeCount();
            console.log("AFTER - " + afterDeleteRecipeCount);
            assert.equal(afterDeleteRecipeCount, beforeDeleteRecipeCount - 1, "Recipe count does NOT match");

        } catch (e) {
            console.log(e);
        }
    });

});






