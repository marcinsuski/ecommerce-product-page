//image gallery variables
const thumbnails = document.querySelectorAll(".product-image__item img");
const smallImage = document.querySelectorAll(".product-image__item");
const largeImage = document.querySelector(".product-image__large img");
//popup variables
const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".popup__img");
const popupClose = document.querySelector(".popup-control-close");
const arrowLeft = document.querySelector(".popup-control-previous");
const arrowRight = document.querySelector(".popup-control-next");
const arrowLeftMobile = document.querySelector(".control-previous");
const arrowRightMobile = document.querySelector(".control-next");
//cart variables
const cart = document.querySelector(".navbar-cart");
const cartWindow = document.querySelector('.cart-content');
const cartContent = document.querySelector(".cart-content__content");
const productRemove = document.querySelector('.minus');
const productAdd = document.querySelector('.plus');
const productAmount = document.querySelector('.amount');
const AddtoCart = document.querySelector('.product-info__cart-add');
const cartAmount = document.querySelector('.navbar-cart--amount');
const price = document.querySelector('.price-value');
const deleteCart = document.querySelector('.cart-delete');
//mobile menu controls
const burgerButton = document.querySelector('.burger-container');
const burger = document.querySelector('.burger');
const menuMobile = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');

let currentImgIndex = 0;

largeImage.addEventListener("click", openPopup);

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", (e) => {
        popup.classList.remove("hidden");
        popupImage.src = e.target.src;
        largeImage.src = e.target.src;
        thumbnails.forEach((thumb) => {
            thumb.classList.remove("active");
        });
        e.target.classList.add("active");
        currentImgIndex = index;
    });
});

function openPopup() {
    popup.classList.remove("hidden");
}

//popup controls

arrowLeft.addEventListener("click", previousImage);
function previousImage() {
    if (currentImgIndex === 0) {
        currentImgIndex = thumbnails.length - 1;
    } else {
        currentImgIndex--;
    }
    popupImage.src = thumbnails[currentImgIndex].src;
}

arrowLeftMobile.addEventListener("click", () => {
    if (currentImgIndex === 0) {
        currentImgIndex = thumbnails.length - 1;
    } else {
        currentImgIndex--;
    }
    largeImage.src = thumbnails[currentImgIndex].src;
});

arrowRight.addEventListener("click", nextImage);
function nextImage() {
    if (currentImgIndex === thumbnails.length - 1) {
        currentImgIndex = 0;
    } else {
        currentImgIndex++;
    }
    popupImage.src = thumbnails[currentImgIndex].src;
}

arrowRightMobile.addEventListener("click", () => {
    if (currentImgIndex === thumbnails.length - 1) {
        currentImgIndex = 0;
    } else {
        currentImgIndex++;
    }
    largeImage.src = thumbnails[currentImgIndex].src;
});


//popup keyboard controls
document.addEventListener("keydown", (e) => {
    if (!popup.classList.contains("hidden")) {
        if (e.key === "ArrowLeft" || e.keyCode === 37) {
            previousImage();
        }

        if (e.key === "ArrowRight" || e.keyCode === 39) {
            nextImage();
        }

        if (e.key === "Escape" || e.keyCode === 27) {
            closePopup();
        }
    }
});

popupClose.addEventListener("click", closePopup);
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
    closePopup();
    }
});


function closePopup() {
    popup.classList.add("hidden");
}

//open-close cart content
cart.addEventListener("click", toggleCart);

function toggleCart() {
    cartWindow.classList.toggle("hidden");
}


//cart controls
productRemove.addEventListener('click', () => {
    let newAmount = +productAmount.innerText;
    newAmount -= 1;
    productAmount.innerText = `${newAmount}`; 
})

productAdd.addEventListener('click', () => {
    let newAmount = +productAmount.innerText;
    newAmount += 1;
    productAmount.innerText = `${newAmount}`; 
})


AddtoCart.addEventListener('click', addToCart);

function addToCart() {
    let currentPrice = +price.innerText;
    let currentAmount = +cartAmount.innerText + +productAmount.innerText;

    cartAmount.classList.remove('hidden');
    cartAmount.innerText = productAmount.innerText;
   
    cartContent.innerHTML = `
    <div class="cart-content__container">
    <div class="cart-content__image">
        <img
            src="../src/images/image-product-1-thumbnail.jpg"
            alt=""
        />
    </div>
    <div class="cart-items">
        <div class="cart-items-model">
            Fall Limisted Edition Sneakers
        </div>
        <div class="cart-items-pricing">
            <div class="cart-items-price">
                $${price.innerText}
            </div>
            <div class="cart-items-count">
                x <span>${cartAmount.innerText}</span>
            </div>
            <div class="cart-items-sum">
              $${currentPrice * currentAmount}
            </div>
        </div>
    </div>
  
</div>
<button class="checkout">Checkout</button>
    `
} 

deleteCart.addEventListener('click', removeFromCart);

function removeFromCart() {
    cartAmount.classList.add('hidden');
    cartContent.innerHTML ='Your Cart is Empty';
}

burgerButton.addEventListener('click', toggleMenu);

function toggleMenu() {
menuMobile.classList.toggle('open');
overlay.classList.toggle('open');
burger.classList.toggle('open');

}

overlay.addEventListener('click', toggleMenu)