const readline = require('readline');
const {
    addStudent,
    showListStudents,
    getStudentByName,
    displayStatistic,
    setStudents,
    getStudents
} = require('./controller/StudentManager');
const { saveDataToFile,
    loadDataFromFile } = require('./controller/FileManager');

// khi khởi chạy đọc file để lấy thông tin của sinh viên
setStudents(loadDataFromFile());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log(`
==== STUDENT MANAGER ====
1. Add student
2. List students
3. Search by name
4. Show statistics
5. Save & Exit
  `);
    rl.question("Choose an option: ", handleMenu);
}

function handleMenu(choice) {
    switch (choice) {
        case "1":
            rl.question("ID: ", id => {
                rl.question("Name: ", name => {
                    rl.question("Age: ", age => {
                        rl.question("Grade: ", grade => {
                            if (addStudent(id, name, Number(age), Number(grade))) {
                                console.log("Student added.");
                                showMenu();
                            } else {
                                console.log("Failed to add student: ID already exists.");
                                showMenu();
                            }
                        });
                    });
                });
            });
            break;
        case "2":
            showListStudents();
            showMenu();
            break;
        case "3":
            rl.question("Enter name to search: ", keyword => {
                const results = getStudentByName(keyword);
                console.table(results);
                showMenu();
            });
            break;
        case "4":
            displayStatistic();

            showMenu();
            break;
        case "5":
            // khi chọn save và thoát lưu thông  tin sinh viên đã tạo vào file.
            saveDataToFile(getStudents());
            console.log("Data saved. Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice");
            showMenu();
    }
}

showMenu();
