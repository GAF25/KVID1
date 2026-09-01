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
// MAIN COLLECTIONS
// These are the categories shown under "All"
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
// Under "All", show only one product/card
// from each main category
// ===========================================

function showMainCollections() {

    const shownCategories = new Set();

    cards.forEach(card => {

        const category = card.dataset.category;

        if (
            mainCollectionCategories.includes(category) &&
            !shownCategories.has(category)
        ) {

            card.style.display = "block";
            shownCategories.add(category);

        } else {

            card.style.display = "none";

        }

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

    // Reset active state
    group.querySelectorAll(".sub-filter").forEach(button => {
        button.classList.remove("active");
    });

    // Activate "All"
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

        const cardCategory = card.dataset.category;
        const cardSubcategory = card.dataset.subcategory;

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

    const inner = card.querySelector(".card-inner");

    if (!inner) return;

    card.addEventListener("mouseenter", () => {

        inner.classList.add("flipped");

    });

    card.addEventListener("mouseleave", () => {

        inner.classList.remove("flipped");

    });

});


// ===========================================
// OPEN PRODUCT MODAL
// ===========================================

cards.forEach(card => {

    card.addEventListener("click", () => {

        currentProduct = card;

        productTitle.textContent = card.dataset.name;


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
            "purple"
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
        // Set default product images
        // -----------------------------------

        if (defaultColor) {

            frontImg.src =
                card.dataset[`${defaultColor}Front`];

            backImg.src =
                card.dataset[`${defaultColor}Back`];

        }


        // Reset opacity

        frontImg.style.opacity = "";
        backImg.style.opacity = "";


        // -----------------------------------
        // Reset colour buttons
        // -----------------------------------

        colorButtons.forEach(btn => {

            btn.classList.remove("active");

        });


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


closeBtn.addEventListener("click", closeModal);


// Close when clicking outside modal

modal.addEventListener("click", e => {

    if (e.target === modal) {

        closeModal();

    }

});


// Close with Escape

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

        const color = button.dataset.color;

        const front =
            currentProduct.dataset[`${color}Front`];

        const back =
            currentProduct.dataset[`${color}Back`];


        // Product doesn't have this colour

        if (!front || !back) return;


        colorButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");


        // Fade out

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


        // -----------------------------------
        // Active main filter
        // -----------------------------------

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");


        const category =
            button.dataset.filter;


        // ===================================
        // ALL
        // ===================================

        if (category === "all") {

            showMainCollections();

            hideAllSubGroups();

            return;

        }


        // ===================================
        // MAIN CATEGORY
        // ===================================

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


        // -----------------------------------
        // Active sub-filter
        // -----------------------------------

        parent.querySelectorAll(".sub-filter").forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // -----------------------------------
        // Filter products
        // -----------------------------------

        filterBySubcategory(
            category,
            subcategory
        );

    });

});


// ===========================================
// INITIAL STATE
// ===========================================

// Start with only the main collections visible

showMainCollections();

hideAllSubGroups();


// Make "All" main filter active

filterButtons.forEach(button => {

    button.classList.remove("active");

});


const allMainButton =
    document.querySelector(
        '.filter-btn[data-filter="all"]'
    );


if (allMainButton) {

    allMainButton.classList.add("active");

}