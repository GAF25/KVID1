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
// COLOR CACHE
// ===========================================

const coloredImages = {};


// ===========================================
// SHIRT COLORS
// ===========================================

const shirtColors = {

    white: "#ffffff",

    black: "#111111",

    red: "#d90000",

    navy: "#18305d",

    blue: "#174ea6",

    green: "#1f6b3a",

    yellow: "#f2c400",
grey: "#808080"

};


// ===========================================
// CARD FLIP
// ===========================================

cards.forEach(card => {

    const inner =
        card.querySelector(".card-inner");

    if(!inner) return;

    card.addEventListener("mouseenter", () => {

        inner.classList.add("flipped");

    });

    card.addEventListener("mouseleave", () => {

        inner.classList.remove("flipped");

    });

});


// ===========================================
// MAIN FILTER
// ===========================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category =
            button.dataset.filter;


        cards.forEach(card => {

            if(
                category === "all" ||
                card.dataset.category === category
            ){

                card.style.display = "block";

            }
            else{

                card.style.display = "none";

            }

        });


        subGroups.forEach(group =>
            group.classList.remove("active")
        );


        if(category !== "all"){

            const group =
                document.querySelector(
                    `.subcategory-group[data-parent="${category}"]`
                );

            if(group){

                group.classList.add("active");


                const allButton =
                    group.querySelector(
                        '.sub-filter[data-subfilter="all"]'
                    );


                group.querySelectorAll(".sub-filter")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                if(allButton){

                    allButton.classList.add("active");

                }


                cards.forEach(card => {

                    if(
                        card.dataset.category === category
                    ){

                        card.style.display = "block";

                    }

                });

            }

        }

    });

});


// ===========================================
// SUB FILTER
// ===========================================

subFilters.forEach(button => {

    button.addEventListener("click", () => {

        const parent =
            button.parentElement;


        parent.querySelectorAll(".sub-filter")
            .forEach(btn =>
                btn.classList.remove("active")
            );


        button.classList.add("active");


        const subcategory =
            button.dataset.subfilter || "all";


        const mainCategory =
            parent.dataset.parent;


        cards.forEach(card => {

            const matchesCategory =
                card.dataset.category === mainCategory;


            const matchesSubcategory =
                subcategory === "all" ||
                card.dataset.subcategory === subcategory;


            if(
                matchesCategory &&
                matchesSubcategory
            ){

                card.style.display = "block";

            }
            else{

                card.style.display = "none";

            }

        });

    });

});


// ===========================================
// LOAD IMAGE
// ===========================================

function loadImage(src){

    return new Promise((resolve,reject)=>{

        const image = new Image();

        image.onload = () =>
            resolve(image);

        image.onerror = () =>
            reject(
                new Error(
                    "Could not load image: " + src
                )
            );

        image.src = src;

    });

}


// ===========================================
// COLORIZE TRANSPARENT PNG
// ===========================================

async function colorizePNG(src, color){

    const cacheKey =
        src + "_" + color;


    if(coloredImages[cacheKey]){

        return coloredImages[cacheKey];

    }


    const image =
        await loadImage(src);


    const canvas =
        document.createElement("canvas");


    canvas.width =
        image.naturalWidth;

    canvas.height =
        image.naturalHeight;


    const ctx =
        canvas.getContext("2d", {
            willReadFrequently: true
        });


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.drawImage(
        image,
        0,
        0
    );


    const imageData =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );


    const pixels =
        imageData.data;


    const rgb =
        hexToRGB(color);


    for(
        let i = 0;
        i < pixels.length;
        i += 4
    ){

        const r =
            pixels[i];

        const g =
            pixels[i + 1];

        const b =
            pixels[i + 2];

        const a =
            pixels[i + 3];


        if(a === 0){

            continue;

        }


        const brightness =
            (0.299 * r) +
            (0.587 * g) +
            (0.114 * b);


        if(brightness < 80){

            continue;

        }


        let mask =
            (brightness - 80) / 100;


        mask =
            Math.max(
                0,
                Math.min(1, mask)
            );


        if(brightness > 180){

            mask = 1;

        }


        const light =
            brightness / 255;


        const newR =
            rgb.r *
            (0.55 + light * 0.45);


        const newG =
            rgb.g *
            (0.55 + light * 0.45);


        const newB =
            rgb.b *
            (0.55 + light * 0.45);


        pixels[i] =
            r * (1 - mask) +
            newR * mask;


        pixels[i + 1] =
            g * (1 - mask) +
            newG * mask;


        pixels[i + 2] =
            b * (1 - mask) +
            newB * mask;

    }


    ctx.putImageData(
        imageData,
        0,
        0
    );


    const result =
        canvas.toDataURL("image/png");


    coloredImages[cacheKey] =
        result;


    return result;

}


// ===========================================
// HEX → RGB
// ===========================================

function hexToRGB(hex){

    hex =
        hex.replace("#","");


    return {

        r: parseInt(
            hex.substring(0,2),
            16
        ),

        g: parseInt(
            hex.substring(2,4),
            16
        ),

        b: parseInt(
            hex.substring(4,6),
            16
        )

    };

}


// ===========================================
// APPLY CORPORATE SHIRT COLOR
// ===========================================

async function applyCorporateColor(color){

    if(!currentProduct) return;


    const whiteFront =
        currentProduct.dataset.whiteFront;


    const whiteBack =
        currentProduct.dataset.whiteBack;


    if(!whiteFront || !whiteBack){

        return;

    }


    if(color === "white"){

        frontImg.src =
            whiteFront;

        backImg.src =
            whiteBack;

        return;

    }


    const selectedColor =
        shirtColors[color];


    if(!selectedColor){

        return;

    }


    try{

        const [
            coloredFront,
            coloredBack
        ] = await Promise.all([

            colorizePNG(
                whiteFront,
                selectedColor
            ),

            colorizePNG(
                whiteBack,
                selectedColor
            )

        ]);


        frontImg.src =
            coloredFront;

        backImg.src =
            coloredBack;

    }

    catch(error){

        console.error(
            "Could not colorize shirt:",
            error
        );

    }

}


// ===========================================
// GET AVAILABLE PRODUCT COLORS
// ===========================================

function getProductColors(product){

    if(!product){

        return [];

    }


    const colors = [];


    [
        "black",
        "blue",
        "green",
        "white",
        "red",
        "yellow",
"grey",
        "navy"
    ].forEach(color => {

        const front =
            product.dataset[
                `${color}Front`
            ];


        const back =
            product.dataset[
                `${color}Back`
            ];


        if(front && back){

            colors.push(color);

        }

    });


    return colors;

}


// ===========================================
// UPDATE COLOR BUTTONS
// ===========================================

function updateColorButtons(product){

    const availableColors =
        getProductColors(product);


    colorButtons.forEach(button => {

        const color =
            button.dataset.color;


        if(
            availableColors.includes(color)
        ){

            button.style.display = "";

        }
        else{

            button.style.display = "none";

        }


        button.classList.remove("active");

    });


    const defaultColor =
        availableColors.includes("black")
            ? "black"
            : availableColors[0];


    if(defaultColor){

        const defaultButton =
            document.querySelector(
                `.color[data-color="${defaultColor}"]`
            );


        if(defaultButton){

            defaultButton.classList.add("active");

        }

    }


    return defaultColor;

}


// ===========================================
// OPEN MODAL
// ===========================================

cards.forEach(card => {

    card.addEventListener("click", () => {

        currentProduct =
            card;


        productTitle.textContent =
            card.dataset.name;


        const availableColors =
            getProductColors(card);


        const defaultColor =
            updateColorButtons(card);


        const initialColor =
            defaultColor ||
            (
                availableColors.includes("white")
                    ? "white"
                    : null
            );


        if(initialColor){

            const initialFront =
                card.dataset[
                    `${initialColor}Front`
                ];


            const initialBack =
                card.dataset[
                    `${initialColor}Back`
                ];


            if(
                initialFront &&
                initialBack
            ){

                frontImg.src =
                    initialFront;

                backImg.src =
                    initialBack;

            }

        }
        else{

            frontImg.src =
                card.dataset.blackFront || "";

            backImg.src =
                card.dataset.blackBack || "";

        }


        frontImg.style.opacity = "";
        backImg.style.opacity = "";


        modal.classList.add("active");


        document.body.style.overflow =
            "hidden";

    });

});


// ===========================================
// CLOSE MODAL
// ===========================================

function closeModal(){

    modal.classList.remove("active");

    document.body.style.overflow =
        "auto";

}


closeBtn.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    e => {

        if(e.target === modal){

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    e => {

        if(e.key === "Escape"){

            closeModal();

        }

    }
);


// ===========================================
// SIZE SELECTOR
// ===========================================

sizeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            sizeButtons.forEach(btn =>
                btn.classList.remove("active")
            );


            button.classList.add("active");

        }
    );

});


// ===========================================
// COLOR SELECTOR
// ===========================================

colorButtons.forEach(button => {

    button.addEventListener(
        "click",
        async () => {

            if(!currentProduct){

                return;

            }


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


            if(!front || !back){

                return;

            }


            colorButtons.forEach(btn =>
                btn.classList.remove("active")
            );


            button.classList.add("active");


            frontImg.style.transition =
                "opacity .2s ease";


            backImg.style.transition =
                "opacity .2s ease";


            frontImg.style.opacity =
                "0";


            backImg.style.opacity =
                "0";


            setTimeout(() => {

                frontImg.src =
                    front;

                backImg.src =
                    back;

                frontImg.style.opacity =
                    "";

                backImg.style.opacity =
                    "";

            }, 200);

        }
    );

});