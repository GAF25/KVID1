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

let currentProduct = null;

// ===========================================
// OPEN MODAL
// ===========================================

cards.forEach(card => {

    card.addEventListener("click", () => {

        currentProduct = card;

        productTitle.textContent = card.dataset.name;

        // Default to Black
        frontImg.src = card.dataset.blackFront;
        backImg.src = card.dataset.blackBack;

        // Remove any inline styles
        frontImg.style.opacity = "";
        backImg.style.opacity = "";

        // Reset active colour
        colorButtons.forEach(btn => btn.classList.remove("active"));

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

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e => {

    if (e.target === modal) {

        closeModal();

    }

});

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

        colorButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const color = button.dataset.color;

        const front = currentProduct.dataset[`${color}Front`];
        const back = currentProduct.dataset[`${color}Back`];

        // Skip if this product doesn't have that colour
        if (!front || !back) return;

        // Simple fade
        frontImg.style.transition = "opacity .2s ease";
        backImg.style.transition = "opacity .2s ease";

        frontImg.style.opacity = "0";
        backImg.style.opacity = "0";

        setTimeout(() => {

            frontImg.src = front;
            backImg.src = back;

            // Remove inline opacity so CSS hover takes over again
            frontImg.style.opacity = "";
            backImg.style.opacity = "";

        }, 200);

    });

});

// ===========================================
// FILTERS
// ===========================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.textContent
            .trim()
            .toLowerCase()
            .replace("-", "");

        cards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});