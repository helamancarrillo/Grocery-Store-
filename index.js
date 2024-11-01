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

// Update item quantity in cart
app.post('/cart/update', (req, res) => {
  const { title, change } = req.body;
  const item = cart.find(item => item.title === title);

  if (item) {
    item.quantity = Math.max(1, item.quantity + change); // Ensures quantity doesn’t go below 1
    res.json({ success: true, cart });
  } else {
    res.json({ success: false, message: 'Item not found' });
  }
});


// Get cart route
app.get('/cart', (req, res) => {
  res.render('cart', { cart });
});

// Get Product Details
//app.get('/products/:id', async (req, res) => {
//  const productId = req.params.id;
//  try {
//    const response = await axios.get(
//      `https://api.spoonacular.com/food/products/${productId}?apiKey=${API_KEY}`
//    );
//    const productDetails = response.data;
//    res.render('productDetails', { productDetails }); // Render product details view
//  } catch (error) {
//    console.error('Error fetching product details:', error);
//    res.status(500).send('Error fetching product details.');
//  }
//});

//app.get('/ingredient/:id', async (req, res) => {
//  const ingredientId = req.params.id;
//  try {
//      const ingredientResponse = await axios.get(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information?apiKey=${API_KEY}`);
//      const ingredientDetails = ingredientResponse.data;
//
//      // Render the ingredient details page
//      res.render('ingredientDetails', { ingredientDetails });
//  } catch (error) {
//      console.error('Error fetching ingredient details:', error);
//      res.status(500).send('Error fetching ingredient details.');
//  }
//});

app.get('/recipes', async (req, res) => {
  const query = req.query.q; // Get the search query from the request
  try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`);
      const recipes = response.data.results; // Get the recipes from the response
      res.render('recipes', { recipes }); // Render the recipes view with the fetched data
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).send('Error fetching recipes.');
  }
});

//app.get('/recipe/:id', async (req, res) => {
//  const recipeId = req.params.id;
//  try {
//      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
//      const recipeDetails = response.data; // Get recipe details
//      res.render('recipeDetails', { recipeDetails }); // Render recipe details view
//  } catch (error) {
//      console.error('Error fetching recipe details:', error);
//      res.status(500).send('Error fetching recipe details.');
//  }
//});

app.get('/recipe/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: { apiKey: process.env.API_KEY },
    });
    let recipeDetails = response.data;
    // Remove HTML tags from instructions
    recipeDetails.instructions = recipeDetails.instructions.replace(/<\/?[^>]+(>|$)/g, '');

    res.render('recipeDetails', { recipeDetails });
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).send('Error fetching recipe details.');
  }
});

//receipts founder
app.get('/mainrece', (req, res) => {
  res.render('mainrece');
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));





