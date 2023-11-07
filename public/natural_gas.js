document.addEventListener('DOMContentLoaded', function () {
    const inputTypeRadios = document.querySelectorAll('input[name="input-type"]');
    const dollarsInput = document.getElementById('dollars-input');
    const thousandCubicFeetInput = document.getElementById('thousand-cubic-feet-input');
    const thermsInput = document.getElementById('therms-input');
    const calculateButton = document.getElementById('calculate-button');
    const resultDiv = document.getElementById('result');
    const emissionsResult = document.getElementById('emissions-result');

    // Function to show/hide input sections based on selected input type
    function toggleInputSections() {
        dollarsInput.style.display = 'none';
        thousandCubicFeetInput.style.display = 'none';
        thermsInput.style.display = 'none';

        const selectedInputType = document.querySelector('input[name="input-type"]:checked');
        if (selectedInputType) {
            if (selectedInputType.value === 'dollars') {
                dollarsInput.style.display = 'block';
                thousandCubicFeetInput.style.display = 'none'; // Hide this section
                thermsInput.style.display = 'none'; // Hide this section
            } else if (selectedInputType.value === 'thousand-cubic-feet') {
                dollarsInput.style.display = 'none'; // Hide this section
                thousandCubicFeetInput.style.display = 'block';
                thermsInput.style.display = 'none'; // Hide this section
            } else if (selectedInputType.value === 'therms') {
                dollarsInput.style.display = 'none'; // Hide this section
                thousandCubicFeetInput.style.display = 'none'; // Hide this section
                thermsInput.style.display = 'block';
            }
        }
    }

    // Event listener to toggle input sections when input type changes
    inputTypeRadios.forEach((radio) => {
        radio.addEventListener('change', toggleInputSections);
    });

    // Event listener to calculate emissions when the button is clicked
    calculateButton.addEventListener('click', () => {
        const inputType = document.querySelector('input[name="input-type"]:checked');
        let emissions = 0;

        if (inputType) {
            if (inputType.value === 'dollars') {
                const gasBillDollars = parseFloat(document.querySelector('input[name="gas-bill-dollars"]').value);
                const pricePerThousandCubicFeet = parseFloat(document.querySelector('input[name="price-per-thousand-cubic-feet"]').value);
                const poundsOfCO2PerThousandCubicFeet = 117; // Replace with the actual value
                const monthsInYear = 12;

                if (!isNaN(gasBillDollars) && !isNaN(pricePerThousandCubicFeet)) {
                    emissions = (gasBillDollars / pricePerThousandCubicFeet) * poundsOfCO2PerThousandCubicFeet * monthsInYear;
                }
            } else if (inputType.value === 'thousand-cubic-feet') {
                const cubicFeetConsumed = parseFloat(document.querySelector('input[name="cubic-feet-consumed"]').value);
                const poundsOfCO2PerThousandCubicFeet = 117; // Replace with the actual value
                const monthsInYear = 12;

                if (!isNaN(cubicFeetConsumed)) {
                    emissions = cubicFeetConsumed * poundsOfCO2PerThousandCubicFeet * monthsInYear;
                }
            } else if (inputType.value === 'therms') {
                const thermsConsumed = parseFloat(document.querySelector('input[name="therms-consumed"]').value);
                const poundsOfCO2PerTherm = 11.7; // Replace with the actual value
                const monthsInYear = 12;

                if (!isNaN(thermsConsumed)) {
                    emissions = (thermsConsumed / poundsOfCO2PerTherm) * monthsInYear;
                }
            }

            // Display the calculated emissions
            resultDiv.style.display = 'block';
            emissionsResult.textContent = `${emissions.toFixed(2)} pounds of CO2 equivalent emitted per year`;
        }
    });

    // Initialize the input sections based on the selected input type
    toggleInputSections();
});

document.getElementById("transportation").addEventListener("click", function() {
    window.location.href = "transportation.html"
});

document.getElementById("electricity").addEventListener("click", function() {
    // Redirect to the naturalgas.html file
    window.location.href = "electricity.html";
});
document.getElementById("waste").addEventListener("click", function() {
    // Redirect to the naturalgas.html file
    window.location.href = "waste.html";
});
