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