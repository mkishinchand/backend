const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: ['https://smm-services-frontend-fpon-111.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

const API_URL = 'https://smmpakpanel.com/api/v2';
const API_KEY = process.env.API_KEY;

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// CORS test route
app.get('/cors-test', (req, res) => {
  res.json({ message: 'CORS is working' });
});

app.post('/api/order', async (req, res) => {
  try {
    const { service, link, quantity } = req.body;
    const response = await axios.post(API_URL, {
      key: API_KEY,
      action: 'add',
      service,
      link,
      quantity
    }, {
      headers: {
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
