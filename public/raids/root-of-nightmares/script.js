// VowApp/public/raids/root-of-nightmares/script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded: root-of-nightmares/script.js');

    const contentDisplay = document.getElementById('content-display');
    const mapDisplay = document.getElementById('map-display');
    const guide = document.getElementById('encounter-guide');
    const encounterSelect = document.getElementById('encounter-select');
    const additionalDisplay = document.getElementById('additional-display');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');

    // Log element existence immediately
    console.log('Checking elements:', {
        contentDisplay: contentDisplay ? 'Found' : 'Not found',
        mapDisplay: mapDisplay ? 'Found' : 'Not found',
        guide: guide ? 'Found' : 'Not found',
        encounterSelect: encounterSelect ? 'Found' : 'Not found',
        additionalDisplay: additionalDisplay ? 'Found' : 'Not found',
        modal: modal ? 'Found' : 'Not found',
        modalImage: modalImage ? 'Found' : 'Not found',
        modalClose: modalClose ? 'Found' : 'Not found'
    });

    if (!contentDisplay || !mapDisplay || !guide || !encounterSelect || !additionalDisplay || !modal || !modalImage || !modalClose) {
        console.error('One or more critical elements not found in DOM');
        handleError(contentDisplay || document.body, 'Critical elements missing. Check HTML IDs.');
        return;
    }

    // Show loading state while content loads
    function showLoading(target) {
        if (target) target.innerHTML = '<p class="loading">Loading encounter details...</p>';
        else console.error('Target for showLoading is null');
    }

    // Handle content errors
    function handleError(target, message = 'Error loading content.') {
        if (target) {
            target.innerHTML = `<p class="error">${message}</p>`;
            console.error('Error displayed:', message);
        } else {
            console.error('Target for handleError is null:', message);
            document.body.innerHTML += `<p class="error">${message}</p>`;
        }
    }

    const encounterContent = {
        opening: {
            static: `
                <h3>Opening & Deepsight Resonance Puzzle</h3>
                <p><strong>Overview:</strong> After launching into the raid, push forward through the puddle in front of you and take the path on your left. Follow Cabal enemies as a guide toward the first encounter, Cataclysm.</p>
                <p><strong>Deepsight Resonance Puzzle:</strong> Before proceeding, keep left to find three seeds behind a building. Note their Light or Dark order (left to right) for a guaranteed Deepsight Resonance weapon after defeating Nezarec. Continue forward to an iridescent platform leading to Cataclysm.</p>
                <p><strong>Puzzle #1:</strong> Turn around, jump through rubble behind the platform to descend into a hidden room. Shoot the node matching the first seed’s color, connecting it correctly to see "Your Actions Take Root." Shooting the wrong node locks you out for that attempt, showing "Your Spoils Suffer Irreparable Damage."</p>
            `,
            map: `<img src="./images/opening-map.webp" alt="Opening Map" loading="lazy">`
        },
        cataclysm: {
            static: `
                <h3>Cataclysm</h3>
                <p><strong>Overview:</strong> The first major encounter requires connecting nodes across a large map. Stand in the glowing Field of Light aura, shoot it to gain a 20-second buff, and follow the line to another node, shooting while buffed. Repeat to complete a relay.</p>
                <p><strong>Mechanics:</strong> Sweeping Terror wipes your team after 35 seconds. Extend the timer by meleeing two Scions (in bubbles) to spawn a Tormenter (left or right, randomly) and a Barrier Champion (opposite side). Defeat the Tormenter quickly to extend the timer. Assign one player as a node runner, with five clearing enemies, Scions, and Tormenters. There are four waves, with nodes, Scions, and Tormenters moving further down the map each wave.</p>
                <p><strong>Tips:</strong> Break Tormenter shoulders with Divinity and Izanagi’s Burden for fast kills. Use Retrofit Escapade or Corrective Measure for critical damage, Forbearance for adds, and Well of Radiance for survivability. After the final wave, loot the chest in the back right, then jump down the bridge behind it for a short launch pad jumping puzzle to Scission.</p>
                <p><strong>Secret Chest #1:</strong> At the end of the jumping puzzle, follow the iridescent path left, jump through the door on the right where Scions snipe, defeat enemies, and find the chest with a Tormenter.</p>
            `,
            map: `<img src="./images/cataclysm-map.webp" alt="Cataclysm Map" loading="lazy">`
        },
        scission: {
            static: `
                <h3>Scission</h3>
                <p><strong>Overview:</strong> This encounter expands on Cataclysm’s mechanics with Light and Dark nodes. Split into two teams of three: one runner per team crisscrosses with Field of Light or Flux of Darkness (20-second buffs), while others clear enemies.</p>
                <p><strong>Mechanics:</strong> Runners use launchpads to connect nodes in a relay, refreshing buffs in moving auras. Teammates stand in auras to gain buffs, defeating immune enemies. Push forward, ensuring runners track node order—going backwards despawns nodes for 20 seconds. After each relay, defeat a mini-boss (damage only with buffs, synced shots required to avoid softlocks). There are three levels, each with a 2-minute timer and a Barrier Champion at the end.</p>
                <p><strong>Tips:</strong> Runners ignore enemies, equip Anti-Barrier weapons, and use Forbearance, Osteo Striga, or Outbreak Perfected for adds. Sync node shots on "The Interlopers Block Your Ascent," then use launchpads to ascend. After completing, solve a short Light/Dark node puzzle to reach the Jumping Puzzle.</p>
            `,
            map: `<img src="./images/scission-map.webp" alt="Scission Map" loading="lazy">`
        },
        'jumping-puzzle': {
            static: `
                <h3>Jumping Puzzle</h3>
                <p><strong>Overview:</strong> Unlike typical Destiny 2 jumping puzzles, this requires managing a wipe mechanic with Darkness’ Refuge pools. Shoot a Field of Light node, jump to a Dark zone below, and shoot it to create a Refuge pool, granting immunity for 45 seconds or until you leave (15-second countdown).</p>
                <p><strong>Mechanics:</strong> Follow Light/Dark zones, splitting into two teams of three. One player per team creates and holds a Refuge, then signals others to move. Navigate carefully, avoiding the wipe mechanic every 45 seconds. In large rooms, wait in Refuges for doors to open with the full fireteam.</p>
                <p><strong>Tips:</strong> Use high-mobility for quick jumps, coordinate Refuge timing, and watch for Scions. Check for Deepsight Puzzle #2 mid-puzzle: use the launchpad on a building, turn around, and jump into a floating building to find the node.</p>
                <p><strong>Secret Chest #2:</strong> In the large arena, turn around, look left, shoot the Darkness node below to unlock a door in the back holding the chest.</p>
            `,
            map: `<img src="./images/jumping-puzzle-map.webp" alt="Jumping Puzzle Map" loading="lazy">`
        },
        macrocosm: {
            static: `
                <h3>Macrocosm</h3>
                <p><strong>Overview:</strong> The first boss fight pits you against Nezarec’s influence. Split into teams of two: two in the middle clearing enemies, two on bottom platforms, and two on top. Kill Centurions to spawn Colossi on platforms, defeating them for Planetary Insight (showing planet Light/Dark status).</p>
                <p><strong>Mechanics:</strong> Left platforms show Light planets, right show Dark. Find the odd planet (e.g., Dark on left), interact, and swap with your partner on the opposite side under Planetary Shift’s timer. Repeat until Colossi spawn again, revealing three planets (two of one color, one of another). Grab and dunk planets on matching plates in the center, then shoot the central Darkness node for a DPS phase. Match Nezarec’s aura color (Light/Dark) on plates to damage, rotating as needed. Repeat for Final Stand to avoid a wipe.</p>
                <p><strong>Tips:</strong> Use Well of Radiance for DPS/healing, Gjallarhorn/Hothead for rockets, and mark planet colors in chat. Dodge Planetary Shift timer and position for crit shots.</p>
            `,
            map: `<img src="./images/macrocosm-map.webp" alt="Macrocosm Map" loading="lazy">`
        },
        nezarec: {
            static: `
                <h3>Nezarec, Final God of Pain</h3>
                <p><strong>Overview:</strong> The final boss requires extending nodes on both sides while managing Nezarec’s mechanics. Split into two runners (one per side) and four to distract Nezarec, clearing adds.</p>
                <p><strong>Mechanics:</strong> Runners gain Field of Light or Flux of Darkness, extending nodes to start DPS phases. Others steal Nezarec’s Hatred (by shooting glowing crit spots: shoulders/chest) to avoid wipes. Create Refuges (Light/Dark) by runners shooting opposite nodes with buffs (e.g., Dark runner shoots Light node for Light’s Refuge). After both sides complete nodes, group on central platforms, destroy crit spots, and DPS Nezarec until immune. Repeat for three phases, avoiding Enrage, then finish in Final Stand (10 seconds).</p>
                <p><strong>Tips:</strong> Use Divinity/Thunderlord for single-phase kills, clear Colossi quickly, and position carefully for crit shots. Watch Enrage timer and manage Nezarec’s movement to avoid deaths.</p>
                <p><strong>Deepsight Puzzle #3:</strong> Before this encounter, ascend the large cube, look down, jump to debris below, and enter the room for the final node to complete the Deepsight Resonance puzzle.</p>
            `,
            map: `<img src="./images/nezarec-map.webp" alt="Nezarec Map" loading="lazy">`
        }
    };

    const guides = {
        opening: `<h3>Tips & Tricks for Opening & Deepsight Puzzle</h3><p><strong>Key Tips:</strong> Follow Cabal enemies to navigate. Check seeds (Light/Dark order) at the start for Deepsight Resonance. Solve node puzzles in hidden rooms carefully to avoid locking out.</p><p><strong>Tricks:</strong> Use high-mobility jumps for platforming, mark seed colors in fireteam chat, and practice node connections to avoid "Spoils Suffer Irreparable Damage."</p>`,
        cataclysm: `<h3>Tips & Tricks for Cataclysm</h3><p><strong>Key Tips:</strong> Assign one runner for nodes, five for adds/Scions/Tormenters. Extend Sweeping Terror with Scion melees and Tormenter kills. Use Well of Radiance for survivability.</p><p><strong>Tricks:</strong> Break Tormenter shoulders with Divinity/Izanagi’s Burden, use Retrofit Escapade/Corrective Measure for DPS, and clear Barrier Champions quickly.</p>`,
        scission: `<h3>Tips & Tricks for Scission</h3><p><strong>Key Tips:</strong> Split into two teams, runners crisscross with Light/Dark buffs, others clear adds. Sync node shots to avoid softlocks. Use launchpads for speed.</p><p><strong>Tricks:</strong> Ignore enemies as runners, equip Anti-Barrier weapons, and use Forbearance/Osteo Striga for add clear. Practice relay order to avoid despawn.</p>`,
        'jumping-puzzle': `<h3>Tips & Tricks for Jumping Puzzle</h3><p><strong>Key Tips:</strong> Manage Darkness’ Refuge pools to avoid wipe mechanics (45s timer). Split into teams, one player per group holds Refuge, others follow. Shoot Light/Dark nodes to create pools.</p><p><strong>Tricks:</strong> Use high-mobility for quick jumps, coordinate Refuge timing, and watch for Scions in large rooms. Check for Deepsight Puzzle #2 mid-puzzle.</p>`,
        macrocosm: `<h3>Tips & Tricks for Macrocosm</h3><p><strong>Key Tips:</strong> Split into teams (middle, top, bottom platforms). Kill Colossi for Planetary Insight, swap odd planets, and dunk correctly. Use Well of Radiance for DPS phases.</p><p><strong>Tricks:</strong> Mark planet colors in chat, use Gjallarhorn/Hothead for boss damage, and dodge Planetary Shift timer. Practice syncing planet swaps.</p>`,
        nezarec: `<h3>Tips & Tricks for Nezarec</h3><p><strong>Key Tips:</strong> Two runners extend nodes, others distract Nezarec. Steal Nezarec’s Hatred, create Refuges (Light/Dark) to avoid wipes. Finish in three DPS phases.</p><p><strong>Tricks:</strong> Use Divinity/Thunderlord for single-phase kill, clear Colossi quickly, and position for crit shots (shoulders/chest). Watch Enrage timer for Final Stand.</p>`
    };

    function updateContent(encounter) {
        console.log('Updating content for encounter:', encounter);
        showLoading(contentDisplay);
        showLoading(mapDisplay);
        setTimeout(() => {
            try {
                const content = encounterContent[encounter];
                if (!content) {
                    throw new Error(`Encounter "${encounter}" not found in encounterContent`);
                }

                contentDisplay.innerHTML = content.static || '<p>No overview available.</p>';
                mapDisplay.innerHTML = content.map || '<p>No map available.</p>';

                const images = mapDisplay.querySelectorAll('img'); // Only maps remain as images
                images.forEach(img => {
                    img.addEventListener('click', () => openModal(img.src, img.alt));
                    img.addEventListener('load', () => {
                        console.log('Image loaded:', img.src);
                        img.classList.add('loaded');
                    });
                    img.addEventListener('error', () => {
                        console.error('Image load error for:', img.src);
                        img.src = './images/placeholder.webp'; // Fallback image
                        img.alt = 'Placeholder Image';
                        img.classList.add('loaded');
                        img.style.opacity = '1';
                        img.style.display = 'block';
                    });
                });
            } catch (error) {
                console.error('Error in updateContent:', error);
                handleError(contentDisplay, `Error: ${error.message}`);
                handleError(mapDisplay, `Error: ${error.message}`);
            }
        }, 300);
    }

    function openModal(src, alt) {
        console.log('Opening modal with src:', src, 'alt:', alt);
        if (!src) {
            console.error('No image source provided for modal');
            handleError(modal, 'No image available for display.');
            return;
        }
        modalImage.src = src;
        modalImage.alt = alt;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        modalImage.style.opacity = '0'; // Start hidden until loaded
        modalImage.addEventListener('load', () => {
            console.log('Modal image loaded:', src);
            modalImage.style.opacity = '1';
        }, { once: true });
        modalImage.addEventListener('error', () => {
            console.error('Modal image failed to load:', src);
            modalImage.src = './images/placeholder.webp'; // Fallback image
            modalImage.alt = 'Placeholder Image';
            modalImage.style.opacity = '1';
        });
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        modalImage.style.opacity = '0';
        modalImage.src = ''; // Clear image to free memory
        modalImage.alt = ''; // Clear alt text
    }

    // Close modal on click outside, close button, or Escape key
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalClose) {
            closeModal();
        }
    });

    modalClose.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Accessibility: Enable keyboard navigation for select
    encounterSelect.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            encounterSelect.dispatchEvent(new Event('change'));
        }
    });

    // Initial content, map, guide, and additional info
    const defaultEncounter = encounterSelect.value || 'opening';
    console.log('Initializing with default encounter:', defaultEncounter);
    showLoading(contentDisplay);
    showLoading(mapDisplay);
    updateContent(defaultEncounter);
    guide.innerHTML = guides[defaultEncounter] || '<p>Select an encounter to view the guide.</p>';
    additionalDisplay.innerHTML = additionalDisplay.innerHTML; // Keep static content

    encounterSelect.addEventListener('change', (e) => {
        const encounter = e.target.value;
        console.log('Encounter changed to:', encounter);
        showLoading(contentDisplay);
        showLoading(mapDisplay);
        updateContent(encounter);
        guide.innerHTML = guides[encounter] || '<p>Select an encounter to view the guide.</p>';
        encounterSelect.focus();
    });

    // Test and ensure placeholder image is available
    const testPlaceholder = new Image();
    testPlaceholder.src = './images/placeholder.webp';
    testPlaceholder.addEventListener('load', () => {
        console.log('Placeholder image loaded successfully');
    });
    testPlaceholder.addEventListener('error', () => {
        console.error('Placeholder image failed to load, check path:', testPlaceholder.src);
        handleError(contentDisplay, 'Placeholder image not found. Check ./images/placeholder.webp.');
    });

    // Force initial content load if no default is set
    if (!encounterSelect.value) {
        encounterSelect.value = 'opening';
        updateContent('opening');
        guide.innerHTML = guides.opening || '<p>Select an encounter to view the guide.</p>';
    }
});