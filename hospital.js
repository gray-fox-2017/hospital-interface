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
    // this.patients = patients
    this.location = location
  }

  addEmployees(object){
    return this.employees.push(object)
  }

  login(){
    rl.question('Please enter your username: ', (answer) => {
      let loginFlag = false
      for(let i=0; i<this.employees.length; i++){
        if(this.employees[i]._username==answer){
          loginFlag = true
          this.user.push(this.employees[i])
          console.log(this.user)
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

  password(){
    rl.question('Please enter your password: ', (answer) => {
      if(this.user[0]._password==answer){
        console.log('===========================================')
        console.log('sampe sini dulu')
      } else {
        console.log('===========================================')
        console.log(this.user)
        this.password()
      }
    })
  }

  // welcome(){
  //   console.log(`Welcome ${this.employees.}`)
  // }
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

// function readline(message) {
//   const readline = require('readline');
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.setPrompt(message);
//   rl.prompt();
//
//   rl.on('line', (line) => {
//     return line
//   }).on('close', ()=> {
//     console.log('Have a great day!');
//     process.exit(0);
//   })
// }

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
// medika.addEmployees(new Employee('Carli Lima', 'Pasien', 'carli', '123'))
runner()
// console.log(medika.login('betas'))
