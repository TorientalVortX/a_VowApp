document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded: vault-of-glass/script.js');

    const contentDisplay = document.getElementById('content-display');
    const mapDisplay = document.getElementById('map-display');
    const guide = document.getElementById('encounter-guide');
    const encounterSelect = document.getElementById('encounter-select');
    const additionalDisplay = document.getElementById('additional-display');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');

    // Check for critical elements
    if (!contentDisplay || !mapDisplay || !guide || !encounterSelect || !additionalDisplay || !modal || !modalImage || !modalClose) {
        console.error('One or more critical elements not found in DOM');
        handleError(contentDisplay || document.body, 'Critical elements missing. Check HTML IDs.');
        return;
    }

    function showLoading(target) {
        if (target) target.innerHTML = '<p class="loading">Loading encounter details...</p>';
    }

    function handleError(target, message = 'Error loading content.') {
        if (target) target.innerHTML = `<p class="error">${message}</p>`;
    }

    const encounterContent = {
        spire: {
            static: `
                <h3>Opening the Spire</h3>
                <p><strong>Overview:</strong> Split into three teams of two to defend Sync Plates (left, middle, right) from Vex waves. Hold all plates for ~5 minutes to form the Spire and open the Vault.</p>
                <p><strong>Mechanics:</strong> Goblins and Hobgoblins spawn, with occasional Minotaurs. Malignant Cyclops appear randomly—kill them quickly to avoid sniping.</p>
            `,
            map: `<img src="./images/spire-map.webp" alt="Spire Map" loading="lazy">`
        },
        confluxes: {
            static: `
                <h3>Confluxes</h3>
                <p><strong>Overview:</strong> Defend three Confluxes from Vex sacrifices. Split into left, middle, right teams. Four sacrifices per Conflux wipe the team.</p>
                <p><strong>Mechanics:</strong> Fanatics leave Mark of Negation pools—avoid them. Overload Minotaurs spawn. Cleanse at the central well if marked during the Templar’s Ritual of Negation.</p>
            `,
            map: `<img src="./images/confluxes-map.webp" alt="Confluxes Map" loading="lazy">`
        },
        oracles: {
            static: `
                <h3>Oracles</h3>
                <p><strong>Overview:</strong> Destroy Oracles in spawn order across three waves (3, 5, 7 Oracles). Assign players to call out and shoot specific locations.</p>
                <p><strong>Mechanics:</strong> Wrong order marks the team for Negation—cleanse together at the well. Wyverns and Overload Minotaurs add pressure.</p>
            `,
            map: `<img src="./images/oracles-map.webp" alt="Oracles Map" loading="lazy">`
        },
        templar: {
            static: `
                <h3>Templar</h3>
                <p><strong>Overview:</strong> Use the Relic to break the Templar’s shield, then DPS. Avoid detain bubbles and kill Oracles in order.</p>
                <p><strong>Mechanics:</strong> Relic holder uses Super to drop shield. Harpies and Fanatics spawn. Break detain bubbles with teammate help.</p>
            `,
            map: `<img src="./images/templar-map.webp" alt="Templar Map" loading="lazy">`
        },
        gorgons: {
            static: `
                <h3>Gorgons' Labyrinth</h3>
                <p><strong>Overview:</strong> Stealth through the maze, avoiding Gorgon detection. Wipe if spotted unless killed in 10 seconds.</p>
                <p><strong>Mechanics:</strong> Stick to rocks and follow the right wall to exit. Secret chests are hidden in a hole behind the entrance and along the right wall.</p>
            `,
            map: `<img src="./images/gorgons-map.webp" alt="Gorgons Map" loading="lazy">`
        },
        gatekeeper: {
            static: `
                <h3>Gatekeeper</h3>
                <p><strong>Overview:</strong> Open Mars and Venus portals, kill Gatekeepers, and secure Aegis relics to defend Confluxes.</p>
                <p><strong>Mechanics:</strong> Split teams to hold portals and clear Oracles inside. Overload Minotaurs spawn outside. Sync relic retrieval to avoid wipes.</p>
            `,
            map: `<img src="./images/gatekeeper-map.webp" alt="Gatekeeper Map" loading="lazy">`
        },
        atheon: {
            static: `
                <h3>Atheon, Time’s Conflux</h3>
                <p><strong>Overview:</strong> Teleport three players to Mars/Venus to kill Oracles and retrieve the Aegis, then DPS Atheon from the center.</p>
                <p><strong>Mechanics:</strong> Call out Oracle order. Cleanse “Marked by the Void” debuff with Aegis. Avoid Supplicants and detain bubbles during DPS.</p>
            `,
            map: `<img src="./images/atheon-map.webp" alt="Atheon Map" loading="lazy">`
        }
    };

    const guides = {
        spire: `<h3>Tips & Tricks</h3><p>Use crowd control (e.g., Trinity Ghoul) for adds. Prioritize Cyclops with snipers or Xenophage.</p>`,
        confluxes: `<h3>Tips & Tricks</h3><p>Assign Overload stunners. Avoid Fanatic pools—use Well of Radiance for safety.</p>`,
        oracles: `<h3>Tips & Tricks</h3><p>Number Oracles 1-7 (left to right, top to bottom). Use Xenophage for one-shots.</p>`,
        templar: `<h3>Tips & Tricks</h3><p>Relic holder blocks teleport with Super. Use Anarchy or Witherhoard for sustained DPS.</p>`,
        gorgons: `<h3>Tips & Tricks</h3><p>Move as a group, pause on high rocks. Use Swords to spot Gorgons.</p>`,
        gatekeeper: `<h3>Tips & Tricks</h3><p>Coordinate portal teams with comms. Use Supers to clear Wyverns fast.</p>`,
        atheon: `<h3>Tips & Tricks</h3><p>Leave one Harpy alive per side to reduce spawns. Stack Well and Bubble for DPS.</p>`
    };

    function updateContent(encounter) {
        showLoading(contentDisplay);
        showLoading(mapDisplay);
        setTimeout(() => {
            try {
                const content = encounterContent[encounter];
                if (!content) throw new Error(`Encounter "${encounter}" not found`);
                contentDisplay.innerHTML = content.static || '<p>No overview available.</p>';
                mapDisplay.innerHTML = content.map || '<p>No map available.</p>';

                const images = mapDisplay.querySelectorAll('img');
                images.forEach(img => {
                    img.addEventListener('click', () => openModal(img.src, img.alt));
                    img.addEventListener('load', () => img.classList.add('loaded'));
                    img.addEventListener('error', () => {
                        img.src = './images/placeholder.webp'; // Your specified placeholder
                        img.alt = 'Placeholder Image';
                        img.classList.add('loaded');
                        img.style.opacity = '1';
                        img.style.display = 'block';
                    });
                });
            } catch (error) {
                handleError(contentDisplay, `Error: ${error.message}`);
                handleError(mapDisplay, `Error: ${error.message}`);
            }
        }, 300);
    }

    function openModal(src, alt) {
        if (!src) return;
        modalImage.src = src;
        modalImage.alt = alt;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modalImage.style.opacity = '0';
        modalImage.addEventListener('load', () => modalImage.style.opacity = '1', { once: true });
        modalImage.addEventListener('error', () => {
            modalImage.src = './images/placeholder.webp'; // Your specified placeholder
            modalImage.alt = 'Placeholder Image';
            modalImage.style.opacity = '1';
        });
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalImage.style.opacity = '0';
        modalImage.src = '';
        modalImage.alt = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalClose) closeModal();
    });
    modalClose.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });

    // Initial load
    const defaultEncounter = encounterSelect.value || 'spire';
    updateContent(defaultEncounter);
    guide.innerHTML = guides[defaultEncounter] || '<p>Select an encounter to view the guide.</p>';

    encounterSelect.addEventListener('change', (e) => {
        const encounter = e.target.value;
        updateContent(encounter);
        guide.innerHTML = guides[encounter] || '<p>Select an encounter to view the guide.</p>';
    });

    // Test placeholder availability
    const testPlaceholder = new Image();
    testPlaceholder.src = './images/placeholder.webp';
    testPlaceholder.addEventListener('load', () => console.log('Placeholder image loaded successfully'));
    testPlaceholder.addEventListener('error', () => {
        console.error('Placeholder image failed to load, check path:', testPlaceholder.src);
        handleError(contentDisplay, 'Placeholder image not found. Check ./images/placeholder.webp.');
    });
});