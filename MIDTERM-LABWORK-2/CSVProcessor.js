/**
 * ============================================================================
 * Student Name    : Prince Ram Roydlikent F. Igna
 * Course          : BSCSIT 1203 Programming 2
 * Assignment      : Midterm Lab Work 2 (MP06, MP09, MP15)
 * School          : University of Perpetual Help System DALTA
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

class UserRecord {
    constructor(data) {
        /** * CSV MAPPING:
         * Index 0: Name | Index 1: Role | Index 3: Programming Language
         * Index 4: Course Language | Index 5: Exam Date | Index 6: Score
         * Index 7: Result | Index 8: Time Used
         */
        this.name = this.getSafe(data, 0, "Unknown");
        this.role = this.getSafe(data, 1, "Student");
        this.pLang = this.getSafe(data, 3, "N/A");
        this.cLang = this.getSafe(data, 4, "English");
        this.date = this.getSafe(data, 5, "03/14/2026");
        this.score = this.getSafe(data, 6, "000");
        this.result = this.getSafe(data, 7, "FAIL");
        this.time = this.formatTime(this.getSafe(data, 8, "00:00"));
    }

    getSafe(arr, index, def) {
        return (arr[index] && arr[index].trim() !== "") ? arr[index].trim() : def;
    }

    formatTime(raw) {
        // Standardizes "49 min 49 sec" to "49:49"
        return raw.replace(/min/gi, ":").replace(/sec/gi, "").replace(/\s+/g, "").trim();
    }

    toString() {
        // PadEnd handles the alignment without cutting the text
        return `| ${this.name.padEnd(18).substring(0, 18)} | ` +
               `${this.role.padEnd(8).substring(0, 8)} | ` +
               `${this.pLang.padEnd(50).substring(0, 50)} | ` +
               `${this.cLang.padEnd(10).substring(0, 10)} | ` +
               `${this.date.padEnd(12).substring(0, 12)} | ` +
               `${this.score.padEnd(6).substring(0, 6)} | ` +
               `${this.result.padEnd(7).substring(0, 7)} | ` +
               `${this.time.padEnd(8).substring(0, 8)} |`;
    }
}

function main() {
    const csvPath = path.join(__dirname, 'MIDTERM-LABWORK-2', 'Sample_Data-Prog-2-.csv');

    try {
        const fileContent = fs.readFileSync(csvPath, 'utf8');
        const lines = fileContent.split(/\r?\n/);
        const allRecords = [];

        // Skip the 7 University header lines
        for (let i = 7; i < lines.length; i++) {
            if (!lines[i].trim()) continue;

            // Regex to handle commas inside quotes
            const cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/"/g, '').trim());
            allRecords.push(new UserRecord(cols));
        }

        console.log("============================================================================");
        console.log("   CSV PROCESSOR - MP06, MP09, AND MP15 by Prince Ram Roydlikent F. Igna");
        console.log("============================================================================");

        // --- MP09: DATASET ANALYTICS ---
        console.log("\n---- MP09: TOTAL RECORDS ----");
        console.log(`Total Records: ${allRecords.length}`);

        // --- MP06: UNIQUE LANGUAGES ---
        console.log("\n==== MP06: UNIQUE LANGUAGES IDENTIFIED ====");
        const langs = [...new Set(allRecords.map(r => r.pLang))].sort();
        console.log(`Detected: ${langs.join(" | ")}`);

        // --- MP15: GRID VIEW (TOP 50) ---
        printGrid(allRecords, 50);

        // Export logic
        exportData(allRecords, 50, "MP15_Final_50_Rows.csv");

    } catch (err) {
        console.error("Error: Could not process file.", err.message);
    }
}

function printGrid(records, limit) {
    // HR precisely matched to column widths
    const hr = "+--------------------+----------+----------------------------------------------------+------------+--------------+--------+---------+----------+";
    console.log(`\n==== MP15: DATASET GRID VIEW (TOP ${limit}) ====`);
    console.log(hr);
    console.log("| FULL NAME          | ROLE     | PROGRAMMING LANGUAGE                               | LANGUAGE   | DATE         | SCORE  | RESULT  | TIME     |");
    console.log(hr);

    records.slice(0, limit).forEach(r => console.log(r.toString()));

    console.log(hr);
    console.log(` DISPLAYED: ${Math.min(limit, records.length)} RECORDS`);
}

function exportData(records, limit, fileName) {
    const header = "FullName,Role,ProgrammingLanguage,Language,Date,Score,Result,Time\n";
    const body = records.slice(0, limit).map(r => 
        `${r.name},${r.role},${r.pLang},${r.cLang},${r.date},${r.score},${r.result},${r.time}`
    ).join("\n");

    try {
        fs.writeFileSync(fileName, header + body);
        console.log(`\n[MP15] SUCCESS: ${fileName}`);
    } catch (err) {
        console.error("Export failed.");
    }
}

main();
