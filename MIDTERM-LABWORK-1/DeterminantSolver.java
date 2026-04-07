/**
 * =====================================================
 * Student Name    : Prince Ram Roydlikent F. Igna
 * Course          : BSCSIT 1203 Programming 2
 * Assignment      : Programming Labwork 1 (Full Solution)
 * School          : University of Perpetual Help System DALTA
 * =====================================================
 */

public class DeterminantSolver {

    public static void main(String[] args) {
        // Original Matrix
        int[][] matrix = {
            {3, 5, 2},
            {1, 4, 3},
            {2, 1, 5}
        };

        int scaleFactor = 2;
        processMatrix(matrix, scaleFactor);
    }

    public static void processMatrix(int[][] m, int factor) {
        System.out.println("========================================================");
        System.out.println("   FULL STEP-BY-STEP 3x3 DETERMINANT SOLUTION");
        System.out.println("   Student: Prince Ram Roydlikent F. Igna");
        System.out.println("========================================================");

        // Scaling logic
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                m[i][j] *= factor;
            }
        }

        System.out.println("\n[ WORKING MATRIX (Scaled by " + factor + ") ]");
        for (int[] row : m) {
            System.out.printf("      |  %d   %d   %d  |%n", row[0], row[1], row[2]);
        }
        
        System.out.println("\n--------------------------------------------------------");
        System.out.println("STEP 1: BREAK DOWN INTO 2x2 MINORS (COFACTOR EXPANSION)");
        System.out.println("--------------------------------------------------------");

        // MINOR M11
        int m11_a = m[1][1], m11_b = m[1][2], m11_c = m[2][1], m11_d = m[2][2];
        int m11_val = (m11_a * m11_d) - (m11_b * m11_c);
        System.out.printf("1. For a11 (%d):%n", m[0][0]);
        System.out.printf("   Minor M11 = | %d  %d | = (%d * %d) - (%d * %d)%n", m11_a, m11_b, m11_a, m11_d, m11_b, m11_c);
        System.out.printf("               | %d  %d | = %d - %d = %d%n%n", m11_c, m11_d, (m11_a * m11_d), (m11_b * m11_c), m11_val);

        // MINOR M12
        int m12_a = m[1][0], m12_b = m[1][2], m12_c = m[2][0], m12_d = m[2][2];
        int m12_val = (m12_a * m12_d) - (m12_b * m12_c);
        System.out.printf("2. For a12 (%d):%n", m[0][1]);
        System.out.printf("   Minor M12 = | %d  %d | = (%d * %d) - (%d * %d)%n", m12_a, m12_b, m12_a, m12_d, m12_b, m12_c);
        System.out.printf("               | %d  %d | = %d - %d = %d%n%n", m12_c, m12_d, (m12_a * m12_d), (m12_b * m12_c), m12_val);

        // MINOR M13
        int m13_a = m[1][0], m13_b = m[1][1], m13_c = m[2][0], m13_d = m[2][1];
        int m13_val = (m13_a * m13_d) - (m13_b * m13_c);
        System.out.printf("3. For a13 (%d):%n", m[0][2]);
        System.out.printf("   Minor M13 = | %d  %d | = (%d * %d) - (%d * %d)%n", m13_a, m13_b, m13_a, m13_d, m13_b, m13_c);
        System.out.printf("               | %d  %d | = %d - %d = %d%n%n", m13_c, m13_d, (m13_a * m13_d), (m13_b * m13_c), m13_val);

        System.out.println("--------------------------------------------------------");
        System.out.println("STEP 2: COMBINE USING THE DETERMINANT FORMULA");
        System.out.println("Formula: Det = a11(M11) - a12(M12) + a13(M13)");
        System.out.println("--------------------------------------------------------");

        int term1 = m[0][0] * m11_val;
        int term2 = m[0][1] * m12_val;
        int term3 = m[0][2] * m13_val;
        int finalDet = term1 - term2 + term3;

        System.out.printf("Det = %d(%d) - %d(%d) + %d(%d)%n", m[0][0], m11_val, m[0][1], m12_val, m[0][2], m13_val);
        System.out.printf("Det = %d - %d + %d%n", term1, term2, term3);

        System.out.println("\n========================================================");
        System.out.println("   ✓  FINAL DETERMINANT RESULT = " + finalDet);
        System.out.println("========================================================");
    }
}