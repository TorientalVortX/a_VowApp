// VowApp/public/raids/last-wish/script.js
document.addEventListener("DOMContentLoaded", () => {
    const contentDisplay = document.getElementById("content-display");
    const mapDisplay = document.getElementById("map-display");
    const guide = document.getElementById("encounter-guide");
    const encounterSelect = document.getElementById("encounter-select");
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const modalClose = document.querySelector(".modal-close");

    // Show loading state while content loads
    function showLoading(target) {
        target.innerHTML =
            '<p class="loading">Loading encounter details...</p>';
    }

    // Handle content errors
    function handleError(target, message = "Error loading content.") {
        target.innerHTML = `<p class="error">${message}</p>`;
    }

    const encounterContent = {
        kalli: {
            static: `<img src="./images/kalli-cheat-sheet.webp" alt="Kalli Cheat Sheet" loading="lazy">`,
            map: `<img src="./images/kalli-map-full.webp" alt="Kalli Full Map" loading="lazy">`,
        },
        "shuro-chi": {
            static: `<img src="./images/shuro-chi-cheat-sheet.webp" alt="Shuro Chi Cheat Sheet" loading="lazy">`,
            map: `<img src="./images/shuro-chi-map.webp" alt="Shuro Chi Map" loading="lazy">`,
        },
        morgeth: {
            static: `<img src="./images/morgeth-cheat-sheet.webp" alt="Morgeth Cheat Sheet" loading="lazy">`,
            map: `<img src="./images/morgeth-map.webp" alt="Morgeth Map" loading="lazy">`,
        },
        vault: {
            static: `<img src="./images/vault-cheat-sheet.webp" alt="Vault Cheat Sheet" loading="lazy">`,
            map: `<img src="./images/vault-map.webp" alt="Vault Map" loading="lazy">`,
        },
        "queens-walk": {
            static: `<img src="./images/queens-walk-cheat-sheet.webp" alt="Queen’s Walk Cheat Sheet" loading="lazy">`,
        },
        "riven-normal": {
            static: `<img src="./images/riven-normal-cheat-sheet.webp" alt="Riven Normal Cheat Sheet" loading="lazy">`,
            map: `<img src="./images/riven-full-map.webp" alt="Riven Full Map" loading="lazy">`,
        },
        "riven-cheese": {
            static: `<img src="./images/riven-cheese-cheat-sheet.webp" alt="Riven Cheese Cheat Sheet" loading="lazy">`,
            map: `<img src="./images/riven-full-map.webp" alt="Riven Cheese Map" loading="lazy">`,
        },
    };

    const guides = {
        kalli: `<h3>Tips & Tricks for Kalli</h3><p><strong>Key Tips:</strong> Coordinate plate assignments, call out symbols clearly, and prioritize add clear. Use Well of Radiance or Ward of Dawn for survivability. Watch for Knight spawns to avoid wipes.</p><p><strong>Tricks:</strong> Assign a dedicated add-clear role, use heavy weapons on Kalli during DPS phases, and practice symbol recognition for quick door entries.</p>`,
        "shuro-chi": `<h3>Tips & Tricks for Shuro Chi</h3><p><strong>Key Tips:</strong> Assign crystal runners early, interrupt the song with crystals (max 4 stacks), and stand on plates in sequence. Use tether or Divinity for add control and DPS boosts.</p><p><strong>Tricks:</strong> Practice 3x3 grid patterns, use nightfall/prestige emblems to avoid plate damage (if bugged), and coordinate puzzle phases for efficiency.</p>`,
        morgeth: `<h3>Tips & Tricks for Morgeth</h3><p><strong>Key Tips:</strong> Split into teams, manage Taken Strength (max 2), and kill Eyes of Riven for Essence to stun Morgeth. Use buffs like Well of Radiance for DPS phases.</p><p><strong>Tricks:</strong> Stun Morgeth at ~90% strength for extended DPS, dodge Axion Darts, and assign a support to call out Eye spawns clearly.</p>`,
        vault: `<h3>Tips & Tricks for Vault</h3><p><strong>Key Tips:</strong> Use middle symbol calls (e.g., "Downward Bird") for plate alignment, type "SP", "RA", etc., in chat. Clear adds, run orbs clockwise/counter-clockwise, and cleanse plates per debuff.</p><p><strong>Tricks:</strong> Deduce third plate with 2:1 ratio, shoot Phalanxes while running, and avoid "left/right"—use "Clockwise" or map names.</p>`,
        "queens-walk": `<h3>Tips & Tricks for Queen’s Walk</h3><p><strong>Key Tips:</strong> One player carries the Heart, others clear adds and stay close. Teleportation triggers when the timer hits zero—pick up Taken Strengths inside to extend the timer (one per person, last at 3-5 seconds).</p><p><strong>Tricks:</strong> Use Tractor Cannon push at start for speed, memorize the path (Rock, Tree, Stairs routes), and coordinate Strength pickups to avoid wipes. Blink or high-mobility for quick navigation.</p>`,
        "riven-normal": `<h3>Tips & Tricks for Riven (Normal)</h3><p><strong>Key Tips:</strong> Split into teams, call out eyes (L1, L2, R1, R2) and rooms, shoot correct eyes, and DPS in final phase. Use cluster rockets or heavy GLs for DPS.</p><p><strong>Tricks:</strong> Practice eye numbering (left-to-right, top-to-bottom), use Well of Radiance for survivability, and assign clear roles for adds.</p>`,
        "riven-cheese": `<h3>Tips & Tricks for Riven (Cheese)</h3><p><strong>Key Tips:</strong> All go to crystal side, use swords (Falling Guillotine) or cluster rockets with Tractor Cannon, and drop Well/Ward near Riven’s feet. DPS immediately at spawn, aiming for the mouth.</p><p><strong>Tricks:</strong> Time DPS to deal ~50% damage for stagger, use buffs for max damage, and watch for shadow spawns to confirm position.</p>`,
    };

    function updateContent(encounter) {
        showLoading(contentDisplay);
        showLoading(mapDisplay);
        setTimeout(() => {
            contentDisplay.innerHTML = "";
            mapDisplay.innerHTML = "";
            try {
                const content = encounterContent[encounter];
                if (!content) throw new Error("Encounter not found.");

                if (content.static) {
                    contentDisplay.innerHTML = content.static;
                    const images = contentDisplay.querySelectorAll("img");
                    images.forEach((img) => {
                        img.addEventListener("click", () =>
                            openModal(img.src, img.alt),
                        );
                        img.addEventListener("load", () => {
                            img.classList.add("loaded");
                        });
                        img.addEventListener("error", () => {
                            console.error("Image load error for:", img.src);
                            img.src = "./images/placeholder.webp"; // Fallback image
                        });
                    });
                }

                if (content.map) {
                    mapDisplay.innerHTML = content.map;
                    const mapImages = mapDisplay.querySelectorAll("img");
                    mapImages.forEach((img) => {
                        img.addEventListener("click", () =>
                            openModal(img.src, img.alt),
                        );
                        img.addEventListener("load", () => {
                            img.classList.add("loaded");
                        });
                        img.addEventListener("error", () => {
                            console.error("Image load error for:", img.src);
                            img.src = "./images/placeholder.webp"; // Fallback image
                        });
                    });
                }
            } catch (error) {
                handleError(contentDisplay, `Error: ${error.message}`);
                handleError(mapDisplay, `Error: ${error.message}`);
            }
        }, 300);
    }

    function openModal(src, alt) {
        console.log("Opening modal with src:", src, "alt:", alt); // Debug log
        if (!src) {
            console.error("No image source provided for modal");
            return;
        }
        modalImage.src = src;
        modalImage.alt = alt;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent scrolling
        // Ensure image loads before showing modal (optional fallback)
        modalImage.addEventListener(
            "load",
            () => {
                modalImage.style.opacity = "1";
            },
            { once: true },
        );
        modalImage.addEventListener("error", () => {
            modalImage.src = "./images/placeholder.webp"; // Fallback image
        });
        modalImage.style.opacity = "0"; // Start hidden until loaded
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
        modalImage.style.opacity = "0"; // Hide during cleanup
        modalImage.src = ""; // Clear image to free memory
        modalImage.alt = ""; // Clear alt text
    }

    // Close modal on click outside, close button, or Escape key
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target === modalClose) {
            closeModal();
        }
    });

    modalClose.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") {
            closeModal();
        }
    });

    // Accessibility: Enable keyboard navigation for select
    encounterSelect.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            encounterSelect.dispatchEvent(new Event("change"));
        }
    });

    // Initial content and guide
    const defaultEncounter = encounterSelect.value;
    showLoading(contentDisplay);
    showLoading(mapDisplay);
    updateContent(defaultEncounter);
    guide.innerHTML =
        guides[defaultEncounter] ||
        "<p>Select an encounter to view the guide.</p>";

    encounterSelect.addEventListener("change", (e) => {
        const encounter = e.target.value;
        showLoading(contentDisplay);
        showLoading(mapDisplay);
        updateContent(encounter);
        guide.innerHTML =
            guides[encounter] ||
            "<p>Select an encounter to view the guide.</p>";
        encounterSelect.focus();
    });

    // Add loading/error styles in CSS
    const styles = document.createElement("style");
    styles.textContent = `
        .loading, .error {
            color: #e6e6fa;
            font-size: 16px;
            text-align: center;
            padding: 20px;
            background: rgba(43, 26, 77, 0.8);
            border-radius: 5px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .error { color: #ff9999; }
        img.loaded { opacity: 1; transition: opacity 0.3s ease; }
        img:not(.loaded) { opacity: 0; }
        .clickable-image { cursor: pointer; }
    `;
    document.head.appendChild(styles);
});
