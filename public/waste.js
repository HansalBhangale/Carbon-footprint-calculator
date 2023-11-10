function calculateFootprint() {
      // Get user inputs
      const organicWaste = parseFloat(document.getElementById('organicWaste').value) || 0;
      const recycling = parseFloat(document.getElementById('recycling').value) || 0;
      const garbageBags = parseFloat(document.getElementById('garbageBags').value) || 0;
      const foodWastePercent = parseFloat(document.getElementById('foodWastePercent').value) || 0;
      const recyclingHabits = document.getElementById('recyclingHabits').value;

      // Define emission factors (example values)
      const organicWasteEmissionFactor = 0.3; // kg CO2e/kg
      const recyclingEmissionFactor = 0.1; // kg CO2e/kg
      const garbageBagsEmissionFactor = 2.5; // kg CO2e/bag (example value, adjust as needed)

      // Calculate waste-related carbon footprint
      const organicWasteFootprint = organicWaste * organicWasteEmissionFactor;
      const recyclingFootprint = recycling * recyclingEmissionFactor;
      const garbageBagsFootprint = garbageBags * garbageBagsEmissionFactor;

      // Adjust garbage bags footprint based on food waste percentage
      const adjustedGarbageBagsFootprint = garbageBagsFootprint * (foodWastePercent / 100);

      // Adjust footprint based on recycling habits
      let totalFootprint = organicWasteFootprint + recyclingFootprint + adjustedGarbageBagsFootprint;

      if (recyclingHabits === 'some') {
        // Reduce footprint for some recycling habits
        totalFootprint *= 0.8;
      } else if (recyclingHabits === 'active') {
        // Further reduce footprint for active recycling habits
        totalFootprint *= 0.6;
      }

      // Display the result
      document.getElementById('result').textContent = totalFootprint.toFixed(2);
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
