if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready(){
    updateCartTotal();
    var addButtons = document.getElementsByClassName("cart-btn");
    var removeButtons = document.getElementsByClassName("cart-remove-btn");
    var purchaseElement = document.getElementsByClassName("purchase-btn")[0]; 
    addButtonEvent(addButtons);
    removeButtonsEvent(removeButtons);
    purchaseAction(purchaseElement);
    updateQuantityInput(); 
}

//**********ADDING FUNCTIONS(Start) ***************/

function addButtonEvent(addButtons){
    for(var i = 0; i < addButtons.length; i++){
        var button = addButtons[i];
        button.addEventListener('click', (event) => {
            let button = event.target;
            let shopItem = button.parentElement.parentElement;
            let shopTitle = shopItem.getElementsByClassName('fight-item-name')[0].innerText;
            let shopPrice = shopItem.getElementsByClassName('fight-item-price')[0].innerText;
            let shopImage = shopItem.getElementsByClassName('fight-item-image')[0].src;
            addItemToCart(shopTitle, shopPrice, shopImage);
            updateCartTotal();
        })
    }
}

function addItemToCart(shopTitle, shopPrice, shopImage){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-item');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartImages = cartItems.getElementsByClassName('cart-image');
    for(var i = 0; i < cartImages.length; i++){
        if(cartImages[i].src == shopImage){
            alert(`${shopTitle} Is Already In Cart!`);
            return;
        }
    }
    var cartRowContent = `
                        <span><img class="cart-image cart-column" src=${shopImage} alt=""></span>
                        <span class="cart-price cart-column">${shopPrice}</span>
                        <div class="cart-column cart-input-section">
                             <span><input class="cart-input" type="number" name="quantityinput" value="1" id=""></span>
                            <span><button class="btn cart-remove-btn">Remove</button></span>
                        </div>`;
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('cart-remove-btn')[0].addEventListener('click', removeItem);
    cartRow.getElementsByClassName('cart-input')[0].addEventListener('change', changeQuantity);
}

//**********ADDING FUNCTIONS(End) ***************/



//**********REMOVE FUNCTIONS(Start) ***************/

function removeButtonsEvent(removeButtons){
    for(var i = 0; i < removeButtons.length; i++){
        var removeButton = removeButtons[i];
        removeButton.addEventListener('click', removeItem);
    }
}

function removeItem(event){
    var removeButton = event.target;
    var shopItem = removeButton.parentElement.parentElement.parentElement;
    shopItem.remove();
    updateCartTotal();
}

//**********REMOVE FUNCTIONS(End) ***************/


//**********CART FUNCTIONS(Start) ***************/

function changeQuantity(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function updateQuantityInput(){
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var inputButtons = cartItems.getElementsByClassName("cart-input");
    for(var i = 0; i < inputButtons.length; i++){
        var input = inputButtons[i];
        input.addEventListener('change', changeQuantity);
    }
}

function updateCartTotal(){
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItem = cartItems.getElementsByClassName("cart-item");
    var totalElement = document.getElementsByClassName("cart-total-price")[0];
    var purchaseButton = document.getElementsByClassName("purchase-btn")[0];
    var total = 0.00;
    if(cartItem.length > 0){
        purchaseButton.style.visibility = "visible";
        for(var i = 0; i < cartItem.length; i++){
            var item = cartItem[i];
            var priceElement = item.getElementsByClassName("cart-price")[0];
            var quantityElement = item.getElementsByClassName("cart-input")[0];

            var price = parseFloat(priceElement.innerText.replace('$', ''));
            var quantity = quantityElement.value
            total = total + (price * quantity);
        }
        total = total.toFixed(2); 
    }else{
        purchaseButton.style.visibility = "hidden";
    }
    totalElement.innerHTML = `$${total}`;
    return total;
}

//**********CART FUNCTIONS(End) ***************/

//**********PURCHASE FUNCTIONS(Start) ***************/

function purchaseAction(purchaseButton){
    purchaseButton.addEventListener('click', event => {
        var cartItems = document.getElementsByClassName("cart-items")[0];
        var total = document.getElementsByClassName("cart-total-price")[0].innerText;
        alert(`Items Has Been Purchased.\n\nTotal: ${total}`)
        while(cartItems.firstChild){
            cartItems.removeChild(cartItems.firstChild);
        }
        updateCartTotal();
    });
}