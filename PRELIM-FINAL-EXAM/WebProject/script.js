// Programmer Identifier: [Prince Ram Roydlikent F. Igna] [25 - 2033 - 379]

const csvData = `StudentID,first_name,last_name,LAB WORK 1,LAB WORK 2,LAB WORK 3,PRELIM EXAM,ATTENDANCE GRADE
073900438,Osbourne,Wakenshaw,69,5,52,12,78
114924014,Albie,Gierardi,58,92,16,57,97
111901632,Eleen,Pentony,43,81,34,36,16
084000084,Arie,Okenden,31,5,14,39,99
272471551,Alica,Muckley,49,66,97,3,95
104900721,Jo,Burleton,98,94,33,13,29
111924392,Cam,Akram,44,84,17,16,24
292970744,Celine,Brosoli,3,15,71,83,45
107004352,Alan,Belfit,31,51,36,70,48
071108313,Jeanette,Gilvear,4,78,15,69,69
042204932,Ethelin,MacCathay,48,36,23,1,11
111914218,Kakalina,Finnick,69,5,65,10,8
074906059,Mayer,Lorenzetti,36,30,100,41,92
091000080,Selia,Rosenstengel,15,42,85,68,28
055002480,Dalia,Tadd,84,86,13,91,22
063101111,Darryl,Doogood,36,3,78,13,100
071908827,Brier,Wace,69,92,23,75,40
322285668,Bucky,Udall,97,63,19,46,28
103006406,Haslett,Beaford,41,32,85,60,61
104913048,Shelley,Spring,84,73,63,59,3
051403517,Marius,Southway,28,75,29,88,92
021301869,Katharina,Storch,6,61,6,49,56
063115178,Hester,Menendez,70,46,73,40,56
084202442,Shaylynn,Scorthorne,50,80,81,96,83
275079882,Madonna,Willatt,23,12,17,83,5
071001041,Bancroft,Padfield,50,100,58,13,14
261170740,Rici,Everard,51,15,48,99,41
113105478,Lishe,Dashkovich,9,23,48,63,95
267089712,Alexandrina,Abate,34,54,79,44,71
041002203,Jordon,Ribbens,41,42,24,60,21
021308176,Jennette,Andrassy,63,13,100,67,4
122239937,Hamid,Chapell,90,92,44,43,47
021109935,Cordy,Crosetto,16,10,99,32,57
111026041,Tiphanie,Gwin,34,45,88,87,27
072408708,Leanor,Izachik,95,35,88,9,75
221370030,Lissy,Tuffley,90,30,84,60,86
104900048,Myrta,Mathieson,88,80,16,6,48
111311413,Cynthea,Fowles,82,59,13,97,23
091408695,Zacherie,Branch,67,6,8,78,10
231372183,Britney,Blackesland,78,79,36,23,83
263190634,Theda,Menco,50,13,7,11,8
021606580,Carin,Schrader,77,32,25,56,53
074902341,Shawn,Moston,64,91,6,95,21
107006088,Virge,Sinnat,20,1,78,44,92
091807254,Alano,Jotcham,66,35,99,48,83
011601029,Pietra,Roy,35,34,75,39,98
122240010,Orren,Danihelka,51,36,17,59,32
091400046,Angie,Grindell,51,54,55,59,61
071001630,Vachel,Swancock,41,31,88,24,24
061020977,Zane,Bellie,88,92,92,52,46`;
// ===== PARSE CSV INTO ARRAY OF OBJECTS =====
function parseCSV(csvString) {
    const lines = csvString.trim().split('\n');
    const headers = lines[0].split(',');
    const students = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const student = {
            studentID: values[0],
            firstName: values[1],
            lastName: values[2],
            lab1: parseInt(values[3], 10),
            lab2: parseInt(values[4], 10),
            lab3: parseInt(values[5], 10),
            prelim: parseInt(values[6], 10),
            attendance: parseInt(values[7], 10)
        };
        students.push(student);
    }
    return students;
}
// ===== GLOBAL STUDENTS ARRAY =====
let students = parseCSV(csvData);
// ===== DOM ELEMENTS =====
const tableBody = document.getElementById('tableBody');
const studentForm = document.getElementById('studentForm');
const studentCountEl = document.getElementById('studentCount');
const statsBar = document.getElementById('statsBar');
// ===== RENDER FUNCTION: Clears and re-populates the table rows =====
function render() {
    // Clear the table body
    tableBody.innerHTML = '';
    // Update student count
    studentCountEl.textContent = students.length;
    // Check if array is empty
    if (students.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-message">
                    No students found... The dungeon is empty! 🏚️
                </td>
            </tr>
        `;
        renderStats();
        return;
    }
    // Use Template Literals to generate HTML rows dynamically
    students.forEach((student, index) => {
        // Determine grade styling based on average
        const avg = Math.round((student.lab1 + student.lab2 + student.lab3 + student.prelim + student.attendance) / 5);
        let gradeClass = 'grade-poor';
        if (avg >= 90) gradeClass = 'grade-excellent';
        else if (avg >= 80) gradeClass = 'grade-good';
        else if (avg >= 70) gradeClass = 'grade-average';
        // Template Literal for row HTML
        const rowHTML = `
            <tr>
                <td>💎 ${student.studentID}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td class="${gradeClass}">${student.lab1}</td>
                <td class="${gradeClass}">${student.lab2}</td>
                <td class="${gradeClass}">${student.lab3}</td>
                <td class="${gradeClass}">${student.prelim}</td>
                <td class="${gradeClass}">${student.attendance}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteStudent('${student.studentID}')">
                        🗑️ Delete
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += rowHTML;
    });
    // Update stats
    renderStats();
}
// ===== RENDER STATS =====
function renderStats() {
    const total = students.length;
    const avgGrade = total > 0 
        ? Math.round(students.reduce((sum, s) => sum + (s.lab1 + s.lab2 + s.lab3 + s.prelim + s.attendance) / 5, 0) / total)
        : 0;
    const highestAvg = total > 0 
        ? Math.max(...students.map(s => Math.round((s.lab1 + s.lab2 + s.lab3 + s.prelim + s.attendance) / 5)))
        : 0;
    const passing = students.filter(s => {
        const avg = (s.lab1 + s.lab2 + s.lab3 + s.prelim + s.attendance) / 5;
        return avg >= 70;
    }).length;
    // Template Literal for stats HTML
    statsBar.innerHTML = `
        <div class="stat-card stat-secondary">
            <div class="icon">👥</div>
            <div class="value">${total}</div>
            <div class="label">Total Students</div>
        </div>
        <div class="stat-card stat-primary">
            <div class="icon">📊</div>
            <div class="value">${avgGrade}%</div>
            <div class="label">Average Grade</div>
        </div>
        <div class="stat-card stat-accent">
            <div class="icon">🏆</div>
            <div class="value">${highestAvg}%</div>
            <div class="label">Highest Average</div>
        </div>
        <div class="stat-card stat-grass">
            <div class="icon">✅</div>
            <div class="value">${passing}</div>
            <div class="label">Passing (≥70%)</div>
        </div>
    `;
}
// ===== CREATE: Push a new object to the array and re-render =====
function addStudent(event) {
    event.preventDefault();
    // Get form values
    const studentID = document.getElementById('studentID').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const lab1 = parseInt(document.getElementById('lab1').value, 10);
    const lab2 = parseInt(document.getElementById('lab2').value, 10);
    const lab3 = parseInt(document.getElementById('lab3').value, 10);
    const prelim = parseInt(document.getElementById('prelim').value, 10);
    const attendance = parseInt(document.getElementById('attendance').value, 10);
    // Validate
    if (!studentID || !firstName || !lastName) {
        alert('Please fill in Student ID, First Name, and Last Name!');
        return;
    }
    // Create new student object
    const newStudent = {
        studentID,
        firstName,
        lastName,
        lab1: lab1 || 0,
        lab2: lab2 || 0,
        lab3: lab3 || 0,
        prelim: prelim || 0,
        attendance: attendance || 0
    };
    // Push to array
    students.push(newStudent);
    // Clear form
    studentForm.reset();
    // Re-render the table
    render();
    alert('Student added successfully! ⚔️');
}
// ===== DELETE: Remove specific entry from the array =====
function deleteStudent(studentID) {
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    
    if (confirmDelete) {
        // Find index and remove from array
        const index = students.findIndex(s => s.studentID === studentID);
        
        if (index !== -1) {
            students.splice(index, 1);
            render();
            alert('Student deleted successfully! 🗑️');
        }
    }
}
// ===== EVENT LISTENERS =====
studentForm.addEventListener('submit', addStudent);
// ===== INITIAL RENDER ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    render();
    console.log('Student Record System loaded successfully!');
    console.log(`Total students: ${students.length}`);
});