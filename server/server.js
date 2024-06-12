const express = require('express');
const app = express();
const port = 3000;

app.get('/api/suggestions', async (req, res) => {
    const input = req.query.input;
    console.log(`Received input: ${input}`);
    if (input.length > 2) {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${input}&limit=5`);
        const data = await response.json();
        const suggestions = data.data.map(city => city.city);
        res.json(suggestions);
    } else {
        res.json(["No suggestions available"]);
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://0.0.0.0:${port}`);
});