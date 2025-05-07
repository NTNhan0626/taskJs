const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '../data/students.json');


function saveDataToFile(data){
    try {
        fs.writeFileSync(FILE_PATH,JSON.stringify(data,null,2));
        return 1;
    } catch (error) {
        return 0;
    }
}

function loadDataFromFile(){
    let students = [];
    if(fs.existsSync(FILE_PATH)){
        try {
            const data = fs.readFileSync(FILE_PATH,'utf8');
            students = JSON.parse(data);
            return students;
        } catch (error) {
            return [];
        }
    }else{
        return [];
    }
}
module.exports = {
    saveDataToFile,
    loadDataFromFile
  };