const express = require('express');
const path = require('path');
const app = express();

// Use dynamic port from Render or default to 3000 locally
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/symbols', (req, res) => {
    const symbols = require('./symbols.json');
    res.json(symbols);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
