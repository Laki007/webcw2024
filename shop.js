var removeCartItemBtns = document.getElementsByClassName("remove-btn"); //getting remove buttons and adding event listener 
console.log(removeCartItemBtns);
for (var i = 0; i < removeCartItemBtns.length; i++) {
    var buttton = removeCartItemBtns[i];
    buttton.addEventListener("click", removeCartItem)
}

function removeCartItem(event) { // removing cart item by accessing the parents element of remove button
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal();
}


function updateCartTotal() { // card total updater
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]; // acessing the first div through classname, hence an array, then selecting the first element aka the only element in this case
    var cartRows = cartItemContainer.getElementsByClassName('cart-row'); //then getting the next div, there we have a multiple elements
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) { //looping through cartRow elements bc we have multiple cart rows
        var cartRow = cartRows[i];
        var cartPrice = cartRow.getElementsByClassName('cart-price')[0]; //getting the cart price element inside the cart row (we still have one but we get an array bc of the getelementbyclass method)
        var priceElement = cartPrice.getElementsByClassName('cart-item-price')[0]; // then accessing the price span element (our target)
        var price = parseFloat(priceElement.textContent.replace('$', '')); // removing the $ sign, converting the read text value to float
        console.log(price);
        total = total + price; //updating the total
    }
    total = Math.round(total * 100) / 100 //rounding off bc float points get usually messed up
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total; //displaying the final cart total after various button click loops
}


var quantityInputs = document.getElementsByClassName('quantity-input') // this is to control that input number range
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) { //no nulls, less than zero values
        input.value = 1
    }
}

var addToCartBtns = document.getElementsByClassName('add-to-cart-btn') // add to cart button 
for (var i = 0; i < addToCartBtns.length; i++) {
    var button = addToCartBtns[i]
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) { // the event function when add to cart button is clicked
    var button = event.target // this event is targetted on the add to card button 
    var shopItem = button.parentElement.parentElement // acessing the shop item div through that button's parent elements
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText // then getting the relevent elements using the shopitem main div
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText


    var quantity = shopItem.getElementsByClassName('quantity-input')[0].value
    var option;
    var optionInputs = shopItem.querySelectorAll('.options input[type="radio"]');
    var isChecked = false;

    for (var i = 0; i < optionInputs.length; i++) {
        if (optionInputs[i].checked) {
            isChecked = true;
            option = optionInputs[i].value;
            break;
        }
    }
    if (!isChecked) {
        alert("Please select an option"); // getting the color input and showing an alert if the input is not made
        return;
    }
    title = title + '-' + option // combining the color and the title so the user can add the same item but in different colors without getting the error of slecting the same item
    price = parseFloat(price.replace('$', ''));
    price = price * quantity
    price = Math.round(price * 100) / 100
    var thumbnail = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, thumbnail, quantity, option) //calling the function which is discussed below
    updateCartTotal() // and then updating bc the new ones need updating as the function isnt called again



    function addItemToCart(title, price, thumbnail, quantity) {
        var cartItems = document.getElementsByClassName('cart-items')[0]; //getting our main shop item div
        var cartRow = document.createElement('div'); //creating a new div to add the new row
        cartRow.classList.add('cart-row'); //.classList is to make the program aware that there are other classes inside the div, add will add all the info in cart row element
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title') // this is to check whether the same shop item is added multiple times to the cart through add to cart
        for (var i = 0; i < cartItemNames.length; i++) { //takes the titles of all shop items and see whether title of the newly adding row has same as a one already in cart
            if (cartItemNames[i].innerText == title) {
                alert("This item is already added to the cart") //if so sends an alert and terminates the loop through return
                return
            }
        }
        var cartRowContents = ` 
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${thumbnail}" width="100" height="100">
            <span class="cart-item-title">${title} </span>
        </div>
        <div class="cart-quantity cart-column">
            <span class="cart-item-quantity">${quantity}</span>
        </div>
        <div class="cart-price cart-column">
            <span class="cart-item-price">$${price}</span>
            <button class="remove-btn" type="button">X</button>
        </div>
    `;
        // this is to give the structure of the row  that has to be added, with the parameters inside that should vary, ofc

        cartRow.innerHTML = cartRowContents; // then cartrow variable already knows it is going to have a list of classes in it and now it is given the exact structure through this line
        cartItems.append(cartRow); //then appending to the main div
        cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem) // then adding that remove button event listener to each of these newly added cart rows too
    }
}

var sizeInputs = document.querySelectorAll('.size-rad');

// Adding event listener to each size input
sizeInputs.forEach(function(input) {
    input.addEventListener('change', function(event) {
        var selectedSize = event.target.value;
        var shopItem = input.closest('.shop-item'); //for each input, getting the closest shop item
        var priceElement = shopItem.querySelector('.shop-item-price'); //then the price of it
        var basePrice = parseFloat(20.99);

        // Update price based on selected size
        var updatedPrice = basePrice;
        switch (selectedSize) {
            case 'Small':
                updatedPrice = basePrice * 1.0;
                break;
            case 'Medium':
                updatedPrice = basePrice * 1.5; //increasing price for medium size
                break;
            case 'Large':
                updatedPrice = basePrice * 2.0; // increasing price for large size
                break;
        }

        // Update the displayed price
        priceElement.innerText = '$' + updatedPrice.toFixed(2);
    });
});

document.getElementsByClassName("clear-cart-btn")[0].addEventListener('click', clearCartClicked)
// to clear the entire cart at once
function clearCartClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    if (cartItems.childElementCount == 0) {
        alert("There are no items in the cart")
    } else {
        while (cartItems.hasChildNodes()) { // removing cart items until it's o
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    }
}

document.querySelector('.checkout-btn').addEventListener('click', checkoutClicked);

function checkoutClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItems.getElementsByClassName('cart-row');

    if (cartRows.length === 0) {
        alert("There are no items in the cart");
        return; // Exit the function if the cart is empty
    }

    // Get the empty div in the order summary to display cart details
    var cartDetailsContainer = document.getElementById('order-details');
    cartDetailsContainer.innerHTML = ''; // Clear any existing content

    // Loop through each cart item to extract details and add to order summary
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var cartItemName = cartRow.querySelector('.cart-item-title').innerText;
        var cartItemQuantity = cartRow.querySelector('.cart-item-quantity').innerText;
        var cartItemPrice = cartRow.querySelector('.cart-item-price').innerText;

        // Create HTML structure for displaying cart item details in order summary
        var cartItemDetails = document.createElement('div');
        cartItemDetails.classList.add('order-item');
        cartItemDetails.innerHTML = `
            <span>${cartItemName} x ${cartItemQuantity} -- ${cartItemPrice}</span>
        `;

        // Append the cart item details to the order summary
        cartDetailsContainer.appendChild(cartItemDetails);
    }

    // Get the cart total price inside cart conatiner
    var cartTotalPriceElement = document.querySelector('.cart-total-price');
    var cartTotalPrice = parseFloat(cartTotalPriceElement.innerText.replace('$', ''));

    // Update the total span inside order summary div with the cart total price
    var totalSpan = document.getElementById('total');
    totalSpan.innerText = '$' + cartTotalPrice.toFixed(2);

    // Toggle the visibility of the hidden div used to store the checkout form
    var hiddenDiv = document.getElementById('hiddenDiv');
    hiddenDiv.style.display = 'block';

    // Scroll to the 'scroll div' for better visibility of the checkout form
    document.getElementById('scroll').scrollIntoView({
        behavior: 'smooth'
    });
}

document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Check if the form is valid (all required fields are filled)
    if (this.checkValidity()) {
        var popup = document.getElementById('popup');
        var closeButton = document.getElementsByClassName('close')[0];

        function openPopup() {
            popup.style.display = 'block';
        }

        function closePopup() {
            popup.style.display = 'none';
            hiddenDiv.style.display = 'none';
            clearCartClicked();

        }
        
        openPopup(); // Open the popup when purchase button is clicked
        };

        closeButton.addEventListener('click', closePopup); // closing the popup when the close button is clicked
    } 
);


const sliderFrame = document.querySelector('.slider-frame');
const cartContainer = document.querySelector('.cart-container');
const contentContainer = document.querySelector('.content-container');

// Add scroll event listener
window.addEventListener('scroll', () => {
    // Get the bottom position of the slider frame
    const sliderBottom = sliderFrame.getBoundingClientRect().bottom;

    // Check if the bottom of the slider frame is above the viewport
    if (sliderBottom < 0) {
        // Add a class to shift the cart container back to its position
        cartContainer.classList.add('open');
        // Add a class to move the content container into view from the left
        contentContainer.classList.add('open');
    } else {
        // Remove the class if the slider frame is still visible in the viewport
        cartContainer.classList.remove('open');
        // Remove the class to move the content container back off-screen to the left
        contentContainer.classList.remove('open');
    }
});

   
