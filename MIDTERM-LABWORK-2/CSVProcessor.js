/**
 * =====================================================
 * Student Name    : Prince Ram Roydlikent F. Igna
 * Course          : BSCSIT 1203 Programming 2
 * Assignment      : Midterm Lab Work 2 (JS CSV Processor)
 * School          : University of Perpetual Help System DALTA
 * =====================================================
 */

const fs = require('fs');
const readline = require('readline');

// Helper to simulate the "Safe Indexing" from your Java code
const getSafe = (arr, index, defaultValue) => {
    return (arr[index] && arr[index].trim() !== "") ? arr[index].trim() : defaultValue;
};

// Helper for table formatting (similar to String.format)
const pad = (str, length) => {
    const s = String(str).substring(0, length);
    return s.padEnd(length);
};

const processCSV = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("========================================================");
    console.log("   UNIVERSITY OF PERPETUAL HELP SYSTEM DALTA");
    console.log("         JS ENHANCED CSV DATA PROCESSOR");
    console.log("========================================================");

    // Ask for filename
    const askPath = () => new Promise(resolve => {
        rl.question("\n Enter CSV filename (default: Sample_Data-Prog-2-.csv): ", resolve);
    });

    let path = await askPath();
    if (!path) path = "Sample_Data-Prog-2-.csv";

    // Check if file exists
    if (!fs.existsSync(path)) {
        console.error(` Error: File '${path}' not found in ${process.cwd()}`);
        rl.close();
        return;
    }

    try {
        const fileContent = fs.readFileSync(path, 'utf-8');
        const lines = fileContent.split(/\r?\n/);
        
        let allRecords = [];

        // Processing lines (skipping header)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            // Regex to handle commas inside quotes (same as your Java version)
            const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => col.replace(/"/g, '').trim());

            // Creating the record object (Similar to your Java UserRecord class)
            allRecords.push({
                fullName: getSafe(columns, 0, "Unknown User"),
                role:     getSafe(columns, 2, "Student"),
                score:    getSafe(columns, 6, "0"),
                language: getSafe(columns, 7, "N/A"),
                result:   getSafe(columns, 8, "PENDING"),
                time:     getSafe(columns, 9, "--:--")
            });
        }

        // Print Table Header
        const printHeader = (count) => {
            console.log(`\nTOTAL RECORDS FOUND: ${count}`);
            console.log("+------------------------+------------+------------+--------+----------+----------+");
            console.log("| NAME                   | ROLE       | LANGUAGE   | SCORE  | RESULT   | TIME     |");
            console.log("+------------------------+------------+------------+--------+----------+----------+");
        };

        const printRow = (r) => {
            console.log(`| ${pad(r.fullName, 22)} | ${pad(r.role, 10)} | ${pad(r.language, 10)} | ${pad(r.score, 6)} | ${pad(r.result, 8)} | ${pad(r.time, 8)} |`);
        };

        printHeader(allRecords.length);

        // Search Logic
        rl.question("\n Enter search term (Name/Role/Language): ", (query) => {
            const filtered = allRecords.filter(r => 
                (r.fullName + r.role + r.language + r.result).toLowerCase().includes(query.toLowerCase())
            );

            filtered.forEach(printRow);

            // Shuffle & Random Sample (Top 5)
            console.log("\n RANDOM SAMPLE (Top 5 Shuffled):");
            const shuffled = [...allRecords].sort(() => 0.5 - Math.random());
            shuffled.slice(0, 5).forEach(printRow);

            console.log("+------------------------+------------+------------+--------+----------+----------+");
            rl.close();
        });

    } catch (err) {
        console.error(" Critical Error reading file:", err.message);
        rl.close();
    }
};

processCSV();