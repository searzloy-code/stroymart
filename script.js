// Конструкция $(document).ready() гарантирует, что JS запустится ПОСЛЕ полной загрузки HTML
$(document).ready(function() {

    // 1. ДАННЫЕ ТОВАРОВ
    const products = [
        { id: 1, title: 'Сухая смесь цемент (50кг)', price: 450 },
        { id: 2, title: 'Перфоратор электрический', price: 6200 },
        { id: 3, title: 'Гипсокартон KNAUF (12.5мм)', price: 380 },
        { id: 4, title: 'Краска фасадная белая (10л)', price: 2100 }
    ];

    let totalCartItems = 0;

    // 2. РЕНДЕР КАТАЛОГА (Используем синтаксис jQuery и методы $())
    function renderProducts(maxPrice = 7000) {
        const $container = $('#products-container');
        $container.empty(); // Эквивалент innerHTML = ''

        products.forEach(product => {
            if (product.price <= maxPrice) {
                const productHtml = `
                    <div class="col product-card-wrapper" style="display: none;">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 class="card-title fw-bold">${product.title}</h5>
                                    <p class="card-text text-warning fs-4 fw-bold mb-3">${product.price} руб.</p>
                                </div>
                                <button class="btn btn-dark w-100 btn-add-cart" data-title="${product.title}" data-price="${product.price}">
                                    В корзину
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                const $card = $(productHtml);
                $container.append($card);
                $card.fadeIn(400); // Плавное появление карточки!
            }
        });
    }

    renderProducts();

    // 3. JQUERY UI SLIDER (Слайдер цен)
    $('#price-slider').slider({
        range: 'min',
        value: 7000,
        min: 300,
        max: 7000,
        step: 100,
        slide: function(event, ui) {
            $('#price-value').text(ui.value);
            renderProducts(ui.value); // Перерисовываем товары на лету при движении ползунка
        }
    });

    // 4. ДОБАВЛЕНИЕ В КОРЗИНУ С АНИМАЦИЕЙ
    // Используем делегирование событий в jQuery ($(document).on)
    $(document).on('click', '.btn-add-cart', function() {
        const title = $(this).data('title');
        const price = $(this).data('price');

        const $newItem = $(`
            <li class="list-group-item d-flex justify-content-between align-items-center" style="display:none; cursor: grab;">
                <span>☰ <strong>${title}</strong> — <strong class="text-warning">${price} руб.</strong></span>
                <button class="btn btn-sm btn-danger btn-delete">Удалить</button>
            </li>
        `);

        $('#cart-list').append($newItem);
        $newItem.slideDown(300); // Плавное выпадение вниз!

        totalCartItems++;
        $('#cart-count').text(totalCartItems);
    });

    // 5. УДАЛЕНИЕ ИЗ КОРЗИНЫ С АНИМАЦИЕЙ
    $(document).on('click', '.btn-delete', function() {
        const $item = $(this).closest('li');
        $item.slideUp(300, function() {
            $(this).remove(); // Удаляем из DOM после завершения анимации
        });

        totalCartItems--;
        $('#cart-count').text(totalCartItems);
    });

    // 6. JQUERY UI SORTABLE (Drag & Drop перетаскивание элементов корзины!)
    $('#cart-list').sortable({
        axis: 'y', // Перетаскивание только по вертикали
        opacity: 0.7,
        placeholder: "ui-state-highlight"
    });

    // 7. КAЛЬКУЛЯТОР НА JQUERY
    $('#calc-btn').on('click', function() {
        const length = parseFloat($('#room-length').val());
        const width = parseFloat($('#room-width').val());
        const price = parseFloat($('#price-per-m2').val());

        if (length > 0 && width > 0 && price > 0) {
            const totalArea = (length * width) * 1.1;
            const totalPrice = totalArea * price;

            $('#result')
                .hide()
                .html(`Необходимо ламината (+10%): <b>${totalArea.toFixed(1)} кв.м.</b><br>Итоговая стоимость: <b>${Math.round(totalPrice)} руб.</b>`)
                .fadeIn(500); // Плавный вывод результата
        } else {
            $('#result').hide().text('Пожалуйста, заполните все поля!').fadeIn(300);
        }
    });

    $('#calc-btn').click(function() {
    // Этот код выполнится только при клике на кнопку
    alert('Кнопка нажата!');
    });     

});