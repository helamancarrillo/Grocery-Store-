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
// Search groceries by category or query
app.get('/search', async (req, res) => {
  const query = req.query.q || req.query.category; // Get category if available
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


// Cart logic
let cart = [];

// Add to cart route
app.post('/cart', (req, res) => {
  const { title, image } = req.body;
  const existingItem = cart.find(item => item.title === title);
  
  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity if already in cart
  } else {
    cart.push({ title, image, quantity: 1 }); // Add new item
  }

  res.status(200).json({ cart });
});

// Get cart route
app.get('/cart', (req, res) => {
  res.render('cart', { cart });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



