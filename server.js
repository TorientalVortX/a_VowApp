const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use Render's PORT or default to 3000 locally

app.get('/', (req, res) => {
    res.send('Hello from Render!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
