/**
 * =====================================================
 * Student Name    : Prince Ram Roydlikent F. Igna
 * Course          : BSCSIT 1203 Programming 2
 * Assignment      : Programming Labwork 1 (Full Solution)
 * School          : University of Perpetual Help System DALTA
 * =====================================================
 */

const matrix = [
    [3, 5, 2],
    [1, 4, 3],
    [2, 1, 5]
];

const processMatrix = (m, factor) => {
    console.log("========================================================");
    console.log("   FULL STEP-BY-STEP 3x3 DETERMINANT SOLUTION");
    console.log("   Student: Prince Ram Roydlikent F. Igna");
    console.log("========================================================");

    //  Scale matrix 
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            m[i][j] *= factor;
        }
    }

    console.log(`\n[ WORKING MATRIX (Scaled by ${factor}) ]`);
    m.forEach(row => {
        console.log(
            "      | " +
            row.map(num => String(num).padStart(3, " ")).join(" ") +
            " |"
        );
    });

    console.log("\n--------------------------------------------------------");
    console.log("STEP 1: BREAK DOWN INTO 2x2 MINORS (COFACTOR EXPANSION)");
    console.log("--------------------------------------------------------");

    // MINOR M11
    let m11_a = m[1][1], m11_b = m[1][2], m11_c = m[2][1], m11_d = m[2][2];
    let m11_val = (m11_a * m11_d) - (m11_b * m11_c);

    console.log(`1. For a11 (${m[0][0]}):`);
    console.log(`   Minor M11 = | ${m11_a}  ${m11_b} | = (${m11_a} * ${m11_d}) - (${m11_b} * ${m11_c})`);
    console.log(`               | ${m11_c}  ${m11_d} | = ${(m11_a * m11_d)} - ${(m11_b * m11_c)} = ${m11_val}\n`);

    // MINOR M12
    let m12_a = m[1][0], m12_b = m[1][2], m12_c = m[2][0], m12_d = m[2][2];
    let m12_val = (m12_a * m12_d) - (m12_b * m12_c);

    console.log(`2. For a12 (${m[0][1]}):`);
    console.log(`   Minor M12 = | ${m12_a}  ${m12_b} | = (${m12_a} * ${m12_d}) - (${m12_b} * ${m12_c})`);
    console.log(`               | ${m12_c}  ${m12_d} | = ${(m12_a * m12_d)} - ${(m12_b * m12_c)} = ${m12_val}\n`);

    // MINOR M13
    let m13_a = m[1][0], m13_b = m[1][1], m13_c = m[2][0], m13_d = m[2][1];
    let m13_val = (m13_a * m13_d) - (m13_b * m13_c);

    console.log(`3. For a13 (${m[0][2]}):`);
    console.log(`   Minor M13 = | ${m13_a}  ${m13_b} | = (${m13_a} * ${m13_d}) - (${m13_b} * ${m13_c})`);
    console.log(`               | ${m13_c}  ${m13_d} | = ${(m13_a * m13_d)} - ${(m13_b * m13_c)} = ${m13_val}\n`);

    console.log("--------------------------------------------------------");
    console.log("STEP 2: COMBINE USING THE DETERMINANT FORMULA");
    console.log("Formula: Det = a11(M11) - a12(M12) + a13(M13)");
    console.log("--------------------------------------------------------");

    let term1 = m[0][0] * m11_val;
    let term2 = m[0][1] * m12_val;
    let term3 = m[0][2] * m13_val;
    let finalDet = term1 - term2 + term3;

    console.log(`Det = ${m[0][0]}(${m11_val}) - ${m[0][1]}(${m12_val}) + ${m[0][2]}(${m13_val})`);
    console.log(`Det = ${term1} - ${term2} + ${term3}`);

    console.log("\n========================================================");
    console.log(`   ✓  FINAL DETERMINANT RESULT = ${finalDet}`);
    console.log("========================================================");
};

// Run
processMatrix(matrix, 2);