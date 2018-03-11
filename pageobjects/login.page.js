let ModalPage = require('./modal.page');

class LoginPage extends ModalPage{

    constructor() {
        super();
        this.loginText = "Log in to NYT Cooking";
        this.session = "";
        this.userID = "";
    }

    /**
     * page elements
    */
    get signUp()  { return browser.element('.nytc---regimodal---tabButton'); }
    get userName() { return browser.element('input[type=email][name=userid]'); }
    get password() { return browser.element('input[type=password][name=password]'); }
    get loginButton() { return browser.element('div.nytc---regimodal---buttonContainer span[role=button]'); }

    /**
     * page methods
    */
    /**
     * Method to get login title
     * @param none
     * @return string
    */
    getLoginTitle() {
        return super.sideModalTitle.getText();
    }

    /**
     * Method to validate if login page is loaded
     * @param none
     * @return boolean
    */
    isLoaded() {
        if (super.isLoaded()) {
            return super.getSideModalTitle().includes(this.loginText);
        }
    }

    /**
     * Method to input user name
     * @param userName to input
     * @return none
    */
    enterUserName(userNameValue) {
        this.userName.setValue(userNameValue);
    }

    /**
     * Method to input password
     * @param password to input
     * @return none
    */
    enterPassword(passwordValue) {
        this.password.setValue(passwordValue);
    }

    /**
     * Method to login to user recipe home
     * @param none
     * @return none
    */
    login() {
        if (this.loginButton.waitForExist()) {
                this.loginButton.click();
                this.session = browser.execute('return window.initState.user');
                this.userID = this.getUserID();
            }
    }

    /**
     * Method to get user session ID
     * @param none
     * @return string - userID
    */
    getUserID() {
        if (typeof(this.session != 'undefined')) {
            var userID = this.session['value']['id'];
            return userID;
         }
    }

    /**
     * Method to go to sign up user page
     * @param none
     * @return none
    */
    signUpUser() {
        if (this.signUp.waitForExist())
            this.signUp.click();
    }

    /**
     * Method to custom login using login API
     * @param none
     * @return none
    */
    customLogin() {
        browser.maximizeWindow();
        browser.url('https://cooking.nytimes.com/' + '85175883' + '/all?login=email&auth=login-email');
        browser.customLogin();
    }
}

module.exports = new LoginPage();