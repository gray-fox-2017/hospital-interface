"use strict"

var readlineSync = require('readline-sync');
//const readline = require('readline');
//const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
//});

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this._name = name;
    this._diagnosis = diagnosis;
  }
}

class Employee {
  constructor(id, name, position, username, password) {
    this.id = id;
    this._name = name;
    this._position = position;
    this._username = username;
    this._password = password;
  }
}

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.location = location
    this._maxEmployees = employees
    this._maxPatients = patients
    this._employees = [];
    this._patients = [];
  }

  addEmployee(id, name, position, username, password) {
    if (this._employees.length < this._maxEmployees) {
      this._employees.push(new Employee(id, name, position, username, password));
    }
    else {
      console.log(`There are too many employees in the company right now.`);
    }
  }

  addPatient(id, name, diagnosis) {
    if (this._patients.length < this._maxPatients) {
      this._patients.push(new Patient(id, name, diagnosis));
    }
    else {
      console.log(`There are too many patients in the hospital right now.`);
    }
  }

  deleteEmployee(id) {
    for (let i=0; i<this._employees.length; i++) {
      if (id === this._employees[i].id) {
        this._employees.splice(i,1);
        return console.log('The employee has been fired.');
      }
    }
    return console.log('Sorry the id that you\'re looking for doesn\'t exist');
  }

  deletePatient(id) {
    for (let i=0; i<this._patients.length; i++) {
      if (this._patients[i].id === id) {
        this._patients.splice(i,1);
        return console.log(`The patient data has been deleted.`);
      }
    }
    return console.log(`Sorry, the id that you're looking for doesn't exist`);
  }
}

class SimHospital {
  constructor(hospital) {
    this.hospital = hospital;
    this.user = 0;
    this.welcome();
  }

  welcome() {
    let dashLine = "=".repeat(40);
    console.log(dashLine);
    console.log(`   Welcome to ${hospital.name} Hospital`);
    console.log(dashLine);
    this.askUserName();
  }

  askUserName() {
    let userName = readlineSync.question('Please enter your username: \n');
    for (let i=0; i<this.hospital._employees.length;i++) {
      if (userName == this.hospital._employees[i]._username) {
        this.user = i;
        return this.askPassword();
      }
    }
    console.log(`Username doesn't exist.`);
    return this.askUserName();
  }

  askPassword() {
    let userPass = readlineSync.question('Please enter your password: \n', {
      hideEchoBack: true});
    if (userPass == this.hospital._employees[this.user]._password) {
      return this.menu();
    }
    console.log(`Password doesn't match`);
    return this.askPassword();
  }

  menu() {
    let menuOptions = [`[1] Logout`, `[2] Patients List`, `[3] Add patients`, `[4] Remove patients`, `[5] Employee List`, `[6] Add employee`, `[7] Remove employee`];
    switch(this.hospital._employees[this.user]._position) {
      case "administrator":
        menuOptions.map(string => console.log(string))
        break;
      case "doctor":
        for (let i=0; i<4; i++) {
          console.log(menuOptions[i]);
        }
        break;
      default:
        console.log(menuOptions[0]);
    }
    let options = readlineSync.question(`Please choose the number of an action that you'd like to do.\n`);
    if (options<=7 && options>0) {
      return this.action(options);
    }
    this.menu();
  }

  action(options){
    switch (options){
      case "1":
        console.log('\x1B[2J');
        console.log (`Thank you.`)
        this.welcome();
        break;
      case "2":
        console.log('\x1B[2J');
        console.log(`The patients list:\n`);
        console.log(this.hospital._patients);
        console.log(`\n\n`);
        this.menu();
        break;
      case "3":
        let patient = readlineSync.question(`Please input the id, name, and diagnosis of the patient (separated by comma).\n`);
        let arrPatient = patient.split(',');
        this.hospital.addPatient(arrPatient[0],arrPatient[1],arrPatient[2]);
        console.log(`\n\n`);
        this.menu();
        break;
      case "4":
        let idPatient = readlineSync.question(`Please input the id of the patient record that is going to be deleted.\n`);
        this.hospital.deletePatient(idPatient);
        console.log(`\n\n`);
        this.menu();
        break;
      case "5":
        console.log('\x1B[2J');
        console.log(`The employees list:\n`);
        console.log(this.hospital._employees);
        console.log(`\n\n`);
        this.menu();
        break;
      case "6":
        let employee = readlineSync.question(`Please input the id, name, position, username, and password of the employee (separated by comma).\n`);
        let arrEmployee = employee.split(',');
        this.hospital.addEmployee(arrEmployee[0],arrEmployee[1],arrEmployee[2],arrEmployee[3],arrEmployee[4]);
        console.log(`\n\n`);
        this.menu();
        break;
      case "7":
        let idEmployee = readlineSync.question(`Please input the id of the employee record that is going to be deleted. \n`);
        this.hospital.deleteEmployee(idEmployee);
        console.log(`\n\n`);
        this.menu();
        break;
    }
  }
}

// New hospital
let hospital = new Hospital('Avicenna', 'Bandung', 10, 25);

// New employees

hospital.addEmployee('001','algebra', 'administrator', 'abra', '123');
hospital.addEmployee('002','kimya', 'doctor', 'kimi', '123');
hospital.addEmployee('003','sastra', 'doctor', 'ata', '123');
hospital.addEmployee('004','fizik', 'officeBoy', 'fizik_krenz_bgt', '0ff1c3B0y');

// New patients
hospital.addPatient('001', 'Zlatan Ibrahimovic', 'knee injury');
hospital.addPatient('002', 'Mesut Ozil', 'too much daydreaming');

let play = new SimHospital(hospital);
