// ===========================================
// COLLECTIONS
// ===========================================

const cards = document.querySelectorAll(".collection-card");
const modal = document.querySelector(".product-modal");
const closeBtn = document.querySelector(".close-modal");

const frontImg = document.querySelector(".front-img");
const backImg = document.querySelector(".back-img");

const productTitle = document.getElementById("productTitle");

const colorButtons = document.querySelectorAll(".color");
const sizeButtons = document.querySelectorAll(".sizes button");

const filterButtons = document.querySelectorAll(".filter-btn");
const subGroups = document.querySelectorAll(".subcategory-group");
const subFilters = document.querySelectorAll(".sub-filter");

let currentProduct = null;


// ===========================================
// PRODUCT DESCRIPTIONS
// ===========================================

const productDescriptions = {

    "cloudcot":
        `Crafted from 100% premium cotton.
Soft, breathable, and made for all-day comfort.
A timeless polo with a clean, effortless silhouette.
Minimal by design. Elevated by detail.`,

    "cotblend":
        `A refined blend of comfort and durability.
Smooth polycotton fabric, made for everyday ease.
Clean polo styling with a timeless silhouette.
Simple, versatile, effortlessly polished.`,

    "perfomars":
        `Made with premium MARS fabric for a smooth, refined feel.
Lightweight, breathable, and built for everyday comfort.
A clean finish with a modern, effortless look.
Simple in style. Elevated in every detail.`,

    "spuntee":
        `Cotton-like softness with the practicality of spun fabric.
Lightweight, comfortable, and easy on the pocket.
A clean polo design made for everyday wear.
Premium feel, without the premium price tag. ✨`,

    "snappy":
        `Lightweight, simple, and made for everyday essentials.
Easy-to-wear PP fabric at a budget-friendly price.
Perfect for quick use, events, teams, and bulk requirements.
Basic by design. Practical by nature. ✨`,

    "halodrop":
        `Crafted from 100% pure cotton for natural comfort.
Soft, breathable, and easy on the skin.
A clean round-neck design made for everyday wear.
Timeless, effortless, and endlessly versatile. ✨`,

    "cotlycra":
        `Premium cotton blended with flexible Lycra for a refined feel.
Soft, breathable, and naturally comfortable with added stretch.
Designed to move effortlessly while holding its shape.
A modern essential with a clean, elevated finish.`,

    "pullpop":
        `Pull it on. Kick back. Repeat. ⚡
Soft, cozy, and made for everyday chill.
Your go-to layer for cool days & late nights.
Simple look, maximum comfort. 🔥`,

    "aciddrip":
        `Bold acid-wash patterns made to stand out.
Every piece brings its own unique, edgy character.
Soft feel meets a statement-making streetwear vibe.
Turn heads. Break the basic. Own the look. ⚡`,

    "caps":
        `Clean. Classic. Effortlessly cool.
Built for everyday comfort, made to go with everything.
Minimal design, maximum versatility.
Customisable to match your style, brand, or needs.
Your everyday essential—no extra, just style. 🧢`,

    "shorts":
        `Breathable, flexible, and made for all-day comfort.
Sporty by design, effortless in every move.
Perfect for workouts, games, or everyday action.
Performance-ready. Comfort-driven. 🏃`,

    "formal shirt":
        `Sharp, sophisticated, and made to impress.
Comfortable fabric designed for all-day ease.
A timeless silhouette with a clean, polished finish.
Perfect for work, occasions, and everything in between.
Classic formality. Effortless confidence. ✨`,

    "honeyflex":
        `Textured honeycomb fabric with a modern, sporty feel.
Lightweight, breathable, and built for everyday comfort.
A unique texture that adds character without the extra fuss.
Smart enough to stand out, easy enough to wear anywhere.`,

    "dotrush":
        `Made to move, built to breathe.
Lightweight DotKnit texture for all-day comfort.
Sporty, sharp, and effortlessly versatile.
A fresh take on everyday performance.`,

    "dotrush polo":
        `Lightweight comfort with a textured edge.
Breathable DotKnit fabric that keeps you feeling fresh.
Classic polo styling with a modern sporty vibe.
Easy to wear, easy to stand out.`

};


// ===========================================
// PRODUCT COLOUR ORDERS
// ===========================================

const productColorOrder = {

    cloudcot: [
        "red",
        "yellow",
        "grey",
        "blue"
    ],

    aciddrip: [
        "blue",
        "green",
        "grey",
        "red"
    ],

    cotblend: [
        "black",
        "blue",
        "purple",
        "red"
    ],

    "cotblend+": [
        "red",
        "black",
        "blue",
        "yellow"
    ],

    dotrush: [
        "white",
        "black",
        "blue",
        "yellow"
    ],

    cotlycra: [
        "pink",
        "yellow",
        "blue",
        "red"
    ],

    "dotrush polo": [
        "black",
        "red",
        "blue",
        "yellow"
    ],

    halodrop: [
        "pink",
        "blue",
        "black",
        "white"
    ],

    honeyflex: [
        "purple",
        "blue",
        "black",
        "white"
    ],

    "formal pants": [
        "blue",
        "black",
        "white"
    ]

};


// ===========================================
// MAIN COLLECTIONS
// ===========================================

const mainCollectionCategories = [
    "t-shirts",
    "polos",
    "shirts",
    "bottoms",
    "hoodies",
    "accessories"
];


// ===========================================
// HIDE ALL SUB-FILTER GROUPS
// ===========================================

function hideAllSubGroups() {

    subGroups.forEach(group => {

        group.classList.remove("active");

    });

}


// ===========================================
// SHOW MAIN COLLECTIONS
// ===========================================

function showMainCollections() {

    const mainCollectionProducts = [

        {
            category: "t-shirts",
            name: "Spuntee"
        },

        {
            category: "polos",
            name: "Premium Polo"
        },

        {
            category: "polos",
            name: "DotRush Polo"
        },

        {
            category: "shirts",
            name: "Formal Shirt"
        },

        {
            category: "bottoms",
            name: "Track Pants"
        },

        {
            category: "bottoms",
            name: "Formal Pants"
        },

        {
            category: "hoodies",
            name: "Pullpop"
        },

        {
            category: "accessories",
            name: "Caps"
        }

    ];


    cards.forEach(card => {

        const category = card.dataset.category;
        const name = card.dataset.name;

        const shouldShow = mainCollectionProducts.some(product =>

            product.category === category &&
            product.name.toLowerCase() === name.toLowerCase()

        );


        card.style.display =
            shouldShow ? "block" : "none";

    });

}


// ===========================================
// SHOW ALL PRODUCTS IN A CATEGORY
// ===========================================

function showCategory(category) {

    cards.forEach(card => {

        if (card.dataset.category === category) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// ===========================================
// SHOW SELECTED SUB-FILTER GROUP
// ===========================================

function showSubGroup(category) {

    hideAllSubGroups();


    const group = document.querySelector(
        `.subcategory-group[data-parent="${category}"]`
    );


    if (!group) return;


    group.classList.add("active");


    group.querySelectorAll(".sub-filter").forEach(button => {

        button.classList.remove("active");

    });


    const allButton = group.querySelector(
        '.sub-filter[data-subfilter="all"]'
    );


    if (allButton) {

        allButton.classList.add("active");

    }

}


// ===========================================
// FILTER BY SUBCATEGORY
// ===========================================

function filterBySubcategory(category, subcategory) {

    cards.forEach(card => {

        const cardCategory =
            card.dataset.category;

        const cardSubcategory =
            card.dataset.subcategory;


        if (

            cardCategory === category &&

            (
                subcategory === "all" ||
                cardSubcategory === subcategory
            )

        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// ===========================================
// CARD FLIP
// ===========================================

cards.forEach(card => {

    const inner =
        card.querySelector(".card-inner");


    if (!inner) return;


    card.addEventListener("mouseenter", () => {

        inner.classList.add("flipped");

    });


    card.addEventListener("mouseleave", () => {

        inner.classList.remove("flipped");

    });

});


// ===========================================
// UPDATE AVAILABLE COLOURS
// ===========================================

function updateColorButtons(card) {

    const productName =
        (card.dataset.name || "").toLowerCase();


    const customOrder =
        productColorOrder[productName];


    colorButtons.forEach(button => {

        const color =
            button.dataset.color;


        const front =
            card.dataset[`${color}Front`];


        const back =
            card.dataset[`${color}Back`];


        const available =
            Boolean(front && back);


        if (available) {

            button.style.display = "";
            button.disabled = false;

        } else {

            button.style.display = "none";
            button.disabled = true;

        }


        button.classList.remove("active");

    });


    if (
        customOrder &&
        colorButtons.length > 0
    ) {

        const container =
            colorButtons[0].parentElement;


        if (container) {

            customOrder.forEach(colorName => {

                const button =
                    container.querySelector(
                        `.color[data-color="${colorName}"]`
                    );


                if (button) {

                    container.appendChild(button);

                }

            });

        }

    }

}


// ===========================================
// UPDATE PRODUCT DESCRIPTION
// ===========================================

function updateProductDescription(card) {

    const descriptionElement =
        document.getElementById("productDescription");


    if (!descriptionElement) return;


    const productName =
        (card.dataset.name || "").toLowerCase();


    const description =
        productDescriptions[productName];


    if (description) {

        descriptionElement.innerHTML =
            description
                .split("\n")
                .map(line => `<p>${line}</p>`)
                .join("");

        descriptionElement.style.display = "block";

    } else {

        descriptionElement.innerHTML = "";

        descriptionElement.style.display = "none";

    }

}


// ===========================================
// OPEN PRODUCT MODAL
// ===========================================

cards.forEach(card => {

    card.addEventListener("click", () => {

        currentProduct = card;


        productTitle.textContent =
            card.dataset.name;


        // -----------------------------------
        // Product description
        // -----------------------------------

        updateProductDescription(card);


        // -----------------------------------
        // Find first available colour
        // -----------------------------------

        const availableColors = [

            "black",
            "white",
            "red",
            "blue",
            "green",
            "yellow",
            "grey",
            "purple",
            "pink"

        ];


        let defaultColor = null;


        for (const color of availableColors) {

            const front =
                card.dataset[`${color}Front`];


            const back =
                card.dataset[`${color}Back`];


            if (front && back) {

                defaultColor = color;

                break;

            }

        }


        // -----------------------------------
        // Update visible colour buttons
        // -----------------------------------

        updateColorButtons(card);


        // -----------------------------------
        // Set default product images
        // -----------------------------------

        if (defaultColor) {

            frontImg.src =
                card.dataset[`${defaultColor}Front`];


            backImg.src =
                card.dataset[`${defaultColor}Back`];

        }


        frontImg.style.opacity = "";
        backImg.style.opacity = "";


        // -----------------------------------
        // Reset colour buttons
        // -----------------------------------

        colorButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        // -----------------------------------
        // Activate default colour
        // -----------------------------------

        if (defaultColor) {

            const defaultButton =
                document.querySelector(
                    `.color[data-color="${defaultColor}"]`
                );


            if (defaultButton) {

                defaultButton.classList.add("active");

            }

        }


        // -----------------------------------
        // Reset size selection
        // -----------------------------------

        sizeButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        // Default to L

        const defaultSize =
            Array.from(sizeButtons).find(
                btn => btn.textContent.trim() === "L"
            );


        if (defaultSize) {

            defaultSize.classList.add("active");

        }


        // -----------------------------------
        // Open modal
        // -----------------------------------

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// ===========================================
// CLOSE MODAL
// ===========================================

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}


closeBtn.addEventListener(
    "click",
    closeModal
);


// ===========================================
// CLOSE OUTSIDE MODAL
// ===========================================

modal.addEventListener("click", e => {

    if (e.target === modal) {

        closeModal();

    }

});


// ===========================================
// CLOSE WITH ESCAPE
// ===========================================

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeModal();

    }

});


// ===========================================
// SIZE SELECTOR
// ===========================================

sizeButtons.forEach(button => {

    button.addEventListener("click", () => {

        sizeButtons.forEach(btn =>
            btn.classList.remove("active")
        );


        button.classList.add("active");

    });

});


// ===========================================
// COLOR SELECTOR
// ===========================================

colorButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (!currentProduct) return;


        const color =
            button.dataset.color;


        const front =
            currentProduct.dataset[
                `${color}Front`
            ];


        const back =
            currentProduct.dataset[
                `${color}Back`
            ];


        if (!front || !back) return;


        colorButtons.forEach(btn =>
            btn.classList.remove("active")
        );


        button.classList.add("active");


        frontImg.style.transition =
            "opacity .2s ease";

        backImg.style.transition =
            "opacity .2s ease";


        frontImg.style.opacity = "0";
        backImg.style.opacity = "0";


        setTimeout(() => {

            frontImg.src = front;
            backImg.src = back;

            frontImg.style.opacity = "";
            backImg.style.opacity = "";

        }, 200);

    });

});


// ===========================================
// MAIN FILTERS
// ===========================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );


        button.classList.add("active");


        const category =
            button.dataset.filter;


        if (category === "all") {

            showMainCollections();

            hideAllSubGroups();

            return;

        }


        showCategory(category);

        showSubGroup(category);

    });

});


// ===========================================
// SUB FILTERS
// ===========================================

subFilters.forEach(button => {

    button.addEventListener("click", () => {

        const parent =
            button.closest(".subcategory-group");


        if (!parent) return;


        const category =
            parent.dataset.parent;


        const subcategory =
            button.dataset.subfilter || "all";


        parent.querySelectorAll(".sub-filter").forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        filterBySubcategory(
            category,
            subcategory
        );

    });

});


// ===========================================
// CART
// ===========================================

const cartButton =
    document.querySelector(".nav-btn");

const addToCartButton =
    document.querySelector(
        ".product-right .primary-btn"
    );


let cart =
    JSON.parse(
        localStorage.getItem("kvidCart")
    ) || [];


// ===========================================
// CREATE CART UI
// ===========================================

const cartOverlay =
    document.createElement("div");


cartOverlay.className =
    "cart-overlay";


cartOverlay.innerHTML = `

    <div class="cart-drawer">

        <div class="cart-header">

            <h2>Cart</h2>

            <button class="cart-close">
                &times;
            </button>

        </div>

        <div class="cart-items"></div>

        <div class="cart-footer">

            <div class="cart-total-row">

                <span>Total</span>

                <strong class="cart-total">
                    $
                </strong>

            </div>

            <button class="cart-quote-btn">
                Request a Quote
            </button>

        </div>

    </div>

`;


document.body.appendChild(cartOverlay);


// ===========================================
// CART ELEMENTS
// ===========================================

const cartDrawer =
    cartOverlay.querySelector(
        ".cart-drawer"
    );


const cartItemsContainer =
    cartOverlay.querySelector(
        ".cart-items"
    );


const cartTotal =
    cartOverlay.querySelector(
        ".cart-total"
    );


const cartClose =
    cartOverlay.querySelector(
        ".cart-close"
    );


const cartQuoteButton =
    cartOverlay.querySelector(
        ".cart-quote-btn"
    );


// ===========================================
// CART BADGE
// ===========================================

const cartBadge =
    document.createElement("span");


cartBadge.className =
    "cart-count";


cartButton.appendChild(cartBadge);


// ===========================================
// CART STYLES
// ===========================================

const cartStyles =
    document.createElement("style");


cartStyles.textContent = `

.cart-overlay {

    position: fixed;
    inset: 0;

    background: rgba(0,0,0,.55);

    opacity: 0;
    visibility: hidden;

    transition: .3s ease;

    z-index: 9999;

}

.cart-overlay.active {

    opacity: 1;
    visibility: visible;

}

.cart-drawer {

    position: absolute;

    top: 0;
    right: 0;

    width: min(430px, 92vw);
    height: 100%;

    background: #111;

    border-left: 1px solid rgba(255,255,255,.1);

    display: flex;
    flex-direction: column;

    transform: translateX(100%);

    transition: transform .35s ease;

}

.cart-overlay.active .cart-drawer {

    transform: translateX(0);

}

.cart-header {

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 24px;

    border-bottom: 1px solid rgba(255,255,255,.1);

}

.cart-header h2 {

    margin: 0;

    color: #fff;

    font-size: 24px;

}

.cart-close {

    border: none;
    background: transparent;

    color: #fff;

    font-size: 30px;

    cursor: pointer;

}

.cart-items {

    flex: 1;

    overflow-y: auto;

    padding: 18px;

}

.cart-empty {

    height: 100%;

    display: flex;

    align-items: center;
    justify-content: center;

    color: rgba(255,255,255,.55);

    text-align: center;

}

.cart-item {

    display: flex;

    gap: 14px;

    padding: 14px 0;

    border-bottom: 1px solid rgba(255,255,255,.08);

}

.cart-item-image {

    width: 76px;
    height: 90px;

    object-fit: contain;

    background: rgba(255,255,255,.04);

    border-radius: 8px;

}

.cart-item-info {

    flex: 1;

}

.cart-item-info h4 {

    margin: 0 0 6px;

    color: #fff;

    font-size: 15px;

}

.cart-item-meta {

    color: rgba(255,255,255,.55);

    font-size: 13px;

    line-height: 1.6;

}

.cart-item-price {

    margin-top: 7px;

    color: #d6b36a;

    font-weight: 600;

}

.cart-item-controls {

    display: flex;

    align-items: center;

    gap: 8px;

    margin-top: 10px;

}

.cart-qty-btn {

    width: 28px;
    height: 28px;

    border: 1px solid rgba(255,255,255,.15);

    background: transparent;

    color: #fff;

    border-radius: 5px;

    cursor: pointer;

}

.cart-qty {

    min-width: 22px;

    text-align: center;

    color: #fff;

}

.cart-remove {

    margin-left: auto;

    border: none;

    background: transparent;

    color: rgba(255,255,255,.45);

    cursor: pointer;

    font-size: 13px;

}

.cart-remove:hover {

    color: #fff;

}

.cart-footer {

    padding: 20px 24px 24px;

    border-top: 1px solid rgba(255,255,255,.1);

}

.cart-total-row {

    display: flex;

    justify-content: space-between;

    align-items: center;

    color: #fff;

    margin-bottom: 16px;

}

.cart-total-row strong {

    color: #d6b36a;

    font-size: 20px;

}

.cart-quote-btn {

    width: 100%;

    padding: 13px 18px;

    border: none;

    border-radius: 6px;

    background: #d6b36a;

    color: #111;

    font-weight: 600;

    cursor: pointer;

}

.cart-count {

    position: absolute;

    top: -7px;
    right: -8px;

    min-width: 18px;
    height: 18px;

    padding: 0 4px;

    border-radius: 50%;

    background: #d6b36a;

    color: #111;

    font-size: 10px;

    display: flex;

    align-items: center;
    justify-content: center;

    font-weight: 700;

}

.nav-btn {

    position: relative;

}

@media (max-width: 600px) {

    .cart-drawer {

        width: 100%;

    }

}

`;

document.head.appendChild(cartStyles);


// ===========================================
// SAVE CART
// ===========================================

function saveCart() {

    localStorage.setItem(
        "kvidCart",
        JSON.stringify(cart)
    );

}


// ===========================================
// UPDATE CART COUNT
// ===========================================

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartBadge.textContent =
        count;


    cartBadge.style.display =
        count > 0 ? "flex" : "none";

}


// ===========================================
// RENDER CART
// ===========================================

function renderCart() {

    if (!cart.length) {

        cartItemsContainer.innerHTML = `

            <div class="cart-empty">

                Your cart is empty.

            </div>

        `;


        cartTotal.textContent =
            "$";

        updateCartCount();

        return;

    }


    cartItemsContainer.innerHTML = "";


    cart.forEach((item, index) => {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                class="cart-item-image"
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-meta">

                    Colour: ${item.color}

                    <br>

                    Size: ${item.size}

                </div>

                <div class="cart-item-price">
                    $
                </div>

                <div class="cart-item-controls">

                    <button
                        class="cart-qty-btn"
                        data-action="decrease"
                        data-index="${index}">
                        −
                    </button>

                    <span class="cart-qty">
                        ${item.quantity}
                    </span>

                    <button
                        class="cart-qty-btn"
                        data-action="increase"
                        data-index="${index}">
                        +
                    </button>

                    <button
                        class="cart-remove"
                        data-action="remove"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    cartTotal.textContent =
        "$";


    updateCartCount();

}


// ===========================================
// OPEN CART
// ===========================================

function openCart() {

    renderCart();

    cartOverlay.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


// ===========================================
// CLOSE CART
// ===========================================

function closeCart() {

    cartOverlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "auto";

}


cartButton.addEventListener(
    "click",
    e => {

        e.preventDefault();

        openCart();

    }
);


// ===========================================
// CLOSE CART BUTTON
// ===========================================

cartClose.addEventListener(
    "click",
    closeCart
);


// ===========================================
// CLOSE CART OUTSIDE
// ===========================================

cartOverlay.addEventListener(
    "click",
    e => {

        if (e.target === cartOverlay) {

            closeCart();

        }

    }
);


// ===========================================
// CART QUANTITY / REMOVE
// ===========================================

cartItemsContainer.addEventListener(
    "click",
    e => {

        const button =
            e.target.closest("button");


        if (!button) return;


        const index =
            Number(button.dataset.index);


        const action =
            button.dataset.action;


        if (
            Number.isNaN(index) ||
            !cart[index]
        ) return;


        if (action === "increase") {

            cart[index].quantity++;

        }


        if (action === "decrease") {

            cart[index].quantity--;


            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(index, 1);

            }

        }


        if (action === "remove") {

            cart.splice(index, 1);

        }


        saveCart();

        renderCart();

    }
);


// ===========================================
// ADD TO CART
// ===========================================

addToCartButton.addEventListener(
    "click",
    () => {

        if (!currentProduct) return;


        const productName =
            currentProduct.dataset.name;


        // -----------------------------------
        // Selected colour
        // -----------------------------------

        const selectedColorButton =
            document.querySelector(
                ".color.active"
            );


        const selectedColor =
            selectedColorButton
                ? selectedColorButton.dataset.color
                : null;


        // -----------------------------------
        // Selected size
        // -----------------------------------

        const selectedSizeButton =
            document.querySelector(
                ".sizes button.active"
            );


        const selectedSize =
            selectedSizeButton
                ? selectedSizeButton.textContent.trim()
                : null;


        if (!selectedColor) {

            alert(
                "Please select a colour."
            );

            return;

        }


        if (!selectedSize) {

            alert(
                "Please select a size."
            );

            return;

        }


        const image =
            currentProduct.dataset[
                `${selectedColor}Front`
            ];


        if (!image) {

            alert(
                "This colour is not available."
            );

            return;

        }


        // -----------------------------------
        // Existing item?
        // -----------------------------------

        const existingItem =
            cart.find(item =>

                item.name === productName &&
                item.color === selectedColor &&
                item.size === selectedSize

            );


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                name: productName,

                color: selectedColor,

                size: selectedSize,

                quantity: 1,

                image: image

            });

        }


        saveCart();

        updateCartCount();

        renderCart();


        closeModal();

        openCart();

    }
);


// ===========================================
// REQUEST A QUOTE FROM CART
// ===========================================

cartQuoteButton.addEventListener(
    "click",
    () => {

        closeCart();


        const quoteButton =
            document.querySelector(
                ".quote-btn"
            );


        if (quoteButton) {

            quoteButton.click();

        }

    }
);


// ===========================================
// INITIALISE CART
// ===========================================

updateCartCount();

renderCart();


// ===========================================
// INITIAL STATE
// ===========================================

showMainCollections();

hideAllSubGroups();


// ===========================================
// MAKE "ALL" MAIN FILTER ACTIVE
// ===========================================

filterButtons.forEach(button => {

    button.classList.remove("active");

});


const allMainButton =
    document.querySelector(
        '.filter-btn[data-filter="all"]'
    );


if (allMainButton) {

    allMainButton.classList.add(
        "active"
    );

}
// ===========================================
// MOBILE MODAL + CART FIX
// ===========================================

(function applyMobileFixes() {

    const mobileFixStyles = document.createElement("style");

    mobileFixStyles.textContent = `

        /* =========================================
           MOBILE ONLY
        ========================================= */

        @media (max-width: 768px) {

            /* -----------------------------------------
               PRODUCT MODAL
            ----------------------------------------- */

            .product-modal {
                position: fixed;
                inset: 0;

                width: 100%;
                height: 100dvh;

                padding: 10px;

                display: none;

                align-items: flex-start;
                justify-content: center;

                overflow-y: auto;
                -webkit-overflow-scrolling: touch;

                box-sizing: border-box;
            }

            .product-modal.active {
                display: flex;
            }

            .product-box {
                position: relative;

                width: 100%;
                max-width: 520px;

                max-height: none;
                height: auto;

                margin: auto 0;

                display: flex;
                flex-direction: column;

                overflow: visible;

                border-radius: 20px;

                box-sizing: border-box;
            }

            .product-left {
                width: 100%;

                padding: 18px 18px 0;

                display: flex;
                align-items: center;
                justify-content: center;

                box-sizing: border-box;
            }

            .product-image {
                width: min(72vw, 300px);
                height: min(72vw, 300px);

                max-width: 300px;
                max-height: 300px;

                flex-shrink: 0;
            }

            .product-right {
                width: 100%;

                padding: 18px 20px 22px;

                display: flex;
                flex-direction: column;

                box-sizing: border-box;
            }

            .product-right h2 {
                padding-right: 45px;

                font-size: 1.55rem;
                line-height: 1.2;

                margin-bottom: 8px;
            }

            .product-price {
                margin-bottom: 18px;
            }

            .product-description {
                margin: 8px 0 18px;

                font-size: 12px;
                line-height: 1.65;
            }

            .product-right h4 {
                margin-bottom: 10px;
            }

            .color-options {
                display: flex;
                flex-wrap: wrap;

                gap: 10px;

                margin-bottom: 20px;
            }

            .color {
                width: 31px;
                height: 31px;

                flex: 0 0 31px;
            }

            .sizes {
                display: flex;
                flex-wrap: wrap;

                gap: 8px;

                margin-bottom: 20px;
            }

            .sizes button {
                width: 46px;
                height: 46px;
            }

            .product-right .primary-btn {
                width: 100%;

                min-height: 48px;
            }

            .close-modal {
                position: absolute;

                top: 10px;
                right: 10px;

                width: 38px;
                height: 38px;

                z-index: 20;

                display: flex;
                align-items: center;
                justify-content: center;
            }


            /* -----------------------------------------
               CART
            ----------------------------------------- */

            .cart-overlay {
                position: fixed;

                inset: 0;

                width: 100%;
                height: 100dvh;

                overflow: hidden;

                z-index: 9998;

                box-sizing: border-box;
            }

            .cart-drawer {
                position: fixed;

                top: 0;
                right: 0;
                bottom: 0;

                width: 100%;
                max-width: 100%;

                height: 100dvh;
                min-height: 0;

                display: flex;
                flex-direction: column;

                transform: translateX(100%);

                overflow: hidden;

                box-sizing: border-box;
            }

            .cart-drawer.active {
                transform: translateX(0);
            }

            .cart-header {
                flex: 0 0 auto;

                padding:
                    calc(18px + env(safe-area-inset-top))
                    18px
                    16px;
            }

            .cart-header h2 {
                font-size: 23px;
            }

            .cart-close {
                width: 40px;
                height: 40px;

                display: flex;
                align-items: center;
                justify-content: center;

                flex-shrink: 0;
            }

            .cart-items {
                flex: 1 1 auto;

                min-height: 0;

                overflow-y: auto;
                overflow-x: hidden;

                -webkit-overflow-scrolling: touch;

                padding:
                    10px 16px
                    calc(16px + env(safe-area-inset-bottom));
            }

            .cart-item {
                grid-template-columns: 64px 1fr;

                gap: 12px;

                padding: 14px 0;
            }

            .cart-item-image {
                width: 64px;
                height: 78px;
            }

            .cart-item-info {
                min-width: 0;
            }

            .cart-item-info h3 {
                font-size: 14px;

                white-space: normal;
                word-break: break-word;
            }

            .cart-item-meta {
                font-size: 10px;
            }

            .cart-item-actions {
                grid-column: 2;

                flex-direction: row;

                align-items: center;
                justify-content: space-between;

                width: 100%;
            }

            .cart-footer {
                flex: 0 0 auto;

                padding:
                    15px
                    16px
                    calc(16px + env(safe-area-inset-bottom));
            }

            .cart-total-row {
                margin-bottom: 13px;
            }

            .cart-enquiry {
                width: 100%;

                min-height: 48px;
            }

        }


        /* =========================================
           SMALL PHONES
        ========================================= */

        @media (max-width: 480px) {

            .product-modal {
                padding: 7px;
            }

            .product-box {
                max-width: 100%;

                border-radius: 16px;
            }

            .product-left {
                padding: 14px 14px 0;
            }

            .product-image {
                width: min(68vw, 250px);
                height: min(68vw, 250px);

                max-width: 250px;
                max-height: 250px;
            }

            .product-right {
                padding: 15px 15px 18px;
            }

            .product-right h2 {
                font-size: 1.4rem;
            }

            .product-description {
                font-size: 11.5px;
                line-height: 1.6;
            }

            .close-modal {
                top: 8px;
                right: 8px;

                width: 36px;
                height: 36px;
            }

            .color-options {
                gap: 8px;
            }

            .color {
                width: 29px;
                height: 29px;

                flex-basis: 29px;
            }

            .sizes button {
                width: 43px;
                height: 43px;
            }

            .cart-header {
                padding-left: 16px;
                padding-right: 16px;
            }

            .cart-items {
                padding-left: 14px;
                padding-right: 14px;
            }

            .cart-footer {
                padding-left: 14px;
                padding-right: 14px;
            }

        }

    `;

    document.head.appendChild(mobileFixStyles);

})();