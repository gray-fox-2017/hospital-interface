
const fs = require ('fs');
const readline = require ('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ">> "
});

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.arr = []
  }
  home(){
    console.log("***********************************");
    console.log(`Welcome to ${this.name} Hospital`)
    console.log("***********************************");
    this.login()
  }
  login(){
    rl.question("Please enter your username :",(answer) => {
        for(let i=0;i<this.employees.length;i++){
          if(this.employees[i].username == answer){
              this.arr.push({
                "name" : this.employees[i].name,
                "position" : this.employees[i].position,
                "username" : this.employees[i].username,
                "password" : this.employees[i].password

              })
          }
        }
        if(this.arr[0].username == answer){
          this.password()

        }
    })
  }
  password(){
    rl.question("Please enter your password :",(answer) => {
      if(this.arr[0].password == answer){
        this.start(this.arr[0].name,this.arr[0].position)
      }else{
        console.log("Password tidak cocok");
        this.password()
      }
    })
  }
  start(access,level){
    this.access = access
    this.level = level
    console.log("**************************************");
    console.log(`Selamat Datang ${this.access}. Anda Sebagai : ${this.level}`)
    console.log("**************************************");
    console.log("Silahkan Masukkan Pilihan Anda :");
    console.log("Option : ")
    if(this.level === "ADMIN"){
      console.log(`- list_employees`);
      console.log(`- list_patients`);
      console.log(`- add_employee`);
      console.log(`- add_patient`);
      console.log(`- remove_employee `);
      console.log(`- remove_patient `);
      console.log(`- close`);
      this.menuSelect();
    }else if(this.level === "DOKTER"){
      console.log(`- list_patients`);
      console.log(`- add_patient`);
      console.log(`- remove_patient `);
      console.log(`- close`);
      this.menuSelect();
    }
    else if(this.level === "RESEPSIONIS"){
      console.log(`- list_patients`);
      console.log(`- add_patient`);
      console.log(`- remove_patient `);
      console.log(`- close`);
      this.menuSelect();
    }else{
      console.log(`Access Denided !!!`);
      rl.close()
    }
  }

  menuSelect(){
    rl.prompt();
    rl.on('line',(input) => {
      if(this.level == "ADMIN"){
        switch(input){
          case "list_employees" :
            employee.listEmployee();
            break;
          case "list_patients" :
            patient.listPatient()
            break;
          case "add_employee" :
            employee.addEmployee();
            break;
          case "add_patient" :
            patient.addPatient()
            break;
          case "remove_employee" :
            employee.removeEmployee();
            break;
          case "remove_patient" :
            patient.removePatient();
            break;
          case "close" :
            rl.close();
            break;
        }
      }else {
        switch(input){
          case "list_patients" :
            patient.listPatient()
            break;
          case "add_patient" :
            patient.addPatient()
            break;
          case "remove_patient" :
            patient.removePatient();
            break;
          case "close" :
            rl.close();
            break;
        }
      }
    })
  }
}


class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
    this.dataPatient = objPatient
  }
  listPatient(){
    console.log(`n\**************************************************************`);
    console.log('id | name | diagnosis                    ')
    console.log(`n\**************************************************************`);
    if(this.dataPatient.length == 0){
      console.log(`Data Pasien Kosong`);
    }else{
      for(let i=0;i<this.dataPatient.length;i++){
      console.log(`${this.dataPatient[i].id}     ${this.dataPatient[i].name}            ${this.dataPatient[i].diagnosis}`);
      }
    }
  }

  addPatient(){
    rl.question('Contoh input data pasien : ( 1, Ambo, Flu) => ',(input) => {
      if(input != ''){
        input = input.split(',')
        this.dataPatient.push({
          "id" : input[0],
          "name" : input[1],
          "diagnosis" : input[2]
        })
        console.log("Input data Pasien Success.");
        fs.writeFileSync('patient.json',JSON.stringify(this.dataPatient))
        this.listPatient()
        console.log("\n")
        hospital.menuSelect()
      }else{
        console.log(`Data tidak Boleh Kosong!`);
        this.addPatient();
      }
    })

  }
  removePatient(){
    this.listPatient()
    rl.question(`Delete data pasien, Silahkan pilih Number : (ex : 1) `,(input) =>{
      if(input == 0){
        console.log(`Data is empty`);
        tis.removePatient();
      }else if(input <= this.dataPatient.length){
          this.dataPatient.splice(input-1,1)
      }else{
        console.log(`Number not match with data table`);
      }
      console.log(`Delete data Success.`);
      fs.writeFileSync('patient.json',JSON.stringify(this.dataPatient))
      this.listPatient()
      hospital.menuSelect()
    })
  }
}
//End of Class Patient

class Employee {
  constructor(name,position,username,password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.data = objEmployee;
  }
  listEmployee(){
    console.log('\n************************* List Employees *************************')
    console.log('id | name | position | username')
    console.log(`n\********************************************************************`);
    if(this.data.length == 0){
      console.log(`Data Employees Kosong`);
    }else{
      for(let i=0;i<this.data.length;i++){
      console.log(`${i+1} | ${this.data[i].name} | ${this.data[i].position} | ${this.data[i].username}`);
      }
    }
  }
  addEmployee(){
    rl.question('Contoh input data : (ex: Ambo,DOKTER,ambo,123) => ',(input) => {
      if(input != ''){
        input = input.split(',')
        this.data.push({
          "name" : input[0],
          "position" : input[1],
          "username" : input[2],
          "password" : input[3]
        })
        console.log("nput Data Employees Success.");
        fs.writeFileSync('employee.json',JSON.stringify(this.data))
        this.listEmployee()
        console.log("\n")
        hospital.menuSelect()
      }else{
        console.log(`Data tidak boleh Kosong!`);
        this.addEmployee();
      }
    })

  }
  removeEmployee(){
    this.listEmployee()
    rl.question(`Delete data. Choice Number : (Ex: 1) => `,(input) =>{
      if(input == 0){
        console.log(`Data Employee Kosong`);
        this.removeEmployee();
      }else if(input <= this.data.length){
          this.data.splice(input-1,1)
      }else{
        console.log(`Number not match with data table`);
      }
      console.log(`Delete data Success.`);
      fs.writeFileSync('employee.json',JSON.stringify(this.data))
      this.listEmployee()
      hospital.menuSelect()
    })
  }
}


var objEmployee = JSON.parse(fs.readFileSync('employee.json','utf-8'))
var objPatient = JSON.parse(fs.readFileSync('patient.json','utf-8'))

var employee = new Employee()
var patient = new Patient()
var hospital = new Hospital("Hacktiv8","Jakarta Selatan",objEmployee,objPatient)

hospital.home()
