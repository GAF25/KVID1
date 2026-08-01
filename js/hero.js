const scrollLine = document.querySelector(".scroll-line");

setInterval(() => {

    scrollLine.animate(
        [
            {
                transform:"scaleY(0)",
                transformOrigin:"top"
            },
            {
                transform:"scaleY(1)",
                transformOrigin:"top"
            },
            {
                transform:"scaleY(0)",
                transformOrigin:"bottom"
            }
        ],
        {
            duration:1800,
            easing:"ease-in-out"
        }
    );

},1800);

const shirt=document.getElementById("shirtFlip");

shirt.addEventListener("click",()=>{

    shirt.classList.toggle("flipped");

});