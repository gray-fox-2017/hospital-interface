//use readline to fix this challenge
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const readlineSync = require("readline-sync");

class Hospital {
    constructor(name, location) {
        this.name = name;
        this.location = location;
        this.dataPatient = [];
        this.dataEmployee = [];
        this.UserLogin = [];
    }

    welcome() {
        var nameRumahSakit = this.name;
        var addrRumahSakit = this.location;
        var garisGambar = "===========================";
        console.log(nameRumahSakit);
        console.log(addrRumahSakit);
        console.log(garisGambar);
        rl.question("[1].Patient\n[2].Employee\nWhich one you want login : ",(Jawaban) =>{
            if(Jawaban === "1" || Jawaban === "Patient"){
                console.log("Patient Comming Soon");
            }
            else if(Jawaban === "2" || Jawaban === "Employee"){
                this.LoginEmployee();
            }
            else{
                this.ResetLine();
                console.log("Sorry must be 1 or 2, you typing Patient or Employee ");
                this.welcome();
            }
        });
    }

    LoginEmployee(){
        this.ResetLine();
        rl.question("\nPlease input your Username :",(Username) =>{
                this.dataEmployee.map((data) =>{
                    if(data.username === Username){
                        this.UserLogin.push(data.name,data.password,data.position);
                        this.LoginPassword();
                    }
                });
                if(!this.UserLogin){
                    this.ResetLine();
                    console.log("Username Salah, Mohon Coba Lagi");
                    this.LoginEmployee();
                }
            }
        );
    }

    LoginPassword(){
        this.ResetLine();
        rl.question("Please Input your Password :",(Password) =>{
            if(Password === this.UserLogin[1]){
                this.WelcomeUser();
            }
            else{
                console.log("Password Salah, Mohon Coba lagi");
                this.LoginPassword();
            }
        })
    }
    //Pemilihan Menu dari 0 - 8
    ChooseMenu(){
        rl.question("\n Please input your choose here : ", (Choose)=>{
            switch(Choose){
                case "1":
                    //List Patient
                    this.ReportPatient();
                    break;
                case "2":
                    //View Record
                    this.DetailPatient();
                    break;
                case "3" :
                    //Add Patient
                    this.addPatient();
                    break;

                case "4" :
                    //Remove Patient
                    this.DeletePatient();
                    break;

                case "5" :
                    //Add Employee
                    this.addEmployee();
                    break;

                case "6" :
                    //List Employee
                    this.ReportEmployees();
                    break;

                case "7" :
                    //Delete Employee
                    this.DeleteEmployee();
                    break;
                case "0" :
                    //Logout
                    this.UserLogin = [];
                    this.ResetLine();
                    this.welcome();
                    break;

                default : console.log("Reset");
                    break;
            }
        })
    }

    ReportPatient(){
        this.ResetLine();
        console.log("=======Report Patient=====");
        console.log("ID | Patient Name | Diagnosis");
        this.dataPatient.map((dataPatient) =>{
            console.log(`${dataPatient.id} | ${dataPatient.name} | ${dataPatient.diagnosis}`);
        } )

    }

    ReportEmployees(){
        this.ResetLine();
        console.log("=======Report Employess=====");
        console.log("No | Employee Name | Position");
        let NO = 0;
        this.dataEmployee.map((dataEmployees) =>{
            NO++;
            console.log(`${NO} | ${dataEmployees.name} | ${dataEmployees.position}`);
        } );
        this.back();

    }

    DetailPatient(){
        // Masih bermasalah di sini karena tidak tau cara get ID nya
       // let idPatient = readlineSync.question("Please Insert Your Patient ID : ");
        this.dataPatient.map((dataPatient) => {
            if(dataPatient.id.toString() === idPatient) {
                console.log(`Patient Detail Record, ${dataPatient.name}`);
                console.log(`=============================================`);
                console.log(`ID : ${dataPatient.id} | Name : ${dataPatient.name} | Diagnosis : ${dataPatient.diagnosis}`);
            }
        });
        this.back();
    }

    addEmployee(data){
        if(data !== undefined){
            this.dataEmployee.push(data);
        }
    }

    addPatient(data){
        if(data !== undefined){
            this.dataPatient.push(data);
        }
    }

    DeletePatient(){
        // Masih bermasalah di sini karena tidak tau cara get ID nya
        for(let i = 0; i < this.dataPatient.length;i++){
            if(this.dataPatient[i].id === id){
                console.log(`${this.dataPatient[i].name} has been removed!`)
                this.dataPatient.splice(i,1)
                this.back()
            }
        }
        for(let j = 0; j < this.dataPatient.length;j++){
            if(this.dataPatient[j].id !== id){
                console.log(`Invalid ID`)
                this.back()
            }
        }
    }

    DeleteEmployee(){
        // Masih bermasalah di sini karena tidak tau cara get ID nya
        for(let i =0; i < this.dataEmployee.length;i++){
            if(this.dataEmployee[i].name === name){
                console.log(`${this.dataEmployee[i].name} has been fired!`)
                this.dataEmployee.splice(i,1)
                this.back()
            }
        }
        for(let j = 0; j < this.dataEmployee.length;j++){
            if(this.dataEmployee[j].name !== name){
                console.log(`There is no Employee name ${name}`)
                this.back()
            }
        }
    }

    WelcomeUser(){
        this.ResetLine();
        console.log("==============================================");
        console.log(`=Welcome, ${this.UserLogin[0]}. Your access level is : ${this.UserLogin[2]}=`);
        console.log("==============================================");
        this.MainMenu(this.UserLogin[2]);
    }

    MainMenu(position){
        console.log("=========Please Input the Menu Number=========");
        switch(position){
            //Admin Bisa Semua
            case "Admin" : console.log("\n[1].List Patient \n[2].View Record \n[3].Add Patient\n[4].Remove_Patient\n[5].Add Employee\n[6].List Employee\n[7].Remove Employee\n[0].Logout");
                break;
            //Doctor hanya untuk patient
            case "Doctor" : console.log("\n[1].List Patient\n[2].View Record\n[3].Add Patient\n[4].Remove_Patient\n[0].Logout");
                break;
            //Hanya bisa lihat Record nya sendiri
            case "Patient" : console.log("\n[1].View Record\n[0].Logout");
                break;
            // Logout Doang
            case "Office Boy" : console.log("[0].Logout");
                break;
        }
        this.ChooseMenu();
    }


    ResetLine(){
        console.log("\x1B[2J");
    }

    back(){
        rl.question('\nPlease press enter to go back', (answer)=>{
            if(!answer){
                this.welcome(this.User)
            }
            else{
                this.back()
            }
        })
    }

}

class Patient {
    constructor(id, name, diagnosis) {
        this.id = id;
        this.name = name;
        this.diagnosis = diagnosis;
    }
}

class Employee {
    constructor(name, position, username, password) {
        this.name = name;
        this.position = position;
        this.username = username;
        this.password = password;
    }
}

const Rs = new Hospital("Welcome Rumah Sakit Berkah","Jalan Ahamad yani no 21");
Rs.addEmployee(new Employee("Angga","Admin","Angga","123456"));
Rs.addEmployee(new Employee("Budi","Office Boy","Budi","123456"));
Rs.addEmployee(new Employee("Lina","Doctor","Lina","123456"));
Rs.addPatient(new Patient("001","Joe","Sakit Gigi"));


Rs.welcome();