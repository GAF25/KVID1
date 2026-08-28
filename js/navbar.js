const navbar = document.querySelector(".navbar");

const hamburger = document.querySelector(".hamburger");

const navLinks = document.querySelector(".nav-links");


// ===========================================
// NAVBAR SCROLL
// ===========================================

window.addEventListener("scroll",()=>{

    if(window.scrollY>60){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});


// ===========================================
// HAMBURGER MENU
// ===========================================

if(hamburger && navLinks){

    hamburger.addEventListener("click",()=>{

        const isOpen =
            navLinks.classList.toggle("active");

        hamburger.classList.toggle(
            "active",
            isOpen
        );

        hamburger.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    // Close menu when clicking a link

    navLinks.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click",()=>{

            navLinks.classList.remove("active");

            hamburger.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // Close menu when clicking outside

    document.addEventListener("click",(event)=>{

        if(
            !navbar.contains(event.target) &&
            navLinks.classList.contains("active")
        ){

            navLinks.classList.remove("active");

            hamburger.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}