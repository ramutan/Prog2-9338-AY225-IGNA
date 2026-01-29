function computeGrades() {

    let studentName = document.getElementById("studentName").value.trim();
    let attendance = parseFloat(document.getElementById("attendance").value);
    let lab1 = parseFloat(document.getElementById("lab1").value);
    let lab2 = parseFloat(document.getElementById("lab2").value);
    let lab3 = parseFloat(document.getElementById("lab3").value);

    if (
        studentName === "" ||
        isNaN(attendance) || attendance < 0 || attendance > 40 ||
        isNaN(lab1) || lab1 < 0 || lab1 > 100 ||
        isNaN(lab2) || lab2 < 0 || lab2 > 100 ||
        isNaN(lab3) || lab3 < 0 || lab3 > 100
    ) {
        document.getElementById("result").innerHTML =
            "<div class='badge fail'>INVALID INPUT</div><p>Please check your values.</p>";
        return;
    }

    // Lab Work Average
    let labAverage = (lab1 + lab2 + lab3) / 3;

    // Class Standing (attendance already max 40)
    let classStanding = (attendance * 0.40) + (labAverage * 0.60);

    // Required Prelim Exam
    let passingExam = (75 - (classStanding * 0.70)) / 0.30;
    let excellentExam = (100 - (classStanding * 0.70)) / 0.30;

    let badge = passingExam <= 100
        ? "<div class='badge pass'>PASS</div>"
        : "<div class='badge fail'>FAIL</div>";

    let excellentText = excellentExam > 100
        ? "<span class='warning'>Not achievable</span>"
        : excellentExam.toFixed(2);

    document.getElementById("result").innerHTML = `
        ${badge}
        <strong>Student Name:</strong> ${studentName}<br><br>

        <strong>Lab Work Average:</strong> ${labAverage.toFixed(2)}<br>
        <strong>Class Standing:</strong> ${classStanding.toFixed(2)}<br><br>

        <strong>Required Prelim Exam (Pass – 75):</strong> ${passingExam.toFixed(2)}<br>
        <strong>Required Prelim Exam (Excellent – 100):</strong> ${excellentText}
    `;
}
