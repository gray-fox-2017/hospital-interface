const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Model
class Hospital {
  constructor(name, location) {
    this.name = name
    this.employees = []
    this.patients = []
    this.location = location
  }
  patientList() {
    if (this.patients.length > 0) {
      console.log('===================================================');
      console.log('Patient(s) List:');
      for (let i = 0; i < this.patients.length; i++) {
        console.log(`\nId: ${this.patients[i].id}\nPatient Name: ${this.patients[i].name}\nPatient Diagnose: ${this.patients[i].diagnose}\n`);
      }
      console.log('===================================================');
    }
    else {
      console.log('===================================================');
      console.log('There is no patient on the list...');
      console.log('===================================================');
    }
  }
  employeeList() {
    if (this.employees.length > 0) {
      console.log('===================================================');
      console.log('Employee(s) List:');
      for (let i = 0; i < this.employees.length; i++) {
        console.log(`\nEmployee Name: ${this.employees[i].name}\nEmployee Position: ${this.employees[i].position}\nEmployee Username: ${this.employees[i].username}\nEmployee Password: *******\n`);
      }
      console.log('===================================================');
    }
    else {
      console.log('===================================================');
      console.log('There is no employee on the list...');
      console.log('===================================================');
    }
  }
  addPatient(id, name, diagnosis) {
    this.patients.push(new Patient(id, name, diagnosis));
    console.log('===================================================');
    console.log('Add patient to the list...');
    console.log('===================================================');
  }
  addEmployee(name, position, username, password) {
    this.employees.push(new Employee(name, position, username, password));
    console.log('===================================================');
    console.log('Add employee to the list...');
    console.log('===================================================');
  }
  deletePatient(id) {
    if (this.patients.length > 0) {
      for (let i = 0; i < this.patients.length; i++) {
        if (Number(id) === this.patients[i].id) {
          this.patients.splice(i, 1);
          console.log('===================================================');
          console.log('Delete patient from the list...');
          console.log('===================================================');
          break;
        }
      }
    }
    else {
      console.log('===================================================');
      console.log('There is no patient on the list...');
      console.log('===================================================');
    }
  }
  deleteEmployee(name) {
    if (this.employees.length > 0) {
      for (let i = 0; i < this.employees.length; i++) {
        if (name === this.employees[i].name) {
          this.employees.splice(i, 1);
          console.log('===================================================');
          console.log('Delete employee from the list...');
          console.log('===================================================');
          break;
        }
      }
    }
    else {
      console.log('===================================================');
      console.log('There is no employee on the list...');
      console.log('===================================================');
    }
  }
  menuDoctor() {
    console.log('What would you like to do?');
    console.log('\nOptions:\n');
    console.log('[1] list patients');
    console.log('[2] add patients <patient_name> <patient_diagnose>');
    console.log('[3] remove patients <patient_id>');
    console.log('[4] exit');
    console.log('===================================================');
  }
  menuAdmin() {
    console.log('What would you like to do?');
    console.log('\nOptions:\n');
    console.log('[1] list employees');
    console.log('[2] add employees <employee_name> <employee_position> <employee_username> <employee_password>');
    console.log('[3] remove employees <employee_name>');
    console.log('[4] exit');
    console.log('===================================================');
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnose = diagnosis
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

// Controller
let hospital = new Hospital ('Tumbuh Kembang', 'Depok');
let doctor = new Employee ('Dr.doctor', 'Doctor', 'doctor', 'doctor123');
let admin = new Employee ('Admin', 'Admin', 'admin', 'admin123');
let ob = new Employee ('anugerah', 'OB', 'ob123', 'ob123');
let identity = [];
let patientArr = [];
let employeeArr = [];
let stage = 0;

rl.setPrompt(`\n===================================================\n Welcome to ${hospital.name} Hospital\n Jln.Raya Bogor, Depok, 123456\n===================================================\n
  Please enter your username:\n`);
rl.prompt();

rl.on('line', (answer) => {
  if (answer === 'doctor' || answer === 'admin' || answer === 'ob123') {
    identity.push(answer);
  }
  if (identity[0] === 'doctor' || identity[0] === 'admin' || identity[0] === 'ob123' ) {
    if (stage === 0) {
      stage = 1;
      rl.setPrompt(`Please enter your password:\n`);
    }
    else if (identity[0] === doctor.username && answer === doctor.password && stage === 1) {
      stage = 2;
      console.log('===================================================');
      console.log(`Welcome, ${doctor.name}. Your access level is: ${doctor.position}`);
      console.log('===================================================');
      console.log('What would you like to do?');
      console.log('\nOptions:\n');
      console.log('[1] list patients');
      console.log('[2] add patients <patient_name> <patient_diagnose>');
      console.log('[3] remove patients <patient_id>');
      console.log('[4] exit');
      console.log('===================================================');
      rl.setPrompt('Please enter number of option: ');
    }
    else if (identity[0] === admin.username && answer === admin.password && stage === 1) {
      stage = 2;
      console.log('===================================================');
      console.log(`Welcome, ${admin.name}. Your access level is: ${admin.position}`);
      console.log('===================================================');
      console.log('What would you like to do?');
      console.log('\nOptions:\n');
      console.log('[1] list employees');
      console.log('[2] add employees <employee_name> <employee_position> <employee_username> <employee_password>');
      console.log('[3] remove employees <employee_name>');
      console.log('[4] exit');
      console.log('===================================================');
      rl.setPrompt('Please enter number of option: ');
    }
    ///////////////////////////////////////////////
    else if (identity[0] === ob.username && answer === ob.password && stage === 1) {
      stage = 2;
      console.log('===================================================');
      console.log(`Welcome, ${ob.name}. Your access level is: ${ob.position}`);
      console.log('===================================================');
      console.log('What would you like to do?');
      console.log('\nOptions:\n');
      console.log('[4] exit');
      console.log('===================================================');
      rl.setPrompt('Please enter number of option: ');
    }
    ///////////////////////////////
    else if (identity[0] === ob.username) {
      if (stage === 2) {
        switch (answer) {
          case '4':
            console.log('Have a great day!');
            process.exit(0);
            break;
          default:
            console.log("Please input correct number.");
            break;
        }
      }
    }
    //////////////////////////////
    else if (identity[0] === doctor.username) {
      if (stage === 2) {
        switch (answer) {
          case '1':
            hospital.patientList();
            hospital.menuDoctor();
            rl.setPrompt('Please enter number of option: ');
            break;
          case '2':
            stage = 3;
            console.log('===================================================');
            rl.setPrompt('Patient Name: ');
            break;
          case '3':
            stage = 5;
            console.log('===================================================');
            rl.setPrompt('Patient Id: ');
            break;
          case '4':
            console.log('Have a great day!');
            process.exit(0);
            break;
          default:
            console.log("Please input correct number.");
            break;
        }
      }
      else if (stage === 3) {
        stage = 4;
        patientArr.push(answer);
        rl.setPrompt('Patient Diagnose: ');
      }
      else if (stage === 4) {
        stage = 2;
        patientArr.push(answer);
        hospital.addPatient((hospital.patients.length + 1), patientArr[0], patientArr[1]);
        hospital.menuDoctor();
        rl.setPrompt('Please enter number of option: ');
        patientArr.splice(0, 2);
      }
      else if (stage === 5) {
        stage = 2;
        hospital.deletePatient(answer);
        hospital.menuDoctor();
        rl.setPrompt('Please enter number of option: ');
      }
    }
    else if (identity[0] === admin.username) {
      if (stage === 2) {
        switch (answer) {
          case '1':
            hospital.employeeList();
            hospital.menuAdmin();
            rl.setPrompt('Please enter number of option: ');
            break;
          case '2':
            stage = 3;
            console.log('===================================================');
            rl.setPrompt('Employee Name: ');
            break;
          case '3':
            stage = 7;
            console.log('===================================================');
            rl.setPrompt('Employee Name: ');
            break;
          case '4':
            console.log('Have a great day!');
            process.exit(0);
            break;
          default:
            console.log("Please input correct number.");
            break;
        }
      }
      else if (stage === 3) {
        stage = 4;
        employeeArr.push(answer);
        rl.setPrompt('Employee Position: ');
      }
      else if (stage === 4) {
        stage = 5;
        employeeArr.push(answer);
        rl.setPrompt('Employee Username: ');
      }
      else if (stage === 5) {
        stage = 6;
        employeeArr.push(answer);
        rl.setPrompt('Employee Password: ');
      }
      else if (stage === 6) {
        stage = 2;
        employeeArr.push(answer);
        hospital.addEmployee(employeeArr[0], employeeArr[1], employeeArr[2], employeeArr[3]);
        hospital.menuAdmin();
        rl.setPrompt('Please enter number of option: ');
        employeeArr.splice(0, 4);
      }
      else if (stage === 7) {
        stage = 2;
        hospital.deleteEmployee(answer);
        hospital.menuAdmin();
        rl.setPrompt('Please enter number of option: ');
      }
    }
    rl.prompt();
  }
  else {
    rl.setPrompt(`Please enter your username:\n`);
    rl.prompt();
  }
}).on('exit', () => {
  console.log('Have a great day!');
  process.exit(0);
});
