//OPEN AND CLOSE  CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart= document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");  
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

//START WHEN ELEMENT IS READY
if(document.readyState == "loaded"){
    document.addEventListener('DOMContentLoaded',start);
} else{
    start();
}
//===================== START========================
function start(){
    addEvents();
    updateTotal();
}

//======================== UPDATE AND RERENDER =================
function update(){
    addEvents();
    updateTotal();
}

//================== ADD EVENTS ==================
function addEvents(){
    //======== Remove item from cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
   cartRemove_btns.forEach((btn)=> {
    btn.addEventListener("click",handle_removeCartItem);
   });

  // ================ Change Item quantity
   let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
   cartQuantity_inputs.forEach((input)=> {
    input.addEventListener("change", handle_changeItemQuantity);
   });

   //========= Add item to cart =========
   let addCart_btns = document.querySelectorAll(".add-cart");
   addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
});

 //Buy order
 const buy_btn = document.querySelector(".btn-buy");
 buy_btn.addEventListener("click", handle_buyOrder);
}

//=================HANDLE EVENTS FUNCTION ================
let itemsAdded =  [];

function handle_addCartItem(){
    let product =this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    if(itemsAdded.find((el) => el.title == newToAdd.title)){
        alert("This item already exists!");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }

    //Add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}


function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el=>el.title !=this.parentElement.querySelectorAll('.cart-box').innerHTML )
   update();
}
  function  handle_changeItemQuantity(){
    if (isNaN(this.value) || this.value < 1) {
        this.value=1;
    }
    this.value = Math.floor(this.value);// to keep it integer

    update();
  }
  
function handle_buyOrder(){
    if(itemsAdded.length <= 0){
        alert("There is No Order to Place Yet! Please Make an Order First, Thank you!");
        return;
    }

//       const cartContent = cart.querySelector(".cart-content");
//       cartContent.innerHTML =``;
//       alert("Your Order has been Placed successfully!")
//       itemsAdded =[];
//       update();
// }


var paymentMode = prompt("Enter your payment mode (e.g., debit card, credit card)");
if (paymentMode) {
    var cardNumber = prompt("Enter your debit/credit card number");
    if (cardNumber && /^\d+$/.test(cardNumber)){
        alert("Payment successful");
    } else {
        alert("Invalid card number");
    }
} else {
    alert("Payment cancelled");
}
update();
};


//===============UPDATE AND RERENDER FUNCTIONS ============
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price*quantity;
    });
 
    //keep 2 digits after the decimal points
    total=total.toFixed(2);//or you can use also
    // total = Math.round(total * 100)/100;

   totalElement.innerHTML = "$" + total;
}

// =====================HTML COMPONENTS ====================
   function CartBoxComponent(title,price,imgSrc){
    return     `<div class="cart-box">
    <img src=${imgSrc} alt="" class="cart-img">
     <div class="detail-box">
   <div class="cart-product-title">${title}</div>
   <div class="cart-price">${price}</div>
   <input type="number" value="1" class="cart-quantity" placeholder="quantity">
  <!--REMOVE CART-->
  <i class='bx bx-trash cart-remove'></i>
</div>
</div>`;

   }
     //====================Buy Buttton=================//
     document.getElementById("cart-comtent").addEventListener("click", function() {
        var paymentMode = prompt("Enter your payment mode (e.g., debit card, credit card)");
        if (paymentMode) {
            var cardNumber = prompt("Enter your debit card number");
            if (cardNumber) {
                alert("Payment successful");
            } else {
                alert("Invalid card number");
            }
        } else {
            alert("Payment cancelled");
        }
        update();
    });