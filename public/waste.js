
function calculateFootprint() {
    // Get user inputs
    const organicWaste = parseFloat(document.getElementById('organicWaste').value);
    const recycling = parseFloat(document.getElementById('recycling').value);
    const disposableProducts = parseFloat(document.getElementById('disposableProducts').value);

    // Define emission factors (example values)
    const organicWasteEmissionFactor = 0.3;  // kg CO2e/kg
    const recyclingEmissionFactor = 0.1;      // kg CO2e/kg
    const disposableProductsEmissionFactor = 0.2; // kg CO2e/kg

    // Calculate waste-related carbon footprint
    const wasteFootprint = (organicWaste * organicWasteEmissionFactor) +
                           (recycling * recyclingEmissionFactor) +
                           (disposableProducts * disposableProductsEmissionFactor);

    // Display the result
    document.getElementById('result').textContent = wasteFootprint.toFixed(2);
}

document.getElementById("transportation").addEventListener("click", function() {
    window.location.href = "transportation.html"
});

document.getElementById("electricity").addEventListener("click", function() {
    // Redirect to the naturalgas.html file
    window.location.href = "electricity.html";
});
document.getElementById("natural_gas").addEventListener("click", function() {
    // Redirect to the naturalgas.html file
    window.location.href = "natural_gas.html";
});