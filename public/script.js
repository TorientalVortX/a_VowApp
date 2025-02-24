// VowApp/public/script.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded: public/script.js");

    // Function to detect mobile devices (screen width ≤480px or user agent check)
    function isMobile() {
        return (
            window.innerWidth <= 480 ||
            /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent,
            )
        );
    }

    // Function to hide scrollbar on mobile but keep scrolling
    function hideScrollbarOnMobile() {
        if (isMobile()) {
            console.log("Hiding scrollbar on mobile device");
            document.body.style.overflow = "auto"; // Ensure scrolling is enabled
            document.body.style.paddingRight = "0"; // Reset any padding from CSS
            document.body.style.marginRight = "0"; // Reset any margin from CSS

            // Use a wrapper or transform approach to hide scrollbar
            document.body.style.position = "relative";
            document.body.style.paddingRight = "17px"; // Compensate for hidden scrollbar width (approximate for mobile)
            document.body.style.transform = "translateZ(0)";
            document.body.style.webkitTransform = "translateZ(0)";

            // Optional: Use a wrapper div if needed for complex layouts
            const container = document.querySelector(".container");
            if (container) {
                container.style.overflowY = "auto"; // Ensure container can scroll
                container.style.paddingRight = "0"; // Reset padding
                container.style.marginRight = "-17px"; // Offset to hide scrollbar
                container.style.transform = "translateZ(0)";
                container.style.webkitTransform = "translateZ(0)";
            }
        } else {
            console.log("Desktop/tablet detected, keeping default scrollbar");
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
            document.body.style.marginRight = "0";
            document.body.style.position = "";
            document.body.style.transform = "";
            document.body.style.webkitTransform = "";

            const container = document.querySelector(".container");
            if (container) {
                container.style.overflowY = "auto";
                container.style.paddingRight = "0";
                container.style.marginRight = "0";
                container.style.transform = "";
                container.style.webkitTransform = "";
            }
        }
    }

    // Apply scrollbar hiding on load and resize
    hideScrollbarOnMobile();
    window.addEventListener("resize", hideScrollbarOnMobile);

    // Handle touch events to ensure smooth scrolling
    let touchStartY = 0;
    document.body.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    });

    document.body.addEventListener("touchmove", (e) => {
        if (isMobile()) {
            const touchCurrentY = e.touches[0].clientY;
            const deltaY = touchStartY - touchCurrentY;
            document.body.scrollTop += deltaY;
            touchStartY = touchCurrentY;
            e.preventDefault(); // Prevent default scrolling behavior if needed
        }
    });
});
