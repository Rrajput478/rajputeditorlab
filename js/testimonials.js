/* =========================================
   RAJPUT EDITOR LAB
   TESTIMONIAL CAROUSEL JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track =
        document.querySelector(".testimonial-track");

    const wrapper =
        document.querySelector(
            ".testimonial-track-wrapper"
        );

    const cards =
        document.querySelectorAll(
            ".testimonial-card"
        );

    const nextButton =
        document.querySelector(".next");

    const prevButton =
        document.querySelector(".prev");

    const dotsContainer =
        document.querySelector(".carousel-dots");


    if (!track || !wrapper || !cards.length) {
        return;
    }


    let currentIndex = 0;

    let cardsPerView = getCardsPerView();

    let autoPlay;


    /* =========================================
       DETERMINE CARDS PER VIEW
       ========================================= */

    function getCardsPerView() {

        if (window.innerWidth <= 650) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    /* =========================================
       MAX SLIDE
       ========================================= */

    function getMaxIndex() {

        return Math.max(
            0,
            cards.length - cardsPerView
        );

    }


    /* =========================================
       CREATE DOTS
       ========================================= */

    function createDots() {

        dotsContainer.innerHTML = "";

        const totalSlides =
            getMaxIndex() + 1;

        for (
            let i = 0;
            i < totalSlides;
            i++
        ) {

            const dot =
                document.createElement("button");

            dot.classList.add(
                "carousel-dot"
            );

            dot.setAttribute(
                "aria-label",
                `Go to testimonial ${i + 1}`
            );

            dot.addEventListener(
                "click",
                () => {
                    goToSlide(i);
                    restartAutoPlay();
                }
            );

            dotsContainer.appendChild(dot);
        }

        updateDots();
    }


    /* =========================================
       UPDATE DOTS
       ========================================= */

    function updateDots() {

        const dots =
            document.querySelectorAll(
                ".carousel-dot"
            );

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    /* =========================================
       GO TO SLIDE
       ========================================= */

    function goToSlide(index) {

        const maxIndex =
            getMaxIndex();

        currentIndex =
            Math.max(
                0,
                Math.min(index, maxIndex)
            );


        const cardWidth =
            cards[0].offsetWidth;

        const gap =
            parseFloat(
                getComputedStyle(track).gap
            ) || 0;


        const movement =
            currentIndex *
            (cardWidth + gap);


        track.style.transform =
            `translateX(-${movement}px)`;


        updateDots();

    }


    /* =========================================
       NEXT
       ========================================= */

    function nextSlide() {

        const maxIndex =
            getMaxIndex();


        if (currentIndex >= maxIndex) {

            goToSlide(0);

        } else {

            goToSlide(
                currentIndex + 1
            );

        }

    }


    /* =========================================
       PREVIOUS
       ========================================= */

    function previousSlide() {

        const maxIndex =
            getMaxIndex();


        if (currentIndex <= 0) {

            goToSlide(maxIndex);

        } else {

            goToSlide(
                currentIndex - 1
            );

        }

    }


    /* =========================================
       BUTTON EVENTS
       ========================================= */

    nextButton.addEventListener(
        "click",
        () => {

            nextSlide();

            restartAutoPlay();

        }
    );


    prevButton.addEventListener(
        "click",
        () => {

            previousSlide();

            restartAutoPlay();

        }
    );


    /* =========================================
       AUTO PLAY
       ========================================= */

    function startAutoPlay() {

        autoPlay =
            setInterval(
                nextSlide,
                4500
            );

    }


    function stopAutoPlay() {

        clearInterval(autoPlay);

    }


    function restartAutoPlay() {

        stopAutoPlay();

        startAutoPlay();

    }


    /* =========================================
       PAUSE WHEN HOVERING
       ========================================= */

    wrapper.addEventListener(
        "mouseenter",
        stopAutoPlay
    );


    wrapper.addEventListener(
        "mouseleave",
        startAutoPlay
    );


    /* =========================================
       TOUCH / SWIPE
       ========================================= */

    let touchStartX = 0;

    let touchEndX = 0;


    wrapper.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.touches[0].clientX;

            stopAutoPlay();

        },
        { passive: true }
    );


    wrapper.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].clientX;

            handleSwipe();

            startAutoPlay();

        }
    );


    function handleSwipe() {

        const swipeDistance =
            touchStartX - touchEndX;


        if (
            Math.abs(swipeDistance) < 50
        ) {
            return;
        }


        if (swipeDistance > 0) {

            nextSlide();

        } else {

            previousSlide();

        }

    }


    /* =========================================
       RESIZE
       ========================================= */

    window.addEventListener(
        "resize",
        () => {

            const newCardsPerView =
                getCardsPerView();


            if (
                newCardsPerView !==
                cardsPerView
            ) {

                cardsPerView =
                    newCardsPerView;

                currentIndex = 0;

                createDots();

            }


            goToSlide(
                Math.min(
                    currentIndex,
                    getMaxIndex()
                )
            );

        }
    );


    /* =========================================
       INITIALIZE
       ========================================= */

    createDots();

    goToSlide(0);

    startAutoPlay();

});