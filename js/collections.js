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
// CARD FLIP
// ===========================================

// ===========================================
// MAIN FILTER
// ===========================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.filter;

        // Product filtering

        cards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";

            }

            else{

                card.style.display = "none";

            }

        });

        // Hide every sub toolbar

        subGroups.forEach(group =>
            group.classList.remove("active")
        );

        // Show selected toolbar

        if(category !== "all"){

            const group = document.querySelector(
                `.subcategory-group[data-parent="${category}"]`
            );

            if(group){

                group.classList.add("active");

            }

        }

    });

});

// ===========================================
// SUB FILTER
// ===========================================

subFilters.forEach(button=>{

    button.addEventListener("click",()=>{

        const parent = button.parentElement;

        parent.querySelectorAll(".sub-filter")
        .forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        // Filtering logic for products can be
        // added later using data-subcategory.

    });

});

// ===========================================
// OPEN MODAL
// ===========================================

cards.forEach(card => {

    card.addEventListener("click", () => {

        currentProduct = card;

        productTitle.textContent = card.dataset.name;

        frontImg.src = card.dataset.blackFront;
        backImg.src = card.dataset.blackBack;

        frontImg.style.opacity = "";
        backImg.style.opacity = "";

        colorButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        const blackBtn = document.querySelector(
            '.color[data-color="black"]'
        );

        if (blackBtn) {

            blackBtn.classList.add("active");

        }

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

// ===========================================
// CLOSE MODAL
// ===========================================

function closeModal(){

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e=>{

    if(e.target===modal){

        closeModal();

    }

});

document.addEventListener("keydown", e=>{

    if(e.key==="Escape"){

        closeModal();

    }

});

// ===========================================
// SIZE SELECTOR
// ===========================================

sizeButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        sizeButtons.forEach(btn=>
            btn.classList.remove("active")
        );

        button.classList.add("active");

    });

});

// ===========================================
// COLOR SELECTOR
// ===========================================

colorButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        if(!currentProduct) return;

        colorButtons.forEach(btn=>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const color = button.dataset.color;

        const front = currentProduct.dataset[`${color}Front`];
        const back = currentProduct.dataset[`${color}Back`];

        if(!front || !back) return;

        frontImg.style.transition="opacity .2s ease";
        backImg.style.transition="opacity .2s ease";

        frontImg.style.opacity="0";
        backImg.style.opacity="0";

        setTimeout(()=>{

            frontImg.src=front;
            backImg.src=back;

            frontImg.style.opacity="";
            backImg.style.opacity="";

        },200);

    });

});