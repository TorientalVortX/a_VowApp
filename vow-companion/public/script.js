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

// Encounter guide (basic implementation)
document.getElementById("encounter-select").addEventListener("change", (e) => {
    const guide = document.getElementById("encounter-guide");
    const encounter = e.target.value;
    const guides = {
        acquisition: "Collect 3 shards and deposit them while managing adds.",
        caretaker: "Stun the Caretaker by shooting symbols in sequence.",
        exhibition: "Rotate relics between rooms while calling out symbols.",
        rhulk: "Split the team to manage force types and dunk at totems.",
    };
    guide.innerHTML = `<p>${guides[encounter] || "Select an encounter to view the guide."}</p>`;
});
