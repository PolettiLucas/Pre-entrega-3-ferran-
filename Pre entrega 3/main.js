
const fruits = [];
const cart = [];
const fruitListEl = document.getElementById('fruitList');
const cartListEl = document.getElementById('cartList');
const totalEl = document.getElementById('total');
const fruitInputEl = document.getElementById('fruitInput');
const addFruitBtn = document.getElementById('addFruit');
const buyButton = document.getElementById('buyButton'); 


function displayFruits() {
    fruitListEl.innerHTML = '';
    fruits.forEach((fruit, index) => {
        const fruitItem = document.createElement('div');
        fruitItem.className = 'fruit-item';
        fruitItem.textContent = `${fruit.name} - Precio: $${fruit.price}`;
        
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al carrito';
        addButton.onclick = () => addToCart(index);
        
        fruitItem.appendChild(addButton);
        fruitListEl.appendChild(fruitItem);
    });
    console.log('Frutas mostradas:', fruits);
}


function addToCart(index) {
    cart.push(fruits[index]);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`Fruta agregada al carrito: ${fruits[index].name}`);
    updateCart();
}


function updateCart() {
    cartListEl.innerHTML = '';
    let total = 0;
    cart.forEach((fruit, index) => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${fruit.name} - Precio: $${fruit.price}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => removeFromCart(index);
        
        cartItem.appendChild(deleteButton);
        cartListEl.appendChild(cartItem);
        total += fruit.price;
    });
    totalEl.textContent = total;
    console.log('Carrito actualizado:', cart);
}


function removeFromCart(index) {
    const removedFruit = cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`Fruta eliminada del carrito: ${removedFruit[0].name}`);
    updateCart();
}


function addFruit() {
    const fruitName = fruitInputEl.value.trim();
    const fruitPrice = Math.floor(Math.random() * 30) + 1; 

    if (fruitName === '') {
        alert('Por favor, ingresa un nombre de fruta.');
        return;
    }

    const newFruit = { name: fruitName, price: fruitPrice };
    fruits.push(newFruit);
    localStorage.setItem('fruits', JSON.stringify(fruits));
    console.log(`Fruta añadida: ${fruitName} - Precio: $${fruitPrice}`);
    displayFruits();
    fruitInputEl.value = '';
}


function buy() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega frutas para comprar.');
        console.log('Intento de compra fallido: carrito vacío.');
        return;
    }
    
    alert('Compra realizada con éxito. Gracias por tu compra!');
    console.log('Compra realizada:', cart);
    cart.length = 0; 
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}


window.onload = () => {
    const storedFruits = JSON.parse(localStorage.getItem('fruits'));
    if (storedFruits) {
        fruits.push(...storedFruits);
    }
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart.push(...storedCart);
    }
    displayFruits();
    updateCart();
};


addFruitBtn.addEventListener('click', addFruit);
buyButton.addEventListener('click', buy); 


function clearHistory() {
    localStorage.removeItem('fruits');
    localStorage.removeItem('cart');
    fruits.length = 0; 
    cart.length = 0;   
    displayFruits();   
    updateCart();      
    alert('Historial eliminado.');
}


const clearHistoryButton = document.getElementById('clearHistoryButton');
clearHistoryButton.addEventListener('click', clearHistory);

