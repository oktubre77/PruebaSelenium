const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");

require('dotenv').config();

 
async function dexter(){

       // Buscar un Producto2
       var searchString = "NI_CW3411-402";
           
       let driver = await new Builder().forBrowser("chrome").build();
               
       //await driver.get(process.env.URL_PROD);
       //await driver.get(process.env.URL_DEV_DEXTER);
       await driver.get('https://storefront:storefront@dev.dexter.com.ar/');                

        //To send a search query by passing the value in searchString.
       await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);
 
       //Verify the page title and print it
       var title = await driver.getTitle();
       console.log('Title is:',title);
        
       //Elegir Producto random de la grilla, calculando un index random
       console.log("Elige el producto en la grilla")
       var grilla = await driver.findElements(By.className("image-container"));
       const indexRandom = Math.round(Math.random()*grilla.length-1);
       grilla[indexRandom].click();

        
       await driver.sleep(2000);
       //Elig un talle random de la grilla, descartando aquellos que tienen la clase "disabled"
       console.log("Elige el talle")
       var sizes = await driver.findElements(By.className("variation-attribute-size "));
       var enabledSizes = [];
       for(let i=0; i<sizes.length; i++){
              var f = await sizes[i].getAttribute('class');
              if(!f.includes('disabled'))enabledSizes.push(sizes[i])
       }

       const indexSizeRandom = enabledSizes.length==1 ? 0 : Math.round(Math.random()*enabledSizes.length-1);
       console.log(indexSizeRandom);
       enabledSizes[indexSizeRandom].click();

       //Boton agregar al carrito
       await driver.sleep(3000);
       console.log("Boton agregar al carrito")
       //await driver.findElement(By.xpath("//*[@id='maincontent']/div/div[2]/div[3]/div[5]/div[8]/div/div/div/div/div[1]/button")).click();
       await driver.findElement(By.className("add-to-cart")).click();
       //Ir al carrito
       console.log("Ir al carrito")
       await driver.sleep(4000);
       await driver.findElement(By.xpath("/html/body/div[1]/header/nav/div[1]/div/div[3]/div/div/div[1]/div[3]/div[1]/a/i")).click();
       //Boton comprar del carrito
       console.log("Boton comprar del carrito")
       await driver.findElement(By.xpath("//*[@id='maincontent']/div[3]/div[1]/div[2]/div[9]/div/div/a")).click();
       //Ingresar Mail
        console.log("Ingresa mail")
       var login = process.env.LOGIN_DEV;
       await driver.findElement(By.name("loginEmail")).sendKeys('rodrigocadiz47@gmail.com',Key.RETURN);

        //Ingresa PAssword 
       console.log("Ingresa password");
       var passw = process.env.PASSWORD_DEV;
       await driver.findElement(By.name("loginPassword")).sendKeys('plataforma5',Key.RETURN);
       
       await driver.sleep(5000);
       await driver.findElement(By.xpath("//*[@id='checkout-main']/div[3]/div[1]/div[8]/div/div/button[1]")).click();
      
        //Seleccionar Envio
        console.log("Seleccionar Envio");
        var title = await driver.getTitle();
        console.log('Formulario de Envio:',title);

        console.log("Seleccionar Tipo de Envio");
        //await driver.findElement(By.xpath("//*[@id='null']/fieldset[4]/div[2]/div[3]/label")).click();
        await driver.findElement(By.className("shipping-method-option")).click();
        await driver.sleep(3000);
        
        //Ingresa CVC Tarjeta 
        console.log("Ingresa CVC Tarjeta");
        var CVC = "123";
        await driver.findElement(By.id("saved-payment-security-code")).sendKeys(CVC);

        await driver.sleep(3000);
        //Boton confirmar Orden 
        console.log("Boton confirmar Orden");
        await driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div[3]/div[1]/div[8]/div/div/button[2]")).click();
 
        await driver.sleep(5000);
        //Boton Finalizar Orden 
        console.log("Boton finalizar Orden");
        await driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div[3]/div[1]/div[8]/div/div/div/button")).click();

        await driver.sleep(2000);
        var NumeroOrden = await driver.findElement(By.className("summary-details order-number")).getText();
        console.log('NumeroOrden:',NumeroOrden);
 
        //It is always a safe practice to quit the browser after execution
       await driver.quit();
 
}
 
dexter()