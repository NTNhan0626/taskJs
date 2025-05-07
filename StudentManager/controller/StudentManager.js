const Student = require('../models/Student');

let students = [];

function addStudent(id, name, age, grade) {
    let student = new Student(id, name, age, grade);
    const isDuplicate = students.some(st => st.id === id);
    if (isDuplicate) {
        return 0;
    } else {
        students.push(student);
        return 1;
    }
}
function showListStudents() {
    console.table(students.map(st => ({
        ID: st.id,
        NAME: st.name,
        AGE: st.age,
        GRADE: st.grade,
        Classification: st.getClassification()
    })))
}

function getStudentByName(name) {
    return students.filter(st => st.name.toLowerCase() === name.toLowerCase());
}
function displayStatistic() {
    const total = students.length;
    const sumGrade = students.reduce((acc, sv) => (acc + sv.grade), 0);
    const avgGrade = total > 0 ? sumGrade / total : 0;

    const classificationStats = students.reduce((acc, sv) => {
        if (sv.grade >= 8) {
            acc.Excellent++;
        }
        else if (sv.grade >= 6.5) {
            acc.Good++;
        } else {
            acc.Average++;
        }
        return acc;

    }, { Excellent: 0, Good: 0, Average: 0 })

    console.log("=== Thống kê Sinh viên ===");
    console.log("Tổng số sinh viên:", total);
    console.log("Điểm trung bình:", avgGrade.toFixed(2));
    console.log("Excellent (≥ 8):", classificationStats.Excellent);
    console.log("Good (≥ 6.5):", classificationStats.Good);
    console.log("Average (< 6.5):", classificationStats.Average);

}
function setStudents(data) {
    students = data.map(s => new Student(s.id, s.name, s.age, s.grade));
}
function getStudents() {
    return students;
}

module.exports = {
    addStudent,
    showListStudents,
    getStudentByName,
    displayStatistic,
    setStudents,
    getStudents

};

