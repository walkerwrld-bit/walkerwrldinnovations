// Constants for material rates, spacing, and costs
const RAZOR_WIRE_UNIT_LENGTH = 7;     // meters per unit
const RAZOR_WIRE_COST = 300;          // K per unit
const TYING_WIRE_UNIT_LENGTH = 20;    // meters per kg
const TYING_WIRE_COST = 50;           // K per kg
const SAND_UNIT_LENGTH = 30;          // meters per wheelbarrow
const SAND_COST = 50;                 // K per wheelbarrow
const Y_BAR_SPACING = 2;              // meters apart
const Y_BAR_COST = 30;                // K per unit
const CEMENT_UNIT_LENGTH = 200;       // meters per pocket
const CEMENT_COST = 170;              // K per pocket
const LABOUR_COST_PER_METER = 20;     // K per meter
const TRANSPORT_COST = 200;           // Fixed Transport Fee (K)

function calculateQuote() {
    // 1. Get the perimeter value from the input field
    const perimeterInput = document.getElementById('perimeter');
    const perimeter = parseFloat(perimeterInput.value);
    const resultsDiv = document.getElementById('results');

    // Basic input validation
    if (isNaN(perimeter) || perimeter <= 0) {
        resultsDiv.innerHTML = '<p class="error">⚠️ Please enter a valid plot perimeter in meters.</p>';
        return;
    }

    // --- 2. Calculate Required Units (Always round up using Math.ceil) ---

    // Razor Wire
    const razorWireUnits = Math.ceil(perimeter / RAZOR_WIRE_UNIT_LENGTH);
    const razorWireTotalCost = razorWireUnits * RAZOR_WIRE_COST;

    // Tying Wire
    const tyingWireUnits = Math.ceil(perimeter / TYING_WIRE_UNIT_LENGTH);
    const tyingWireTotalCost = tyingWireUnits * TYING_WIRE_COST;

    // Quarry Sand
    const sandUnits = Math.ceil(perimeter / SAND_UNIT_LENGTH);
    const sandTotalCost = sandUnits * SAND_COST;

    // Y-Bar (Posts): Add 1 for the starting/ending post
    const yBarUnits = Math.ceil(perimeter / Y_BAR_SPACING) + 1;
    const yBarTotalCost = yBarUnits * Y_BAR_COST;

    // Cement
    const cementUnits = Math.ceil(perimeter / CEMENT_UNIT_LENGTH);
    const cementTotalCost = cementUnits * CEMENT_COST;

    // --- 3. Calculate Final Costs ---

    // Total Material Cost
    const totalMaterialCost = razorWireTotalCost + tyingWireTotalCost + sandTotalCost + yBarTotalCost + cementTotalCost;

    // Labour Cost
    const labourTotalCost = perimeter * LABOUR_COST_PER_METER;

    // Grand Total (Materials + Labour + Transport)
    const grandTotalCost = totalMaterialCost + labourTotalCost + TRANSPORT_COST;

    // --- 4. Generate HTML Output for Display ---
    resultsDiv.innerHTML = `
        <h3>Quotation for ${perimeter}m Perimeter</h3>

        <p><strong>Perimeter:</strong> <span class="cost-detail">${perimeter} meters</span></p>

        <p>
            <strong>Razor Wire:</strong> ${razorWireUnits} units
            <span class="cost-detail">K${razorWireTotalCost.toFixed(2)}</span>
        </p>

        <p>
            <strong>Tying Wire:</strong> ${tyingWireUnits} kg
            <span class="cost-detail">K${tyingWireTotalCost.toFixed(2)}</span>
        </p>

        <p>
            <strong>Quarry Sand:</strong> ${sandUnits} wheelbarrow(s)
            <span class="cost-detail">K${sandTotalCost.toFixed(2)}</span>
        </p>

        <p>
            <strong>Y-Bar (Steel):</strong> ${yBarUnits} units
            <span class="cost-detail">K${yBarTotalCost.toFixed(2)}</span>
        </p>

        <p>
            <strong>Cement:</strong> ${cementUnits} pocket(s)
            <span class="cost-detail">K${cementTotalCost.toFixed(2)}</span>
        </p>

        <div class="total-material-cost">
            TOTAL MATERIALS COST: <span class="cost-detail">K${totalMaterialCost.toFixed(2)}</span>
        </div>

        <div class="total-labour-cost">
            LABOUR COST (${perimeter}m @ K${LABOUR_COST_PER_METER}/m): <span class="cost-detail">K${labourTotalCost.toFixed(2)}</span>
        </div>

        <div class="transport-cost">
            TRANSPORT FEE: <span class="cost-detail">K${TRANSPORT_COST.toFixed(2)}</span>
        </div>
        <p><small class="transport-note">*Transport fee may change depending on location.</small></p>

        <div class="grand-total-cost">
            GRAND TOTAL ESTIMATE: <span class="cost-detail">K${grandTotalCost.toFixed(2)}</span>
        </div>
        <p><small>*This is an estimated quotation. Actual costs may vary.</small></p>
    `;
}
