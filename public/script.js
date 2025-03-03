document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded: public/script.js");

    // Handle raid button navigation with event delegation
    const raidButtons = document.querySelector(".raid-buttons");
    raidButtons.addEventListener("click", (e) => {
        const button = e.target.closest(".raid-button");
        if (button) {
            const raidPath = button.getAttribute("data-raid");
            if (raidPath) {
                window.location.href = raidPath;
            } else {
                console.error(
                    "No data-raid attribute found on button:",
                    button,
                );
            }
        }
    });

    // Detect mobile devices (screen width ≤480px or user agent)
    const isMobile = () =>
        window.innerWidth <= 480 ||
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );

    // Hide scrollbar on mobile but maintain scrolling without affecting layout
    const hideScrollbarOnMobile = () => {
        if (isMobile()) {
            console.log("Hiding scrollbar on mobile device");
            const body = document.body;
            const container = document.querySelector(".container");

            // Apply styles to hide scrollbar while keeping scrolling and preventing layout shifts
            body.style.overflow = "auto";
            body.style.paddingRight = "0"; // Reset to avoid text misalignment
            body.style.marginRight = "0"; // Reset to prevent layout shifts
            body.style.position = "relative";
            body.style.transform = "translateZ(0)";
            body.style.webkitTransform = "translateZ(0)";
            body.style.scrollbarWidth = "none";
            body.style.msOverflowStyle = "none";
            body.style.WebkitOverflowScrolling = "touch";
            body.style.WebkitScrollbarWidth = "none";

            if (container) {
                container.style.overflowY = "auto";
                container.style.paddingRight = "0"; // Reset padding
                container.style.marginRight = "0"; // Reset margin to prevent misalignment
                container.style.transform = "translateZ(0)";
                container.style.webkitTransform = "translateZ(0)";
                container.style.scrollbarWidth = "none";
                container.style.msOverflowStyle = "none";
                container.style.WebkitOverflowScrolling = "touch";
                container.style.WebkitScrollbar = "none";
            }

            // Handle touch scrolling for smooth behavior
            let touchStartY = 0;
            body.addEventListener(
                "touchstart",
                (e) => {
                    touchStartY = e.touches[0].clientY;
                },
                { passive: true },
            );

            body.addEventListener(
                "touchmove",
                (e) => {
                    const touchCurrentY = e.touches[0].clientY;
                    const deltaY = touchStartY - touchCurrentY;
                    body.scrollTop += deltaY;
                    touchStartY = touchCurrentY;
                    e.preventDefault(); // Prevent default scrolling if needed
                },
                { passive: false },
            );
        } else {
            console.log("Desktop/tablet detected, keeping default scrollbar");
            const body = document.body;
            const container = document.querySelector(".container");

            // Reset styles for desktop
            body.style.overflow = "auto";
            body.style.paddingRight = "0";
            body.style.marginRight = "0";
            body.style.position = "";
            body.style.transform = "";
            body.style.webkitTransform = "";
            body.style.scrollbarWidth = "";
            body.style.msOverflowStyle = "";
            body.style.WebkitOverflowScrolling = "";
            body.style.WebkitScrollbarWidth = "";

            if (container) {
                container.style.overflowY = "auto";
                container.style.paddingRight = "0";
                container.style.marginRight = "0";
                container.style.transform = "";
                container.style.webkitTransform = "";
                container.style.scrollbarWidth = "";
                container.style.msOverflowStyle = "";
                container.style.WebkitOverflowScrolling = "";
                container.style.WebkitScrollbar = "";
            }
        }
    };

    // Apply scrollbar hiding on load, resize, and orientation change
    hideScrollbarOnMobile();
    window.addEventListener("resize", hideScrollbarOnMobile);
    window.addEventListener("orientationchange", hideScrollbarOnMobile);

    // Fallback to ensure no scrollbar appears on initial load
    if (isMobile()) {
        hideScrollbarOnMobile();
    }
});
