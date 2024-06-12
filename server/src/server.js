require('dotenv').config(); // Load environment variables from a .env file into process.env
const express = require('express'); // Fast, unopinionated, minimalist web framework for Node.js
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const app = express(); // Create an Express application
const uuid = require('uuid'); // Require the uuid library to generate session tokens

app.use(cors()); // Enable All CORS Requests

const port = process.env.PORT || 3000; // Use the port from the environment variables or default to 3000
const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN; // Access the Mapbox access token from environment variables

// Verify the token is being read correctly
if (!mapboxAccessToken) {
    console.error('Mapbox Access Token is missing.');
    process.exit(1);
}

app.get('/api/suggestions', async (req, res) => {
    const input = req.query.input;
    if (!input || input.length <= 2) {
        return res.json(["No suggestions available"]);
    }

    const sessionToken = uuid.v4(); // Generate a new session token
    console.log(`Received input: ${input}`);

    try {
        const fetch = (await import('node-fetch')).default; // Use dynamic import for node-fetch
        const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${input}&language=en&types=city&session_token=${sessionToken}&access_token=${mapboxAccessToken}`);
        const data = await response.json();
        if (!data.suggestions || data.suggestions.length === 0) {
            console.error('No features in response:', data);
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
        const suggestions = data.suggestions.map(suggestion => suggestion.name);
        console.log(`Returning suggestions: ${suggestions}`);
        res.json(suggestions);
    } catch (error) {
        console.error('An error occurred while fetching data from Mapbox:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
