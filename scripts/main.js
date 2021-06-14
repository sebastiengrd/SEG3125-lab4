// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

steps = ["Client", "Products", "Cart"]
restrictions = {
    "Vegetarian": false,
    "GlutenFree": false,
    "NutFree": false,
    "LactoseFree": false
}

function openInfo(evt, tabName) {

    elem = document.getElementById(tabName + "-Top");
    let currentIdx = steps.indexOf(tabName)
    let previousIdx = currentIdx - 1;
    if (previousIdx < 0) {
        previousIdx = 0;
    }
    previous = document.getElementById(steps[previousIdx] + "-Top")
    console.log(previous.className);
    if (previous.className.indexOf("completed") < 0) {
        return;
    }

    if (currentIdx == 1) {
        populateListProductChoices('displayProduct')
    }
    showTabLink(tabName);

}

function showTabLink(tabName) {
    elem = document.getElementById(tabName + "-Top");
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    console.log(tabName);
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "flex";
    elem.className += " active";
    console.log(elem.innerHTML);
    elem.className += (" completed");
}



// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct2) {
    var s2 = document.getElementById(slct2);
    let preferOrganic = document.preferOrganic;
    if (preferOrganic == undefined) { preferOrganic = false; }

    // s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";

    // obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, preferOrganic);

    optionArray.sort((a, b) => products.filter(elem => elem.name == a)[0].price - products.filter(elem => elem.name == b)[0].price)

    // for each item in the array, create a checkbox element, each containing information such as:
    // <input type="checkbox" name="product" value="Bread">
    // <label for="Bread">Bread/label><br>

    for (i = 0; i < optionArray.length; i++) {

        var productName = optionArray[i];
        var productPrice = products.filter(elem => elem.name == productName)[0].price;

        // create the checkbox and add in HTML DOM
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "product";
        checkbox.value = productName;
        s2.appendChild(checkbox);

        // create a label for the checkbox, and also add in HTML DOM
        var label = document.createElement('label')
        label.htmlFor = productName;
        label.appendChild(document.createTextNode(productName));
        s2.appendChild(label);

        // create a label for the checkbox, and also add in HTML DOM
        var price = document.createElement('div')
        price.htmlFor = productPrice;
        price.appendChild(document.createTextNode(productPrice + "$"));
        s2.appendChild(price);

        // create a breakline node and add in HTML DOM
        s2.appendChild(document.createElement("br"));
    }
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems() {

    var ele = document.getElementsByName("product");
    var chosenProducts = [];

    var c = document.getElementById('displayCart');
    c.innerHTML = "";

    // build list of selected item
    var para = document.createElement("P");
    para.innerHTML = "<b>You selected : </b><br>";
    para.appendChild(document.createElement("br"));
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            para.appendChild(document.createTextNode(ele[i].value + "   -   " + products.filter(elem => elem.name == ele[i].value)[0].price + "$"));
            para.appendChild(document.createElement("br"));
            chosenProducts.push(ele[i].value);
        }
    }

    // add paragraph and total price
    c.appendChild(para);
    c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts).toFixed(2) + "$"));
    showTabLink('Cart');
}

function checkboxPreferOrganicChanged(event) {
    document.preferOrganic = event.target.checked;
    populateListProductChoices('displayProduct')

}

function clientInfoButtonClicked(id) {
    //console.log("clicked " + id.substring(7));

    button = document.getElementById(id);

    let restrictionName = id.substring(7);

    if (button.className.indexOf(" categories-button-selected") < 0) {
        button.className += " categories-button-selected";
        restrictions[restrictionName] = true;

    } else {
        button.className = button.className.replace(" categories-button-selected", "");
        restrictions[restrictionName] = false;
    }
}


showTabLink('Client')