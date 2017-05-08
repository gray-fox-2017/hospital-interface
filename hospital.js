const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Hospital {
  constructor(name, location) {
    this.name = name
    this.employees = []
    this.user = []
    this.menu = []
    this.selectedMenu = null
    this.patients = []
    this.location = location
  }

  addEmployee(name, position, username, password){
    // manual input
    return this.employees.push(new Employee(name, position, username, password))
  }

  addPatient(id, name, diagnosis){
    // manual input
    return this.patients.push(new Patient(id, name, diagnosis))
  }

  newEmployee(){
    console.log('\n \n ===========please input employee details===========')
    rl.question('Employee name: ', (answer) => {
      let name = answer
      console.log('position: Admin || Doctor || Patient || OfficeBoy');
      rl.question('Employee position: ', (answer) => {
        let position = answer
        rl.question('Employee username: ', (answer) => {
          let username = answer
          rl.question('Employee password: ', (answer) => {
            let password = answer
            this.employees.push(new Employee(name, position, username, password))
            console.log('Data employee berhasil ditambahkan.');
            this.listEmployees(this.employees)
          })
        })
      })
    })
  }

  removeEmployee(list){
    this.listEmployees(this.employees);
    console.log('\n=====please input employee ID=====')
    rl.question('Delete Employee with ID: ', (answer) => {
      let id = answer
      for(let i=0; i<list.length; i++){
        if(id == i+1){
          console.log(`Employee: ${list[i].name} telah dihapus` )
          list.splice(i, 1)
          this.employees = list
        }
      }
      this.backMenu();
    })
  }

  removePatient(list){
    this.listPatients(this.patients);
    console.log('\n=====please input Patient ID=====')
    rl.question('Delete Patient with ID: ', (answer) => {
      let id = answer
      for(let i=0; i<list.length; i++){
        if(id == i+1){
          console.log(`Pasien: ${list[i]._name} telah dihapus` )
          list.splice(i, 1)
          this.patients = list
        }
      }
      this.backMenu();
    })
  }

  newPatient(){
    console.log('\n \n ===========please input patient details===========')
    rl.question('Patient ID: ', (answer) => {
      let id = answer
      rl.question('Patient name: ', (answer) => {
        let name = answer
        rl.question('Patient diagnosis: ', (answer) => {
          let diagnosis = answer
          this.patients.push(new Patient(id, name, diagnosis))
          console.log('Data pasien berhasil ditambahkan.');
          this.listPatients(this.employees)
        })
      })
    })
  }

  listEmployees(listEmployees){
    console.log('\n \n===========List of Employee===========')
    for(let i=0; i<listEmployees.length; i++){
      console.log(`[${i+1}] ${listEmployees[i].name}`)
    }
  }

  listPatients(listPatients){
    console.log('\n \n===========List of Patients===========')
    for(let i=0; i<listPatients.length; i++){
      console.log(`[${listPatients[i]._id}] ${listPatients[i]._name}`)
    }
  }

  medicReport(){
    console.log('===========please input patient details===========')
    rl.question('Patient ID: ', (answer) => {
      let id = answer
      for(let i=0; i<this.patients.length; i++){
        if(id == this.patients[i]._id){
          console.log('\n \n=================DETAIL PASIEN=================')
          console.log('ID Pasien: ', this.patients[i]._id )
          console.log('Nama Pasien: ', this.patients[i]._name )
          console.log('Diagnosis: ', this.patients[i]._diagnosis )
        } else {
          console.log('ID Pasien salah')
          this.medicReport();
        }
      }
      this.backMenu();
    })
  }

  login(){
    rl.question('Please enter your username: ', (answer) => {
      let loginFlag = false
      for(let i=0; i<this.employees.length; i++){
        if(this.employees[i]._username==answer){
          loginFlag = true
          this.user.push(this.employees[i])
        }
      }
      if(loginFlag){
        console.log('===========================================')
        this.password()
      } else {
        console.log('===========================================')
        this.login()
      }
    })
  }

  logout(){
    console.log('===========================================')
    this.user = []
    console.log(`You've been logged out`)
    return this.login()
  }

  password(){
    rl.question('Please enter your password: ', (answer) => {
      if(this.user[0]._password==answer){
        console.log('===========================================')
        this.welcome()
      } else {
        console.log('===========================================')
        this.password()
      }
    })
  }

  welcome(){
    console.log(`\n \nWelcome ${this.user[0].name}! Your access level is: ${this.user[0].position}`)
    console.log('===========================================')
    console.log('What would you like to do?')
    this.previlage()
  }

  previlage(){
    let num=1
    if(this.user[0].position == 'Admin'){
      this.showMenu(0)
      this.fullAccess()
    }
    else if(this.user[0].position == 'Doctor' || this.user[0].position == 'Patient'){
      this.showMenu(5)
      this.limitedAccess()
    } else {
      this.showMenu(7)
      this.basicminimAccess()
    }
  }

  fullAccess(){
    rl.question('Please enter option number: ', (answer) => {
      if(answer <= this.menu.length && /\d/.test(answer)){
        switch(answer){
          case '1':
            this.newEmployee();
            break;
          case '2':
            this.newPatient();
            break;
          case '3':
            this.removeEmployee(this.employees);
            break;
          case '4':
            this.removePatient(this.patients);
            break;
          case '5':
            this.listEmployees(this.employees);
            this.backMenu()
            break;
          case '6':
            this.listPatients(this.patients);
            this.backMenu()
            break;
          case '7':
            this.medicReport();
            break;
          case '8':
            this.logout();
            break;
          default:
            console.log('please input option number');
            this.previlage()
        }
      } else {
        console.log('===========================================')
        console.log('What would you like to do?')
        console.log('please enter correct number')
        this.previlage()
      }
    })
  }

  limitedAccess(){
    rl.question('Please enter option number: ', (answer) => {
      if(answer <= this.menu.length && /\d/.test(answer)){
        switch(answer){
          case '1':
            this.listPatients(this.patients);
            this.backMenu()
            break;
          case '2':
            this.medicReport();
            break;
          case '3':
            this.logout();
            break;
          default:
            console.log('please input option number');
        }
      } else {
        console.log('===========================================')
        console.log('What would you like to do?')
        console.log('please enter correct number')
        this.previlage()
      }
    })
  }

  basicAccess(){
    rl.question('Please enter option number: ', (answer) => {
      if(answer <= this.menu.length && /\d/.test(answer)){
        switch(answer){
          case '1':
            this.listPatients();
            break;
          case '2':
            this.medicReport();
            break;
          case '3':
            this.logout();
            break;
          default:
            console.log('please input option number');
        }
      } else {
        console.log('===========================================')
        console.log('What would you like to do?')
        console.log('please enter correct number')
        this.previlage()
      }
    })
  }

  menuList(){
    let listOfMenu = [
      'Add Employee',
      'Add New Patient',
      'Remove Employee',
      'Remove Patient',
      'List Employees',
      'List Patients',
      'Medic Report',
      'Logout'
    ]
    return listOfMenu
  }

  showMenu(menuStart){
    let num=1
    for(let i=menuStart; i<this.menuList().length; i++){
      this.menu.push(`[${num}] ${this.menuList()[i]}`)
      console.log(`[${num}] ${this.menuList()[i]}`)
      num++
    }
  }

  backMenu(){
    console.log('-----------------------------------------')
    console.log(`[1] Back to Home  [2] Logout`)
    rl.question('Please enter option number: ', (answer) => {
      if(answer <= this.menu.length && /\d/.test(answer)){
        switch(answer){
          case '1':
            this.welcome();
            break;
          case '2':
            this.logout();
            break;
          default:
            console.log('please input option number');
            this.previlage()
        }
      } else {
        console.log('===========================================')
        console.log('What would you like to do?')
        console.log('please enter correct number')
        this.previlage()
      }
    })
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this._id = id
    this._name = name
    this._diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this._username = username
    this._password = password
  }
}

function runner() {
  console.log('\n \n');
  console.log(`Welcome to ${medika.name} Hospital`)
  console.log(medika.location)
  console.log('===========================================')
  medika.login()
}

let medika = new Hospital('Medika Center', 'Jl. Kebayoran Lama No.64, Jakarta')
medika.addEmployee('Abdi Dia', 'Admin', 'abdi', '123')
medika.addEmployee('Beta Taro', 'Doctor', 'beta', '123')
medika.addEmployee('Delta Tama', 'OfficeBoy', 'delta', '123')
medika.addPatient('1', 'Eko Kota', 'Gejala Tipus, Muntaber')
runner()
// console.log(medika.previlage())
