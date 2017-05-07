const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output:process.stdout
})

class Hospital {
  constructor(name, location) {
    this.name = name
    // this.employees = employees
    // this.patients = patients
    this.location = location
    this.dataPatients = []
    this.User = []
    this.dataEmployees = []
  }
  
  // addPatientSeeder(){
  //   this.dataPatients.push(this.patients)
  //   console.log(this.dataPatients)
  // }
  // 
  // addEmployeeSeeder(){
  //   this.dataEmployees.push(this.employees)
  //   console.log(this.dataEmployees)
  // }
  
  addPatient(data){
    if(data !== undefined){
      this.dataPatients.push(data)
    }
    else{
      rl.question('\nPlease input <ID>, <Name>, <Diagnosis> (ex: 1,Ronald,Stress salah masuk tempat kursus) => '
      ,(answer) =>{
        let a = answer.split(',')
        this.addPatient(new Patient(a[0],a[1],a[2]))
        this.clean()
        console.log(`============ New Patient Data ============ `)
        console.log(`\nAdded!\n\nID:${a[0]}\nName:${a[1]}\nDiagnosis:${a[2]}\n`)
        this.back()
      })       
      }
    }
  
  addEmployee(data){
    if(data !== undefined){
      this.dataEmployees.push(data)
    }
    else{
      rl.question('\nPlease input <Name>, <Position>, <Username>, <Password> (ex: tole, office boy, telor, toletelorbulet) => '
      ,(answer) =>{
        let a = answer.split(',')
        this.addEmployee(new Employee(a[0],a[1],a[2],a[3]))
        this.clean()
        console.log(`============ New Employee Data ============ `)
        console.log(`\nAdded!\n\nName:${a[0]}\nPosition:${a[1]}\nUsername:${a[2]}\nPassword:${a[3]}`)
        this.back()
        })
      }
    }
  
  welcome(user){
    this.clean()
    console.log(`Welcome ${user[0]} your Access level is ${user[2]}`)
    this.menu(user[2])
  }
  
  menu(user){
    console.log('=============== Please Input the Menu Number ===============')
    switch(user){
      case 'Admin' : console.log(' 1> Logout\n 2> List_Patients\n 3> View_Records <patient id>\n 4> Add_Patient\n 5> Remove_Patient <patient id>\n 6> Add_Employee\n 7> List_Employees\n 8> Remove Employee <employee_name>');break
      case 'Doctor': console.log(' 1> Logout\n 2> List_Patients\n 3> View_Records <patient id>\n 4> Add_Patient\n 5> Remove_Patient <patient id>');break
      case 'Patient': console.log(' 1> Logout\n 2> List_Patients\n 3> View_Records <patient id>');break
      case 'Office Boy': console.log(' 1> Logout');break
      default: console.log('1> Logout');break
    }
    this.command()
  }
  
  command(){
    rl.question('\nPlease input your command here => ', (answer)=>{
      switch(answer.split(' ')[0]){
        case '1': this.User = [];this.clean();this.Start();break
        case '2': this.listPatients();this.back();break
        case '3': this.viewRecords(answer.split(' ')[1]);break
        case '4': this.addPatient();break
        case '5': this.removePatient(answer.split(' ')[1]);break
        case '6': this.addEmployee();break
        case '7': this.listEmployees(); this.back();break
        case '8': this.removeEmployee(answer.split(' ')[1]);break
      }
    })
  }
  
  viewRecords(patient_id) {
      this.dataPatients.forEach((data) => {
        if(data.id.toString() === patient_id){
          console.log(`Patient records, Name : ${data.name}\n-----------------------------------------`);
          // if (data.records === null || data.records === undefined){
          //   console.log("Please input the patient records first")
          //   this.back()
          // }
          // else {
            console.log(`ID: ${data.id}\nName: ${data.name}\nDiagnosis: ${data.diagnosis}`);
          // }
          this.back()
        }
      })
  }
  
  removePatient(id){
    for(let i = 0; i < this.dataPatients.length;i++){
      if(this.dataPatients[i].id === id){
        console.log(`${this.dataPatients[i].name} has been removed!`)
        this.dataPatients.splice(i,1)
        this.back()
        }
      }
    for(let j = 0; j < this.dataPatients.length;j++){
      if(this.dataPatients[j].id !== id){
        console.log(`Invalid ID`)
        this.back()
      }
    }
  }
  
  removeEmployee(name){
    for(let i =0; i < this.dataEmployees.length;i++){
      if(this.dataEmployees[i].name === name){
        console.log(`${this.dataEmployees[i].name} has been fired!`)
        this.dataEmployees.splice(i,1)
        this.back()
      }
    }
    for(let j = 0; j < this.dataEmployees.length;j++){
      if(this.dataEmployees[j].name !== name){
        console.log(`There is no Employee name ${name}`)
        this.back()
      }
    }    
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
  
  listPatients(){
      this.clean()
      console.log('Patient List\n ================\n ID | Patient Name | Diagnosis')
      let id = 0
      this.dataPatients.forEach((data)=>{
        id++
        console.log(`${id} | ${data.name} | ${data.diagnosis}`)
      })
  }
  
  listEmployees(){
    this.clean()
    console.log('Employee List\n ===================\n NO | Employee Name | Position')
    let no = 0
    this.dataEmployees.forEach((data)=>{
    no++
    console.log(`${no} | ${data.name} | ${data.position}`)  
    })
  }
  
  Start(){
    // let newPatient = new Patient
  //  console.log(this.dataPatients[0].id)
    console.log(`============ Welcome to ${this.name} Hospital ============\n ${this.location}`)
    rl.question('\nLogin as [1]Patient [2]Employee ', (answer)=>{
      if(answer === '1'){
        this.patientLogin()
      }
      if(answer === '2'){
        this.employeeLogin()
      }
      else{
        this.clean()
        console.log('you must choose 1 or 2!')
        this.Start()
      }
    })
  }
  
  patientLogin(){
  this.clean()
  rl.question('>Please enter your patient name here => ', (answer)=>{
      this.dataPatients.forEach((data)=>{
        if(data.name === answer){
          this.User.push(answer,' ','Patient')
          this.welcome(this.User)
        }
        else{
          console.log(`theres no patient name ${answer}`)
          this.Start()
        }
      })
    }) 
  }
  
  employeeLogin(){
    this.clean()
    rl.question('>Please enter your username => ', (answer)=>{
        this.dataEmployees.forEach((data)=>{
          if(data.username === answer){
            this.User.push(data.name,data.password,data.position)
            this.password()
            }
          })
          if(!this.User){
            this.clean()
            console.log('invalid username')
            this.employeeLogin()
          }
        })       
      }
    
  password(){
    this.clean()
    rl.question('>Please enter your password =>', (answer)=>{
        if(answer === this.User[1]){
          this.welcome(this.User)
        }
        else{
          console.log('Invalid Password')
          this.password()
        }
    })
  }
  
  clean() {
    console.log("\x1B[2J")
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

let newHospital = new Hospital('Stress','\nJl. Sultan Iskandar Muda No.7, RT.5/RW.9, \nKby. Lama Sel., Kby. Lama, Kota Jakarta Selatan,\n')
newHospital.addPatient(new Patient(1,'Dery','sekarat'))
newHospital.addEmployee(new Employee('Stedy','Admin','stedy','stedy'))
newHospital.addEmployee(new Employee('James','Doctor','james','james'))
newHospital.addEmployee(new Employee('Parel','Office Boy','parel','parel'))
// newHospital.addEmployeeSeeder()
// newHospital.addPatientSeeder()
newHospital.Start()