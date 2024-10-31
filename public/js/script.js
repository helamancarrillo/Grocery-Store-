
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


document.querySelector('.cart-icon').addEventListener('click', function() {
  this.classList.add('clicked');
  
  // Remove the class after the animation duration
  setTimeout(() => {
    this.classList.remove('clicked');
  }, 300); // Match this duration to the CSS transition duration
});


async function updateQuantity(title, change) {
    try {
      const response = await fetch('/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, change }),
      });
      const data = await response.json();
  
      if (data.success) {
        window.location.reload(); // Refresh to show updated quantities
      } else {
        console.error('Failed to update quantity:', data.message);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
}
  

