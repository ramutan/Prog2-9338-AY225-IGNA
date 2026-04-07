/**
 * ============================================================================
 * Student Name    : Prince Ram Roydlikent F. Igna
 * Course          : BSCSIT 1203 Programming 2
 * School          : University of Perpetual Help System DALTA
 * ============================================================================
 */

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

public class CSVProcessor {

    static class UserRecord {
        String name, role, pLang, cLang, date, score, result, time;

        public UserRecord(String[] data) {
            /** * MAPPING BASED ON CSV STRUCTURE:
             * Col 0: Name | Col 1: Role | Col 3: Programming Language
             * Col 4: Course Language | Col 5: Exam Date | Col 6: Score
             * Col 7: Result | Col 8: Time Used
             */
            this.name   = getSafe(data, 0, "Unknown");
            this.role   = getSafe(data, 1, "Student"); 
            this.pLang  = getSafe(data, 3, "N/A");      
            this.cLang  = getSafe(data, 4, "English");  
            this.date   = getSafe(data, 5, "03/14/2026");
            this.score  = getSafe(data, 6, "000");
            this.result = getSafe(data, 7, "FAIL");
            this.time   = formatTime(getSafe(data, 8, "00:00"));
        }

        private String getSafe(String[] arr, int index, String def) {
            return (index < arr.length && !arr[index].isEmpty()) ? arr[index].trim() : def;
        }

        private String formatTime(String raw) {
            // Standardizes time to numeric format
            return raw.replaceAll("(?i)\\s*min\\s*", ":").replaceAll("(?i)\\s*sec\\s*", "").trim();
        }

        @Override
        public String toString() {
            // Column widths set to prevent cutting
            return String.format("| %-18.18s | %-8.8s | %-50.50s | %-10.10s | %-12.12s | %-6.6s | %-7.7s | %-8.8s |", 
                                 name, role, pLang, cLang, date, score, result, time);
        }
    }

    public static void main(String[] args) {
        List<UserRecord> allRecords = new ArrayList<>();
        String path = "MIDTERM-LABWORK-2/Sample_Data-Prog-2-.csv"; 

        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String line;
            int count = 0;
            while ((line = br.readLine()) != null) {
                count++;
                // Skip the 7 University header lines
                if (count <= 7 || line.trim().isEmpty()) continue; 
                
                String[] cols = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
                for (int i = 0; i < cols.length; i++) cols[i] = cols[i].replace("\"", "").trim();
                allRecords.add(new UserRecord(cols));
            }

            System.out.println("============================================================================");
            System.out.println("   CSV PROCESSOR - MP06, MP09, AND MP15 by Prince Ram Roydlikent F. Igna");
            System.out.println("============================================================================");

            // --- MP09: DATASET ANALYTICS ---
            System.out.println("\n---- MP09: TOTAL RECORDS ----");
            System.out.println("Total Records: " + allRecords.size());

            // --- MP06: UNIQUE LANGUAGES ---
            System.out.println("\n==== MP06: UNIQUE LANGUAGES IDENTIFIED ====");
            Set<String> langs = allRecords.stream().map(r -> r.pLang).collect(Collectors.toCollection(TreeSet::new));
            System.out.println("Detected: " + String.join(" | ", langs));

            // --- MP15: GRID VIEW (TOP 50) ---
            printGrid(allRecords, 50);

            // Export logic
            exportData(allRecords, 50, "MP15_Final_50_Rows.csv");

        } catch (IOException e) {
            System.err.println("Error: File not found.");
        }
    }

    private static void printGrid(List<UserRecord> records, int limit) {
        // Adjusted HR to match the column widths
        String hr = "+--------------------+----------+----------------------------------------------------+------------+--------------+--------+---------+----------+";
        System.out.println("\n==== MP15: DATASET GRID VIEW (TOP " + limit + ") ====");
        System.out.println(hr);
        System.out.printf("| %-18s | %-8s | %-50s | %-10s | %-12s | %-6s | %-7s | %-8s |\n", 
                          "FULL NAME", "ROLE", "PROGRAMMING LANGUAGE", "LANGUAGE", "DATE", "SCORE", "RESULT", "TIME");
        System.out.println(hr);
        
        records.stream().limit(limit).forEach(System.out::println);
        
        System.out.println(hr);
        System.out.println(" DISPLAYED: " + Math.min(limit, records.size()) + " RECORDS");
    }

    private static void exportData(List<UserRecord> records, int limit, String fileName) {
        try (PrintWriter pw = new PrintWriter(new File(fileName))) {
            pw.println("FullName,Role,ProgrammingLanguage,Language,Date,Score,Result,Time"); 
            records.stream().limit(limit).forEach(r -> {
                pw.printf("%s,%s,%s,%s,%s,%s,%s,%s\n", r.name, r.role, r.pLang, r.cLang, r.date, r.score, r.result, r.time);
            });
            System.out.println("\n[MP15] SUCCESS: " + fileName);
        } catch (Exception e) {
            System.out.println("Export failed.");
        }
    }
}