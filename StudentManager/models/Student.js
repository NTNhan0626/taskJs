class Student {
    constructor(id, name, age, grade){
        this.id = id;
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

    getClassification(){
        if(this.grade >=8){
            return "Excellent"
        }
        if(this.grade >= 6.5){
            return "Good"
        }
        return "Avegare";
    }
}
module.exports = Student;

