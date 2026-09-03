/* =========================================================
   SHYAKA BARBERSHOP
   INTERACTIONS + LANGUAGE + BOOKING
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const body = document.body;
    const navbar = document.getElementById("navbar");
    const loader = document.getElementById("loader");

    const languageSwitch =
        document.getElementById("languageSwitch");

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const bookingForm =
        document.getElementById("bookingForm");

    const dateInput =
        document.getElementById("date");


    /* =====================================================
       LANGUAGE
       ===================================================== */

    let currentLanguage =
        localStorage.getItem("shyakaLanguage") || "ar";


    function setLanguage(language) {

        currentLanguage = language;

        localStorage.setItem(
            "shyakaLanguage",
            language
        );


        /* Direction */

        if (language === "ar") {

            document.documentElement.lang = "ar";
            document.documentElement.dir = "rtl";

            body.classList.remove("ltr");
            body.classList.add("rtl");

        } else {

            document.documentElement.lang = "en";
            document.documentElement.dir = "ltr";

            body.classList.remove("rtl");
            body.classList.add("ltr");

        }


        /* Text */

        document
            .querySelectorAll("[data-ar][data-en]")
            .forEach(element => {

                const text =
                    language === "ar"
                        ? element.dataset.ar
                        : element.dataset.en;

                element.textContent = text;

            });


        /* Placeholders */

        document
            .querySelectorAll(
                "[data-placeholder-ar][data-placeholder-en]"
            )
            .forEach(input => {

                input.placeholder =
                    language === "ar"
                        ? input.dataset.placeholderAr
                        : input.dataset.placeholderEn;

            });


        /* Select options */

        document
            .querySelectorAll("option[data-ar][data-en]")
            .forEach(option => {

                option.textContent =
                    language === "ar"
                        ? option.dataset.ar
                        : option.dataset.en;

            });

    }


    languageSwitch.addEventListener("click", () => {

        const nextLanguage =
            currentLanguage === "ar"
                ? "en"
                : "ar";

        setLanguage(nextLanguage);

    });


    setLanguage(currentLanguage);


    /* =====================================================
       LOADER
       ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 900);

    });


    /* =====================================================
       NAVBAR
       ===================================================== */

    function updateNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function closeMobileMenu() {

        menuButton.classList.remove("active");

        mobileMenu.classList.remove("open");

        body.classList.remove("no-scroll");

    }


    menuButton.addEventListener("click", () => {

        const open =
            mobileMenu.classList.toggle("open");

        menuButton.classList.toggle(
            "active",
            open
        );

        body.classList.toggle(
            "no-scroll",
            open
        );

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       3D TILT EFFECT
       ===================================================== */

    const tiltCards =
        document.querySelectorAll(".tilt");


    const supportsHover =
        window.matchMedia(
            "(hover: hover)"
        ).matches;


    if (supportsHover) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) / centerY) * -3;

                    const rotateY =
                        ((x - centerX) / centerX) * 3;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const heroImage =
        document.querySelector(".hero-image");


    if (heroImage && supportsHover) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 2;

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 2;


                heroImage.style.transform =
                    `scale(1.02)
                     translate(${x * -5}px, ${y * -3}px)`;

            }
        );

    }


    /* =====================================================
       SET MINIMUM DATE
       ===================================================== */

    if (dateInput) {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        dateInput.min =
            `${year}-${month}-${day}`;

    }


    /* =====================================================
       BOOKING
       ===================================================== */

    bookingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const service =
                document
                    .getElementById("service")
                    .value;


            const date =
                document
                    .getElementById("date")
                    .value;


            const time =
                document
                    .getElementById("time")
                    .value;


            const notes =
                document
                    .getElementById("notes")
                    .value
                    .trim();


            if (
                !name ||
                !phone ||
                !service ||
                !date ||
                !time
            ) {

                return;

            }


            /* Format date */

            const formattedDate =
                formatDate(
                    date,
                    currentLanguage
                );


            /* Build WhatsApp message */

            let message;


            if (currentLanguage === "ar") {

                message =
`مرحباً صالون شياكة 👋

أرغب بحجز موعد.

الاسم: ${name}
رقم الهاتف: ${phone}
الخدمة: ${getArabicService(service)}
التاريخ: ${formattedDate}
الوقت: ${time}
${notes ? `ملاحظات: ${notes}` : ""}

شكراً لكم.`;

            } else {

                message =
`Hello Shyaka Barbershop 👋

I would like to book an appointment.

Name: ${name}
Phone: ${phone}
Service: ${getEnglishService(service)}
Date: ${formattedDate}
Preferred time: ${time}
${notes ? `Notes: ${notes}` : ""}

Thank you.`;

            }


            const whatsappNumber =
                "962796653949";


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );


    /* =====================================================
       SERVICE TRANSLATION
       ===================================================== */

    function getArabicService(service) {

        const services = {

            "قص شعر": "قص شعر",

            "تصفيف الشعر": "تصفيف الشعر",

            "العناية باللحية": "العناية باللحية",

            "العناية الكاملة": "العناية الكاملة"

        };

        return services[service] || service;

    }


    function getEnglishService(service) {

        const services = {

            "قص شعر": "Haircut",

            "تصفيف الشعر": "Hair Styling",

            "العناية باللحية": "Beard Grooming",

            "العناية الكاملة": "Complete Grooming"

        };

        return services[service] || service;

    }


    /* =====================================================
       DATE FORMAT
       ===================================================== */

    function formatDate(
        dateString,
        language
    ) {

        const date =
            new Date(
                `${dateString}T12:00:00`
            );


        return date.toLocaleDateString(
            language === "ar"
                ? "ar-JO"
                : "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute("href");


                    if (
                        targetID === "#" ||
                        !targetID
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar.offsetHeight;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       PREVENT PAST DATES
       ===================================================== */

    if (dateInput) {

        dateInput.addEventListener(
            "change",
            () => {

                const selected =
                    new Date(
                        `${dateInput.value}T12:00:00`
                    );

                const today =
                    new Date();

                today.setHours(
                    0, 0, 0, 0
                );


                if (selected < today) {

                    dateInput.value = "";

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("open")
            ) {

                closeMobileMenu();

            }

        }
    );

});
