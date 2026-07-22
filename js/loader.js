window.addEventListener("load", () => {

    const tl = gsap.timeline({

        onComplete: () => {

            gsap.set("#loader", {
                display: "none"
            });

            gsap.set(".navbar", {
                clearProps: "all"
            });

        }

    });

    tl.to(".loader-line", {

        width: "100%",

        duration: 0.8,

        stagger: 0.08,

        ease: "power3.out"

    })

    .to(".loader-logo span", {

        y: 0,

        opacity: 1,

        duration: 0.6,

        stagger: 0.12,

        ease: "power4.out"

    }, "-=0.4")

    .to(".loader-logo", {

        gap: 8,

        duration: 0.8,

        ease: "power3.inOut"

    })

    .to(".loader-line", {

        width: 0,

        duration: 0.6,

        stagger: 0.08,

        ease: "power3.in"

    })

    .to("#loader", {

        yPercent: -100,

        duration: 1,

        ease: "power4.inOut"

    })

    .fromTo(".navbar",
        {
            y: -50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out"
        },
        "-=0.5"
    )

    .from(".hero-text > *", {

        y: 60,

        opacity: 0,

        stagger: 0.15,

        duration: 0.8,

        ease: "power3.out"

    }, "-=0.5");

});