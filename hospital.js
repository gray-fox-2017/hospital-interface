const readline = require('readline');
// const Menu = require('./menu.js')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Hospital {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.employees = [];
    this.patients = [];
    this.password = '';
    this.user = '';
    this.role = '';
    this.wrongUsernameCounter = 0;
    this.wrongPasswordCounter = 0;
    this.sessionCounter = 0;
    this.patientsIndex = 0;
  }

  menu(){
    console.log(`++++++++++++++++++++++++\n${this.name}\n${this.location}\n~~~~~~~MAIN PAGE~~~~~~~~\n++++++++++++++++++++++++\n`)
    console.log(`Halo ${this.user}! (Role: ${this.role})`);
    console.log(`++++++++++++++++++++++++\nWhat would you like to do`);
    console.log(`[1] view patient list\n[2] view patient detail\n[3] add patient\n[4] delete patient\n[5] add employee\n[6] view employee list\n[7] log out\n[8] quit\n++++++++++++++++++++++++`);
    rl.question('input number: ',(input)=>{
      switch(input) {
        case '1': this.viewPatientList(); break;
        case '2': this.viewPatientDetail(); break;
        case '3': this.addPatient(); break;
        case '4': this.deletePatient(); break;
        case '5': this.addEmployee(); break;
        case '6': this.viewEmployeeList(); break;
        case '7': this.password = '';
                  this.user = '';
                  this.role = '';
                  this.wrongUsernameCounter = 0;
                  this.wrongPasswordCounter = 0;
                  this.sessionCounter ++;
                  sentence = 'YOU\'VE BEEN LOGGED OUT';
                  nospace();
                  this.start();
                  break;
        case '8': rl.close();
                  sentence = 'EXIT'
                  nospace();
                  break;
        default:  sentence = 'INVALID SELECTION'
                  nospace();
                  this.menu();
      }
    })
  }

  addDummyUser(data){
    this.employees.push(data)
  }

  start(){
    this.sessionCounter = 0;
    if(this.wrongUsernameCounter<1){
      console.log(`++++++++++++++++++++++++\n${this.name}\n${this.location}\n~~~~~~~LOGIN PAGE~~~~~~~~\n++++++++++++++++++++++++\n`)
      rl.question('Input username: ',(username)=>{
        let cek = false
        for (var i = 0; i < this.employees.length; i++) {
          if(this.employees[i].username===username.toLowerCase()){
            this.pass = this.employees[i].password;
            this.user = this.employees[i].name;
            this.role = this.employees[i].position;
            cek = true;
            this.passwordCheck()
          }
        }
        if (!cek){
          this.wrongUsernameCounter ++;
          this.start();
        }
      })
    } else {
      console.log(`++++++++++++++++++++++++\n${this.name}\n${this.location}\n~~~~~~~LOGIN PAGE~~~~~~~~\n++++++++++++++++++++++++\n`)
      rl.question('Username doesn\'t exist, insert the right username: ',(username)=>{
        let cek = false
        for (var i = 0; i < this.employees.length; i++) {
          if(this.employees[i].username===username.toLowerCase()){
            this.pass = this.employees[i].password;
            this.user = this.employees[i].name;
            this.role = this.employees[i].position;
            cek = true;
            this.passwordCheck()
          }
        }
        if (!cek){
          this.wrongUsernameCounter ++;
          if(this.wrongUsernameCounter<=3){
            this.start();
          } else {
            console.log('too many login attempts, program\'s shutting down');
            rl.close()
          }
        }
      })
    }
  }

  passwordCheck(){
    if(this.wrongPasswordCounter<1){
    console.log(`++++++++++++++++++++++++\n${this.name}\n${this.location}\n~~PASSWORD VALIDATION PAGE~~~\n++++++++++++++++++++++++\n`)
    rl.question(`Input password: `, (password) => {
      if(password == this.pass) {

        this.menu();
      } else {
        this.wrongPasswordCounter ++;
        if(this.wrongPasswordCounter<=3){
          this.passwordCheck();
        } else {
          console.log('too many wrong password, program\'s shutting down');
          rl.close()
        }
      }
    })
    } else {
      console.log(`++++++++++++++++++++++++\n${this.name}\n${this.location}\n~~PASSWORD VALIDATION PAGE~~~\n++++++++++++++++++++++++\n`)
      rl.question(`Password is wrong, insert the correct password: `, (line) => {
        if(line == this.pass) {
                    this.menu();
        } else {
          this.wrongPasswordCounter ++;
          if(this.wrongPasswordCounter<=3){
            this.passwordCheck();
          } else {
            console.log('too many wrong password, program\'s shutting down');
            rl.close()
          }
        }
      })
    }
  }

  viewPatientList(){
    if(this.role=='officeboy'){
      sentence = 'YOU HAVE NO ACCESS'
      nospace();
      this.menu();
    } else {
      if(this.patients.length>0){
        let temp = []
        for(let i=0;i<this.patients.length;i++){
          temp.push(`[${this.patients[i]['id']}] ${this.patients[i]['name'].toUpperCase()}`)
        }
        sentence = `Patients: ${JSON.stringify(temp,null,2)}`
        nospace();
        this.menu();
      } else {
        sentence = 'THERE\'S NO PATIENT RECORD'
        nospace();
        this.menu();
      }
    }
  }

  viewPatientDetail(){
    if(this.role=='officeboy'){
      sentence = 'YOU HAVE NO ACCESS'
      nospace();
      this.menu();
    } else if(this.role=='receptionist') {
      if(this.patients.length>0){
        rl.question('Input patient ID: ',(line)=>{
          let index = 0
          for(let i=0;i<this.patients.length;i++){
            if(line==this.patients[i]['id']){
              index = i
            }
          }
          if(index==0){
            sentence = `ID INVALID`
            nospace();
            this.menu();
          } else {
            let id = this.patients[index]['id']
            let name = this.patients[index]['name']
            let roomNumber = this.patients[index]['roomNumber']
            sentence = `ID: [${id}]\nNAME: ${name}\nROOM NUMBER: ${roomNumber}`
            nospace();
            this.menu();
          }
        })
      } else {
        sentence = 'THERE\'S NO PATIENT RECORD'
        nospace();
        this.menu();
      }
    } else {
      if(this.patients.length>0){
        rl.question('Input patient ID: ',(line)=>{
          let index = 0
          for(let i=0;i<this.patients.length;i++){
            if(line==this.patients[i]['id']){
              index = i
            }
          }
          if(index==0){
            sentence = `ID INVALID`
            nospace();
            this.menu();
          } else {
            let id = this.patients[index]['id']
            let name = this.patients[index]['name']
            let roomNumber = this.patients[index]['roomNumber']
            let diagnosis = this.patients[index]['diagnosis']
            sentence = `ID: [${id}]\nNAME: ${name}\nROOM NUMBER: ${roomNumber}\nDIAGNOSIS: ${diagnosis}`
            nospace();
            this.menu();
          }
        })
      } else {
        sentence = 'THERE\'S NO PATIENT RECORD'
        nospace();
        this.menu();
      }
    }
  }

  addPatient(){
    if(this.role=='officeboy'||this.role=='receptionist'){
      sentence = 'YOU HAVE NO ACCESS'
      nospace();
      this.menu();
    } else {
      let patient = [];
      this.patientsIndex++;
      patient.push(this.patientsIndex);
      rl.question('Input patient name: ',(line)=>{
        patient.push(line);
        rl.question('Input diagnosa: ',(line)=>{
          patient.push(line);
          rl.question('Input room number: ',(line)=>{
            patient.push(line);
            this.patients.push(new Patient (patient[0],patient[1],patient[2],patient[3]))
            sentence = 'PATIENT SUCCESSFULLY ADDED'
            nospace();
            this.menu();
          })
        })
      })
    }
  }

  deletePatient(){
    if(this.role=='officeboy'||this.role=='receptionist'){
      sentence = 'YOU HAVE NO ACCESS'
      nospace();
      this.menu();
    } else {
      if(this.patients.length>0){
        rl.question('Input patient ID: ',(line)=>{
          for(let i=0;i<this.patients.length;i++){
            if(line==this.patients[i]['id']){
              this.patients.splice(i,1)
              sentence = `PATIENT RECORD WITH ID ${line} SUCCESSFULLY REMOVED`
            } else {
              sentence = `THERE\'S NO PATIENT WITH ID ${line}`
            }
          }
          nospace();
          this.menu();
        })
      } else {
        sentence = 'THERE\'S NO PATIENT RECORD'
        nospace();
        this.menu();
      }
    }
  }

  addEmployee(){
    if(this.role=='admin'){
      let employee = [];
      rl.question('INPUT EMPLOYEE NAME: ',(line)=>{
        employee.push(line);
        rl.question('INPUT EMPLOYEE USERNAME: ',(line)=>{
          employee.push(line);
          rl.question('INPUT EMPLOYEE PASSWORD: ',(line)=>{
            employee.push(line);
            rl.question('INPUT EMPLOYEE POSITION NUMBER ([1]=DOCTOR,[2]=RECEPTIONIST,[3]=OFFICE BOY): ',(line)=>{
              if(line==1){
                this.employees.push(new Employee(employee[0],'doctor',employee[1],employee[2]))
                sentence = 'EMPLOYEE SUCCESSFULLY ADDED AS DOCTOR'
                nospace();
                this.menu();
              } else if (line==2) {
                this.employees.push(new Employee(employee[0],'receptionist',employee[1],employee[2]))
                sentence = 'EMPLOYEE SUCCESSFULLY ADDED AS RECEPTIONIST'
                nospace();
                this.menu();
              } else if (line==3) {
                this.employees.push(new Employee(employee[0],'officeboy',employee[1],employee[2]))
                sentence = 'EMPLOYEE SUCCESSFULLY ADDED AS OFFICE BOY'
                nospace();
                this.menu();
              } else {
                sentence = 'THERE\'S NO SUCH POSITION'
                nospace();
                this.menu();
              }
            })
          })
        })
      })
    } else {
      sentence = 'YOU HAVE NO ACCESS'
      nospace();
      this.menu();
    }
  }

  viewEmployeeList(){
    if(this.role=='admin'){
      let temp = []
      for(let i=0;i<this.employees.length;i++){
        temp.push(`[${i}] ${this.employees[i]['name'].toUpperCase()} - JOB DESK: ${this.employees[i]['position'].toUpperCase()}`)
      }
      sentence = `EMPLOYES: ${JSON.stringify(temp,null,2)}`
      nospace();
      this.menu();
    } else {
      sentence = 'YOU HAVE NO ACCESS'
      nospace();
      this.menu();
    }
  }
}

let sentence = '';
let nospace = ()=>{
  for (var i = 0; i < 100; i++) {
    console.log('                         \r');
  }
  console.log(sentence);
  for (var i = 0; i < 2; i++) {
    console.log('                         \r');
  }
  sentence = ''
}

class Patient {
  constructor(id, name, diagnosis, room_number) {
    this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
    this.roomNumber = room_number;
  }
}

class Employee {
  constructor(name, position, username = username.toLowerCase(), password) {
    this.name = name;
    this.position = position;
    this.username = username;
    this.password = password;
  }
}


let nugraha = new Employee('Nugraha', 'officeboy', 'nunu', 123)
let lala = new Employee('Lala', 'admin', 'la', 123)
let hera = new Employee('hera', 'doctor', 'her-her', 123)
let listya = new Employee('listya', 'receptionist', 'nunu', 123)

let rs = new Hospital('RS SEJUK SEGAR', 'jl. Mundar mandir, pondok indah, jakarta')
rs.addDummyUser(nugraha)
rs.addDummyUser(lala)
rs.addDummyUser(hera)

rs.start()
