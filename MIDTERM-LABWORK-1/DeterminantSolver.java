/**
 * =====================================================
 * Student Name    : Prince Ram Roydlikent F. Igna
 * Course          : BSCSIT 1203 Programming 2
 * Assignment      : Programming Labwork 1
 * School          : University of Perpetual Help System DALTA, Molino Campus
 * =====================================================
 */

public class DeterminantSolver {

    public static void main(String[] args) {
        int[][] matrix = {
            {3, 5, 2},
            {1, 4, 3},
            {2, 1, 5}
        };

        // We will scale the matrix by 2 first to make it a "new" problem
        int scaleFactor = 2;
        processMatrix(matrix, scaleFactor);
    }

    public static void processMatrix(int[][] m, int factor) {
        System.out.println("===================================================");
        System.out.println("  ENHANCED 3x3 MATRIX SOLVER");
        System.out.println("  Student: Prince Ram Roydlikent F. Igna");
        System.out.println("  Status: Scaling Matrix by factor of " + factor);
        System.out.println("===================================================");

        // Professional Step: Scaling the matrix using nested loops
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                m[i][j] *= factor;
            }
        }

        // Display the new Scaled Matrix
        for (int[] row : m) {
            System.out.printf("  |  %d   %d   %d  |%n", row[0], row[1], row[2]);
        }
        
        System.out.println("===================================================");
        
        // Determinant Logic
        int m11 = (m[1][1] * m[2][2]) - (m[1][2] * m[2][1]);
        int m12 = (m[1][0] * m[2][2]) - (m[1][2] * m[2][0]);
        int m13 = (m[1][0] * m[2][1]) - (m[1][1] * m[2][0]);

        System.out.println("\n[ DET CALCULATION STEPS ]");
        System.out.println("  M11 Step: " + m11);
        System.out.println("  M12 Step: " + m12);
        System.out.println("  M13 Step: " + m13);

        int det = (m[0][0] * m11) - (m[0][1] * m12) + (m[0][2] * m13);

        System.out.println("\n===================================================");
        System.out.println("  ✓  FINAL DETERMINANT = " + det);
        System.out.println("===================================================");
    }
}