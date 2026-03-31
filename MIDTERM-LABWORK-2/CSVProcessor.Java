/**
 * =====================================================
 * Student Name    : Prince Ram Roydlikent F. Igna
 * Course          : BSCSIT 1203 Programming 2
 * Assignment      : Midterm Lab Work 2 (CSV Processor)
 * School          : University of Perpetual Help System DALTA
 * =====================================================
 */

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

public class CSVProcessor {

    // A simple class to hold the data properly
    static class UserRecord {
        String firstName, lastName, role, col3, col4, col5, score, language, result, time;

        public UserRecord(String[] data) {
            // Fix Name splitting if it's "Last, First" in one column
            if (data[0].contains(",")) {
                String[] nameParts = data[0].split(",");
                this.firstName = nameParts[0].trim();
                this.lastName = (nameParts.length > 1) ? nameParts[1].trim() : "";
            } else {
                this.firstName = data[0];
                this.lastName = (data.length > 1) ? data[1] : "";
            }
            
            this.role = (data.length > 2 && !data[2].isEmpty()) ? data[2] : "Student";
            this.col3 = (data.length > 3) ? data[3] : "";
            this.col4 = (data.length > 4) ? data[4] : "";
            this.col5 = (data.length > 5) ? data[5] : "";
            this.score = (data.length > 6) ? data[6] : "-";
            this.language = (data.length > 7) ? data[7] : "-";
            this.result = (data.length > 8) ? data[8] : "-";
            this.time = (data.length > 9) ? data[9] : "-";
        }

        public boolean containsKeyword(String key) {
            String fullRow = (firstName + lastName + role + score + language + result).toLowerCase();
            return fullRow.contains(key.toLowerCase());
        }

        @Override
        public String toString() {
            String fullName = String.format("%-25s", firstName + ", " + lastName);
            String scoreResult = String.format("%-12s", score + " (" + result + ")");
            return String.format("[ %s | %-10s | %-10s | %-10s | %s | %-8s ]", 
                                fullName, role, col3, language, scoreResult, time);
        }
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        List<UserRecord> allRecords = new ArrayList<>();

        // Default Path
        String defaultPath = "Sample_Data-Prog-2-.csv";
        
        System.out.print("Enter CSV path (Leave blank for default): ");
        String path = input.nextLine();
        if (path.isEmpty()) path = defaultPath;

        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            // Skip the header line
            String line = reader.readLine(); 
            
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                
                // Parse CSV logic
                String[] rawCells = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
                for (int i = 0; i < rawCells.length; i++) {
                    rawCells[i] = rawCells[i].replace("\"", "").trim();
                }

                // Only add if it looks like a valid data row (contains Pass/Fail)
                if (line.toUpperCase().contains("PASS") || line.toUpperCase().contains("FAIL")) {
                    allRecords.add(new UserRecord(rawCells));
                }
            }

            System.out.println("\n" + "=".repeat(50));
            System.out.println("  DATA SYSTEM - MP01, MP08, MP16");
            System.out.println("=".repeat(50));

            // MP01: Total
            System.out.println("\n>>> MP01: TOTAL ENTRY COUNT");
            System.out.println("Total valid records found: " + allRecords.size());

            // MP08: Filter
            System.out.println("\n>>> MP08: SEARCH DATA");
            System.out.print("Enter search term: ");
            String query = input.nextLine();
            
            List<UserRecord> filtered = allRecords.stream()
                    .filter(r -> r.containsKeyword(query))
                    .collect(Collectors.toList());

            System.out.println("Matches for '" + query + "': " + filtered.size());
            filtered.forEach(System.out::println);

            // MP16: Shuffle 10
            System.out.println("\n>>> MP16: RANDOM DATA PICK (10 ROWS)");
            System.out.println("[ University of Perpetual Help System DALTA ]");
            
            List<UserRecord> randomList = new ArrayList<>(allRecords);
            Collections.shuffle(randomList);
            
            randomList.stream().limit(10).forEach(System.out::println);

            System.out.println("\n" + "=".repeat(50));

        } catch (IOException e) {
            System.err.println("Error: Problem accessing the file. " + e.getMessage());
        } finally {
            input.close();
        }
    }
}