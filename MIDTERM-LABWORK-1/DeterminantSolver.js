/**
 * =====================================================
 * Student Name    : Prince Ram Roydlikent F. Igna
 * Course          : BSCSIT 1203 Programming 2
 * Assignment      : Programming Labwork 1 
 * School          : University of Perpetual Help System DALTA, Molino Campus
 * =====================================================
 */

const matrix = [
    [3, 5, 2],
    [1, 4, 3],
    [2, 1, 5]
];

/**
 * Unique Function: Multiplies matrix by a scalar and finds Det
 */
const advancedMatrixProcess = (data, scalar) => {
    console.log("===================================================");
    console.log("  JS MATRIX PROCESSOR & SOLVER");
    console.log("  Student: Prince Ram Roydlikent F. Igna");
    console.log(`  Action: Multiplying Matrix by ${scalar}`);
    console.log("===================================================");

    // Using .map() - a very professional JS way to transform arrays
    const scaled = data.map(row => row.map(val => val * scalar));

    // Show the updated matrix
    scaled.forEach(row => console.log(`  |  ${row[0]}   ${row[1]}   ${row[2]}  |`));

    // Math logic for 3x3 Determinant
    const [row1, row2, row3] = scaled;
    
    const partA = row1[0] * ((row2[1] * row3[2]) - (row2[2] * row3[1]));
    const partB = row1[1] * ((row2[0] * row3[2]) - (row2[2] * row3[0]));
    const partC = row1[2] * ((row2[0] * row3[1]) - (row2[1] * row3[0]));

    const determinant = partA - partB + partC;

    console.log("\n---------------------------------------------------");
    console.log(`  Expansion Term 1: ${partA}`);
    console.log(`  Expansion Term 2: ${partB}`);
    console.log(`  Expansion Term 3: ${partC}`);
    console.log("---------------------------------------------------");
    console.log(`  ✓  FINAL DETERMINANT = ${determinant}`);
    console.log("===================================================");
};

// Run with a scalar of 2
advancedMatrixProcess(matrix, 2);