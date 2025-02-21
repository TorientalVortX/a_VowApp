// Fetch and display symbols
fetch("/api/symbols")
    .then((response) => response.json())
    .then((data) => {
        const symbolGrid = document.getElementById("symbol-grid");
        data.symbols.forEach((symbol) => {
            const card = document.createElement("div");
            card.className = "symbol-card";
            card.innerHTML = `
                <h3>${symbol.name}</h3>
                <p>${symbol.description}</p>
            `;
            symbolGrid.appendChild(card);
        });
    });

// Callout functionality
function addCallout() {
    const input = document.getElementById("callout-input");
    const list = document.getElementById("callout-list");
    if (input.value.trim()) {
        const li = document.createElement("li");
        li.textContent = input.value;
        list.appendChild(li);
        input.value = "";
    }
}

// Enhanced encounter guides
document.getElementById("encounter-select").addEventListener("change", (e) => {
    const guide = document.getElementById("encounter-guide");
    const encounter = e.target.value;
    const guides = {
        acquisition: `
            <h3>Acquisition</h3>
            <p><strong>Objective:</strong> Activate three obelisks by offering correct symbols.</p>
            <p><strong>Mechanics:</strong></p>
            <ul>
                <li>Split into three teams of two: one defender, one runner per obelisk.</li>
                <li>Shoot the central crystal to start; obelisks show three symbols each.</li>
                <li>Defeat Disciple's Compass (Taken Knight) to reveal a symbol (Traveler or Pyramid) indicating the side.</li>
                <li>Runners enter rooms marked by symbols (e.g., Light, Darkness) to kill Glyphkeepers.</li>
                <li>Glyphkeepers drop symbols; match them to obelisk symbols and shoot them.</li>
                <li>Prevent Abated Adherents from charging obelisks (wipes if full).</li>
            </ul>
            <p><strong>Tips:</strong> Use blinding grenades for crowd control, Gjallarhorn for Glyphkeepers.</p>
        `,
        caretaker: `
            <h3>Caretaker</h3>
            <p><strong>Objective:</strong> Stun and damage the Caretaker across three floors.</p>
            <p><strong>Mechanics:</strong></p>
            <ul>
                <li>Split: two stunners, two runners, two add clearers.</li>
                <li>Runners enter side rooms (Light/Darkness) to collect three symbols each, dunk at obelisk.</li>
                <li>Stunners shoot Caretaker's face (front) and back (glows) to halt progress.</li>
                <li>Obelisk fills with nine symbols total; then DPS phase begins.</li>
                <li>DPS on platforms; Caretaker moves up floors. Final stand at top.</li>
            </ul>
            <p><strong>Tips:</strong> Izanagi's Burden + Rockets for DPS, Divinity for debuff.</p>
        `,
        exhibition: `
            <h3>Exhibition</h3>
            <p><strong>Objective:</strong> Clear four rooms with relics under a timer.</p>
            <p><strong>Mechanics:</strong></p>
            <ul>
                <li>Three relics: Darkness Shard, Taken Essence, Aegis.</li>
                <li>Terminal Resonance timer (40s base); extend by killing Disciple's Hourglass.</li>
                <li>Two Glyphkeepers per room (Scorn + Taken); reveal symbols.</li>
                <li>Relic holders see unique symbols; match and shoot to progress.</li>
                <li>Deposit relics before timer ends or wipe.</li>
                <li>Pervading Darkness stacks; Aegis cleanses it.</li>
            </ul>
            <p><strong>Tips:</strong> Assign relic roles early, prioritize communication.</p>
        `,
        rhulk: `
            <h3>Rhulk</h3>
            <p><strong>Objective:</strong> Break Rhulk's shield, then defeat him.</p>
            <p><strong>Mechanics:</strong></p>
            <ul>
                <li>Shoot crystal to start; Leeching Force gained (survives laser).</li>
                <li>Defeat Glyphkeepers for symbols; deposit Emanating Force at matching obelisks (six times).</li>
                <li>Shield recedes; shoot Rhulk's glaive for DPS prep.</li>
                <li>Three deposits expose weak points; damage until final stand.</li>
                <li>Pervading Darkness stacks to x10 = wipe.</li>
            </ul>
            <p><strong>Tips:</strong> Coordinate deposits, use Supers (e.g., Thundercrash) for final stand.</p>
        `,
    };
    guide.innerHTML =
        guides[encounter] || "<p>Select an encounter to view the guide.</p>";
});
