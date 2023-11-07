const dollarsInput = document.getElementById('dollars-input');
const kwhInput = document.getElementById('kwh-input');
const calculateButton = document.getElementById('calculate-button');
const resultDiv = document.getElementById('result');
const emissionsResult = document.getElementById('emissions-result');

document.querySelectorAll('input[name="input-type"]').forEach((input) => {
    input.addEventListener('change', (event) => {
        if (event.target.value === 'dollars') {
            dollarsInput.style.display = 'block';
            kwhInput.style.display = 'none';
        } else if (event.target.value === 'kwh') {
            dollarsInput.style.display = 'none';
            kwhInput.style.display = 'block';
        }
    });
});

calculateButton.addEventListener('click', () => {
    const inputType = document.querySelector('input[name="input-type"]:checked');
    let emissions = 0;

    if (inputType && inputType.value === 'dollars') {
        const electricBill = parseFloat(document.getElementById('electric-bill').value);
        const pricePerKwh = parseFloat(document.getElementById('price-per-kwh').value);
        const electricityEmissionFactor = 0.4; // Replace with the actual factor
        const monthsInYear = 12;

        if (!isNaN(electricBill) && !isNaN(pricePerKwh)) {
            emissions = (electricBill / pricePerKwh) * electricityEmissionFactor * monthsInYear;
        }
    } else if (inputType && inputType.value === 'kwh') {
        const kwhConsumed = parseFloat(document.getElementById('kwh-consumed').value);
        const electricityEmissionFactor = 0.4; // Replace with the actual factor
        const monthsInYear = 12;

        if (!isNaN(kwhConsumed)) {
            emissions = kwhConsumed * electricityEmissionFactor * monthsInYear;
        }
    }

    resultDiv.style.display = 'block';
    emissionsResult.textContent = `${emissions.toFixed(2)} kg CO2 equivalent emitted per year`;
});

document.getElementById("transportation-button").addEventListener("click", function() {
    window.location.href = "transportation.html";
});

document.getElementById("natural-gas-button").addEventListener("click", function() {
    // Redirect to the naturalgas.html file
    window.location.href = "natural_gas.html";
});

document.getElementById("waste-button").addEventListener("click", function() {
    // Redirect to the naturalgas.html file
    window.location.href = "waste.html";
});

