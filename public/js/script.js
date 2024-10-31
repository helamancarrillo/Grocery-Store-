
async function addToCart(title, image) {
  const response = await fetch('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, image }),
  });
  const data = await response.json();
  console.log('Cart:', data.cart);
}



function searchByCategory(category) {
    window.location.href = `/search?category=${category}`;
}


function setDefaultImage(event) {
    event.target.src = '/public/images/placeholder.png';
    event.target.onerror = null; // Prevents infinite loop
  }
