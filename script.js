const calcBtn = document.getElementById('calc-btn');
const resultBox = document.getElementById('result');

function calculateMaterials() {
    let reserveMultiplier = 1.1; //

    let length = Number(document.getElementById('room-length').value)
    let width = Number(document.getElementById('room-width').value)
    let price = Number(document.getElementById('price-per-m2').value)

    if (length > 0 && width > 0 && price > 0) {
        let area = length * width * reserveMultiplier;
        let totalPrice = area * price;

        let reserveToPercent = (reserveMultiplier - 1.0) * 100;

        resultBox.innerHTML = `Необходимо материала (с запасом <b>${reserveToPercent.toFixed(0)}</b>%): <b>${area.toFixed(1)} кв. м.</b><br>
        Итоговая стоимость: <b>${Math.round(totalPrice)} руб.</b>`;
    } else {
        resultBox.innerText = "Пожалуйста, заполните все поля корректными числами!";
    }

}

calcBtn.addEventListener('click', calculateMaterials);


const products = [
    {id: 1, title: 'cement', price: 450},
    {id: 2, title: 'perforator', price: 6200},
    {id: 3, title: 'cardboard', price: 380},
    {id: 4, title: 'paint', price: 2100},
];

const productsContainer = document.getElementById('products-container');

function renderProducts() {
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <h3>${product.title}</h3>
            <div class="product-price">${product.price} руб.</div>
            <button class="btn-add" onclick="addToCart('${product.title}', ${product.price})">В корзину</button>
        `;
        productsContainer.appendChild(card);
    });
}

renderProducts();


const cartList = document.getElementById('cart-list');
const cartCountElement = document.getElementById('cart-count');
let totalCartItems = 0;

function addToCart(title, price) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${title} - <b>${price} руб.</b></span>
        <button class="btn-delete">Удалить</button>
    `;

    const deleteBtn = li.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', function() {
        li.remove();
        totalCartItems--;
        cartCountElement.innerText = totalCartItems;
    });

    cartList.appendChild(li);

    totalCartItems++;
    cartCountElement.innerText = totalCartItems;
}