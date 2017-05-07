const Table = require('cli-table')
const fs = require('fs')
const readline = require ('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Type the input and press input"
});

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.user_data = {}
    this.tmp_login = []
  }

  home(){
    console.log("-------------------------------------------------");
    console.log(`Selamat Datang di ${this.name}`)
    console.log(`${this.location}`);
    console.log("-------------------------------------------------");
    this.loginUser();
  }

  loginUser(){
    rl.question("Please enter your username :",(answer) => {
        for(let i=0;i<this.employees.employee_data.length;i++){
          if(this.employees.employee_data[i].username == answer){
              this.user_data = this.employees.employee_data[i]
              this.tmp_login.push({
                "name" : this.employees.employee_data[i].name,
                "position" : this.employees.employee_data[i].position,
                "username" : this.employees.employee_data[i].username,
                "password" : this.employees.employee_data[i].password
              })
          }
          //else if (this.employees[i].username !== answer){
            //console.log("Username is not registered, plese enter registered username only");
            //this.login();
          //}
        }
        if(this.tmp_login[0].username == answer){
          this.loginPass(this.user_data);
        }
    })
  }


  loginPass(user_data){
    rl.question(`Masukkan password untuk akun ${user_data.username} `,(answer) => {
      if (user_data.password == answer){
        this.displayMenu(user_data)
      } else {
        console.log(`Maaf, password salah, silakan masukkan password yang benar`);
        this.loginPass(user_data);
      }
    })
  }

  displayMenu(user_data){
    console.log(`Selamat datang ${user_data.name}, user access anda adalah ${user_data.position} apa yang ingin anda lakukan ? `);
    if (user_data.position == "admin"){
      this.adminSys();
    } else if (user_data.position == "doctor"){
      this.doctorSys();
    } else if (user_data.position == "officeboy"){
      this.officeboySys();
    }
  }

  adminSys(){
    console.log(`- list_employees`);
    console.log(`- list_patient`);
    console.log(`- add_employee`);
    console.log(`- add_patient`);
    console.log(`- remove_employee <id_record>`);
    console.log(`- remove_patient <id_record>`);
    console.log(`- close`);
    rl.setPrompt(`Apa yang ingin anda lakukan? \n`)
    rl.prompt();
    rl.on('line',(input)=>{
      switch (input) {
        case "list_employees":
        this.employees.listEmployee();
        this.adminSys();
          break;

        case "list_patient":
        this.patients.listPatient();
        this.adminSys();
          break;

        case "add_employee":
        this.employees.addEmployee();
          break;

        case "remove_employee":
        this.employees.removeEmployee();
          break;

        case "add_patient":
        this.patients.addPatient();
          break;

        case "remove_patient":
        this.patients.removePatient();
          break;

        case "close":
        rl.close();
          break;
        default:

      }
    })
  }

  doctorSys(){
    console.log(`- list_patient`);
    console.log(`- add_patient`);
    console.log(`- remove_patient <id_record>`);
    console.log(`- close`);
    rl.setPrompt(`Apa yang ingin anda lakukan? \n`)
    rl.prompt();
    rl.on('line',(input)=>{
      switch (input) {

        case "list_patient":
        this.patients.listPatient();
          break;

        case "add_patient":
        this.patients.addPatient();
          break;

        case "remove_patient":
        this.patients.removePatient();
          break;

        case "close":
        rl.close();
          break;

        default:
      }
    })
  }

  officeboySys(){
    console.log(`- close`);
    rl.prompt();
    rl.on('line ',(input)=>{
      switch (input) {
        case "close":
        rl.close();
          break;

        default:
      }
    })
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
    this.patient_data = patient_data
  }

  listPatient(){
    let patient_table = new Table({
      head : ["id","name","diagnosis"],
      colWidths : [10,15,20]
    })

    for (let i = 0; i < this.patient_data.length; i++){
      let tmp = [];
      tmp.push(this.patient_data[i].id)
      tmp.push(this.patient_data[i].name)
      tmp.push(this.patient_data[i].diagnosis)
      patient_table.push(tmp);
    }
    console.log(patient_table.toString());
  }

  addPatient(){
    rl.question(`Masukkan data pasien dengan format "nama","diagnosis" `,input=>{
      if (input != ""){
        let tmp = {};
        tmp["id"] = this.patient_data[this.patient_data.length - 1].id + 1;
        tmp["name"] = input.split(",")[0];
        tmp["diagnosis"] = input.split(",")[1];
        this.patient_data.push(tmp)
        fs.writeFile('patient.json', JSON.stringify(this.patient_data) ,
        (err) => {
        if (err) throw err;
        // this.listEmployee();
        console.log(`\n`);
        });
        hospitalSys.displayMenu(hospitalSys.user_data);
      } else {
        console.log("Data tidak boleh null");
        this.addEmployee();
      }
    })
  }

  removePatient(){
    rl.question(`Masukkan nama pasien yang akan di hapus \n`, input =>{
      for (let i = 0; i < this.patient_data.length ; i++){
        if (this.patient_data[i].name == input){
          this.patient_data.splice(i,1);
          fs.writeFile('patient.json', JSON.stringify(this.patient_data) , (err) => {
          if (err) throw err;
          // this.listEmployee();
          console.log(`\n`);
          });
          hospitalSys.displayMenu(hospitalSys.user_data);
        } else {
          console.log("Data nama pasien tidak ditemukan");
          this.removeEmployee();
        }
      }
    })
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.employee_data = employee_data;
  }

  listEmployee(){
    let employee_table = new Table({
      head : ['name','position','username','password'],
      colWidths : [20,15,10,10]
    })
    for (let i = 0; i < this.employee_data.length; i++){
      let tmp = [];
      tmp.push(this.employee_data[i].name)
      tmp.push(this.employee_data[i].position)
      tmp.push(this.employee_data[i].username)
      tmp.push(this.employee_data[i].password)
      employee_table.push(tmp);
    }
    console.log(employee_table.toString());
  }

  addEmployee(){
    rl.question(`Masukkan data karyawan dengan format ("Nama","admin/doctor/officeboy","username","password") \n`,input =>{
      if (input != ""){
        let tmp = {};
        tmp["name"] = input.split(",")[0];
        tmp["position"] = input.split(",")[1]
        tmp["username"] = input.split(",")[2]
        tmp["password"] = input.split(",")[3]
        this.employee_data.push(tmp)
        fs.writeFile('employee.json', JSON.stringify(this.employee_data) , (err) => {
        if (err) throw err;
        // this.listEmployee();
        console.log(`\n`);
        });
        hospitalSys.displayMenu(hospitalSys.user_data);
      } else {
        console.log("Data tidak boleh null");
        this.addEmployee();
      }
    })
  }

  removeEmployee(){
    rl.question(`Masukkan nama karyawan yang akan di hapus \n`, input =>{
      for (let i = 0; i < this.employee_data.length ; i++){
        if (this.employee_data[i].name == input){
          this.employee_data.splice(i,1);
          fs.writeFile('employee.json', JSON.stringify(this.employee_data) , (err) => {
          if (err) throw err;
          // this.listEmployee();
          console.log(`\n`);
          });
          hospitalSys.displayMenu(hospitalSys.user_data);
        } else {
          console.log("Data nama karyawan tidak ditemukan");
          this.removeEmployee();
        }
      }
    })
  }
}

const employee_data = JSON.parse(fs.readFileSync('employee.json').toString());
const patient_data = JSON.parse(fs.readFileSync('patient.json').toString());
const patientSys = new Patient();
const employeeSys = new Employee();
const hospitalSys = new Hospital("Rumah Sakit Ben Mari", "Bululawang, Malang", employeeSys, patientSys);
hospitalSys.home()
