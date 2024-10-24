require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());




 

const API_KEY = process.env.API_KEY;

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Search groceries
app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/food/products/search?query=${query}&apiKey=${API_KEY}`
    );
    const products = response.data.products;
    res.render('results', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products.');
  }
});

// Cart logic (optional)
let cart = [];

app.post('/cart', (req, res) => {
  const { item } = req.body;
  cart.push(item);
  res.status(200).json({ cart });
});

app.get('/cart', (req, res) => {
  res.render('cart', { cart });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



