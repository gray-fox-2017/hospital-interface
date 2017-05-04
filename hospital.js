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
    // this.patients = patients
    this.location = location
  }

  addEmployees(object){
    return this.employees.push(object)
  }

  addPatient(object){}

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
    // if(){
    //   this.user = []
    //   console.log(`You've been logged out`)
    //   return this.login()
    // }
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
    console.log(`Welcome ${this.user[0].name}! Your access level is: ${this.user[0].position}`)
    console.log('===========================================')
    console.log('What would you like to do?')
    this.previlage()
    this.chooseMenu()
  }

  previlage(){
    let num=1
    if(this.user[0].position == 'Admin'){
      for(let i=0; i<this.menuList().length; i++){
        this.menu.push(`[${num}] ${this.menuList()[i]}`)
        num++
      }
    }
    else if(this.user[0].position == 'Dokter' || this.user[0].position == 'Patient'){
      for(let i=4; i<this.menuList().length; i++){
        this.menu.push(`[${num}] ${this.menuList()[i]}`)
        num++
      }
    } else {
      for(let i=5; i<this.menuList().length; i++){
        this.menu.push(`[${num}] ${this.menuList()[i]}`)
        num++
      }
    }
  }

  chooseMenu(){
    console.log(this.menu.join('\n'))
    rl.question('Please enter option number: ', (answer) => {
      if(answer <= this.menu.length && /\d/.test(answer)){
        this.selectedMenu = answer
      } else {
        console.log('===========================================')
        console.log('What would you like to do?')
        console.log('please enter correct number')
        this.chooseMenu()
      }
    })
  }

  menuList(){
    let listOfMenu = [
      'Add Employee',
      'Add New Patient',
      'List Employees',
      'List Patients',
      'Medic Report',
      'Logout'
    ]
    return listOfMenu
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this._id = id
    this._name = name
    this._diagnosis = diagnosis
  }
  get id(){
    return this._id
  }
  get name(){
    return this._name
  }
  get diagnosis(){
    return this._diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this._username = username
    this._password = password
  }
  get username(){
    return this._username
  }
  get password(){
    return this._password
  }
}

function runner() {
  console.log(`Welcome to ${medika.name} Hospital`)
  console.log(medika.location)
  console.log('===========================================')
  medika.login()
}

let medika = new Hospital('Medika Center', 'Jl. Kebayoran Lama No.64, Jakarta')
medika.addEmployees(new Employee('Abdi Dia', 'Admin', 'abdi', '123'))
medika.addEmployees(new Employee('Beta Taro', 'Dokter', 'beta', '123'))
medika.addEmployees(new Employee('Delta Tama', 'OfficeBoy', 'delta', '123'))
runner()
// console.log(medika.previlage())
