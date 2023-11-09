
let numberOfVehicles = 0;
let transportationEmissionValues = [];

document.getElementById('add-vehicle-button').addEventListener('click', function () {
    numberOfVehicles++;
    const vehicleDiv = document.createElement('div');
    vehicleDiv.className = 'vehicle';
    vehicleDiv.innerHTML = `
        <h2>Vehicle #${numberOfVehicles}</h2>
        <div class="question">
            <p>3. Is the mileage information for Vehicle #${numberOfVehicles} in miles per week or miles per year? (Week/Year)</p>
            <label>
                <input type="radio" name="mileage-${numberOfVehicles}" value="week"> Week
            </label>
            <label>
                <input type="radio" name="mileage-${numberOfVehicles}" value="year"> Year
            </label>
        </div>
        <div class="question" id="miles-week-${numberOfVehicles}" style="display: none;">
            <p>4a. Enter the miles driven per week for Vehicle #${numberOfVehicles}:</p>
            <input type="number" name="miles-week-${numberOfVehicles}" step="any">
        </div>
        <div class="question" id="miles-year-${numberOfVehicles}" style="display: none;">
            <p>4b. Enter the miles driven per year for Vehicle #${numberOfVehicles}:</p>
            <input type="number" name="miles-year-${numberOfVehicles}" step="any">
        </div>
        <div class="question">
            <p>5. Enter the fuel efficiency (miles per gallon) for Vehicle #${numberOfVehicles}:</p>
            <input type="number" name="fuel-efficiency-${numberOfVehicles}" step="any">
        </div>
    `;
    document.getElementById('vehicles-container').appendChild(vehicleDiv);

    if (numberOfVehicles > 0) {
        document.getElementById('calculate-button').style.display = 'block';
    }

    const mileageRadios = document.querySelectorAll(`input[name="mileage-${numberOfVehicles}"]`);
    mileageRadios.forEach(radio => {
        radio.addEventListener('change', () => showMileageInput(numberOfVehicles));
    });
});

document.getElementById('remove-vehicle-button').addEventListener('click', function () {
    if (numberOfVehicles > 0) {
        const lastVehicle = document.querySelector('.vehicle:last-child');
        lastVehicle.parentNode.removeChild(lastVehicle);
        numberOfVehicles--;

        if (numberOfVehicles === 0) {
            document.getElementById('calculate-button').style.display = 'none';
        }
    }
});

document.getElementById('calculate-button').addEventListener('click', function () {
    let totalEmissions = 0;

    for (let i = 1; i <= numberOfVehicles; i++) {
        const mileageType = document.querySelector(`input[name="mileage-${i}"]:checked`);
        const milesInput = document.querySelector(`input[name="miles-${mileageType.value}-${i}"]`);
        const fuelEfficiencyInput = document.querySelector(`input[name="fuel-efficiency-${i}"]`);
        const CO2EmittedPerGallon = 20; // Replace with the actual CO2 emitted per gallon value
        const emissionsOfGreenhouseGases = 1; // Replace with the actual emissions of other greenhouse gases value

        if (mileageType && milesInput && fuelEfficiencyInput) {
            const miles = parseFloat(milesInput.value);
            const fuelEfficiency = parseFloat(fuelEfficiencyInput.value);

            let emissions = 0;

            if (mileageType.value === 'week') {
                emissions = (miles * 52) / (fuelEfficiency * CO2EmittedPerGallon * emissionsOfGreenhouseGases);
            } else if (mileageType.value === 'year') {
                emissions = (miles) / (fuelEfficiency * CO2EmittedPerGallon * emissionsOfGreenhouseGases);
            }

            totalEmissions += emissions;
        }
    }
    transportationEmissionValues.push(totalEmissions);

    fetch('/store-emission-values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emission_value: totalEmissions }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.message); // This will log the server response message
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    document.querySelector('input[name="total-co2-emissions"]').value = totalEmissions.toFixed(2);
});

function showMileageInput(vehicleNumber) {
    const mileageType = document.querySelector(`input[name="mileage-${vehicleNumber}"]:checked`).value;
    if (mileageType === 'week') {
        document.getElementById(`miles-week-${vehicleNumber}`).style.display = 'block';
        document.getElementById(`miles-year-${vehicleNumber}`).style.display = 'none';
    } else if (mileageType === 'year') {
        document.getElementById(`miles-year-${vehicleNumber}`).style.display = 'block';
        document.getElementById(`miles-week-${vehicleNumber}`).style.display = 'none';
    }
}

document.getElementById("electricity-button").addEventListener("click", function() {
    // Redirect to the electricity.html file
    window.location.href = "electricity.html";
});

document.getElementById("natural-gas-button").addEventListener("click", function() {
    // Redirect to the naturalgas.html file
    window.location.href = "natural_gas.html";
});

document.getElementById("pie-chart").addEventListener("click", function() {
    // Redirect to the HTML page where you want to display the pie chart
    window.location.href = `pie_chart.html?totalEmission=${JSON.stringify(transportationEmissionValues)}`;
});

document.getElementById("waste-button").addEventListener("click", function() {
    // Redirect to the naturalgas.html file
    window.location.href = "waste.html";
});
