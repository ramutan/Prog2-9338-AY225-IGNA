// Hardcoded credentials
const VALID_USERNAME = "ramutan"; 
const VALID_PASSWORD = "1234"; 

// Beep sound
const beep = new Audio("beep.wav");

// Attendance records
let attendance = []; 

// Ensure modal is hidden on page load
window.onload = function() {
    document.getElementById("attendanceModal").style.display = "none";
};

// Handle login form submission
function handleLogin(event) {
    event.preventDefault(); 

    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value; 

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        loginSuccess(username); 
    } else {
        beep.play(); 
        document.getElementById("message").innerText = "Incorrect username or password."; 
        document.getElementById("password").value = ""; 
        document.getElementById("password").focus(); 
    }
}

// Successful login
function loginSuccess(username) {
    const now = new Date(); 

    const timestamp =
        (now.getMonth() + 1) + "/" +
        now.getDate() + "/" +
        now.getFullYear() + " " +
        now.getHours() + ":" +
        now.getMinutes() + ":" +
        now.getSeconds(); 

    document.getElementById("message").innerText = "Welcome, " + username + "!"; 
    document.getElementById("timestamp").innerText = "Login Time: " + timestamp; 

    attendance.push({ username, time: timestamp }); 

    document.getElementById("downloadBtn").style.display = "block"; 

    // Show modal only after successful login
    const modal = document.getElementById("attendanceModal"); 
    const modalMessage = document.getElementById("modalMessage"); 
    modalMessage.innerText = `Paldo na, nakapag-attendance ka na!\nTime: ${timestamp}`; 
    modal.style.display = "flex"; 
}

// Close modal
function closeModal() {
    const modal = document.getElementById("attendanceModal"); 
    modal.style.display = "none"; 
}

// Download attendance summary as text file
function downloadAttendance() {
    let data = "Attendance Summary\n\n"; 

    attendance.forEach((record, index) => {
        data += `Record ${index + 1}\nUsername: ${record.username}\nTimestamp: ${record.time}\n\n`; 
    });

    const blob = new Blob([data], { type: "text/plain" }); 
    const link = document.createElement("a"); 
    link.href = URL.createObjectURL(blob); 
    link.download = "attendance_summary.txt"; 
    link.click(); 
}

// Optional: close modal if click outside content
window.onclick = function(event) {
    const modal = document.getElementById("attendanceModal"); 
    if (event.target == modal) {
        modal.style.display = "none"; 
    }
}
