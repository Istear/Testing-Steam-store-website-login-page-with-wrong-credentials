const {Builder, By , Key, util, WebDriver, until} = require('selenium-webdriver');
require ('chromedriver');


async function testCase(){
    //driver
    let driver = await new Builder().forBrowser('chrome').build();

    //send driver to website
    await driver.get('https://store.steampowered.com/');
    //test if main page is displayed or not
    if(await driver.getTitle()=='Welcome to Steam'){
        console.log('🟩 Test Passed : Main page displayed');
    }else{
        console.log('🟥 Test Failed : Main page not displayed');
    }

    //click login button
    await driver.findElement(By.className('global_action_link')).click();
    //test if login page is opened or not
    if(await driver.getTitle()=='Sign In'){
        console.log('🟩 Test Passed : Login page opened');
    }else{
        console.log('🟥 Test Failed : Login page not opened');
    }

    await driver.manage().window().maximize();
    
    await driver.wait(until.elementsLocated(By.xpath('//input[contains(@type,"text") and contains(@class,"newlogindialog_TextInput_2eKVn")]')),50000);

    //input Random strings as account name and password
    await driver.findElement(By.xpath('//input[contains(@type,"text") and contains(@class,"newlogindialog_TextInput_2eKVn")]')).sendKeys('abcdfgs');
    await driver.findElement(By.xpath('//input[contains(@type,"password") and contains(@class,"newlogindialog_TextInput_2eKVn")]')).sendKeys('123456789');

    //click signin button
    await driver.findElement(By.className('newlogindialog_SubmitButton_2QgFE')).click();
    //Test for error text display
    setTimeout(function(){
        if(driver.findElement(By.className('newlogindialog_FormError_1Mcy9')).isDisplayed()){
            console.log('🟩 Test Passed : error text displayed');
        }else{
            console.log('🟥 Test Failed : error text not displayed');
        }
    },10000);
    
setTimeout(function(){
    driver.quit();
},10000);   

}

testCase();

