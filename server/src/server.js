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

// Sends a list of 5 city suggestions based on the input
app.get('/api/suggestions', async (req, res) => {
    const input = req.query.input;
    // If the input is empty or less than 3 characters, return a message
    if (!input || input.length <= 2) {
        return res.json(["No suggestions available"]);
    }

    const sessionToken = "0" // uuid.v4(); // Generate a new session token
    console.log(`Received input: ${input}`);

    // Fetch data from the Mapbox API
    try {
        const fetch = (await import('node-fetch')).default; // Use dynamic import for node-fetch
        const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${input}&language=en&types=city&session_token=${sessionToken}&access_token=${mapboxAccessToken}`);
        const data = await response.json();
        console.log('Received response:', data);
        // If there are no suggestions, return an error message
        if (!data.suggestions || data.suggestions.length === 0) {
            console.error('No features in response:', data);
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
        // Return the suggestions
        res.json(data.suggestions.map(suggestion => suggestion));
    } catch (error) {
        console.error('An error occurred while fetching data from Mapbox:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Reverse geocoding endpoint
app.get('/api/coordinates', async (req, res) => {
    const place = req.query.location;
    const endpoint = "mapbox.places";

    // If the place is empty, return a message
    if (!place) {
        return res.json(["No coordinates available"]);
    }

    console.log(`Received place: ${place}`);

    // Fetch data from the Mapbox API
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/${endpoint}/${place}.json?types=place&fuzzyMatch=true&access_token=${mapboxAccessToken}`);
        
        // Check if the response is ok
        if (!response.ok) {
            console.error('An error occurred while fetching data from Mapbox:', response.statusText);
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        // If the response is empty, return a message
        } else if (response.status === 204 || response.status === 205 || response.status === 404) {
            console.error('No features in response:', response.statusText);
            return null;
        // If the response is not empty, return the coordinates
        } else {
            const data = await response.json();
            console.log('Received response:', data);
            // If there are no features, return an error message
            if (!data.features || data.features.length === 0) {
                console.error('No features in response:', data);
                return res.status(500).json({ error: 'An error occurred while processing your request.' });
            }
            res.json(data.features[0].center);
        }
    } catch (error) {
        console.error('An error occurred while fetching coordinate data from Mapbox:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }

});

// Restaurants endpoint
app.get('/api/restaurants', async (req, res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const radius = req.query.distance;

    // If the latitude or longitude is empty, return a message
    if (!latitude || !longitude || !radius) {
        return res.json(["No restaurants available"]);
    }

    console.log(`Received latitude: ${latitude}, longitude: ${longitude}`);
    console.log(`Received radius: ${radius}`);

    // Fetch data from the Mapbox API
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/fast%20food.json?proximity=${longitude},${latitude}&radius=${radius}&types=poi&limit=10&access_token=${mapboxAccessToken}`);
        const data = await response.json();
        console.log('Received response:', data);
        // If there are no features, return an error message
        if (!data.features || data.features.length === 0) {
            console.error('No features in response:', data);
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
        // Return the restaurants
        res.json(data.features.map(feature => feature));
    } catch (error) {
        console.error('An error occurred while fetching data from Mapbox:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
