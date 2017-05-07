const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  //prompt: "WELCOME!"
})

class Hospital {
  constructor(name, location) {
    this.name = name
    this.employees = []
    this.patients = []
    this.location = location
  }
  /*---------------EMPLOYEES------------------*/
  List_employees() {
    if (this.employees.length > 0) {
      console.log('=============================================================');
      console.log('Employee`s List:');
      for (var i = 0; i < this.employees.length; i++) {
        console.log(`\n Employee's Name: ${this.employees[i].name},
                     \n Employee's position: ${this.employees[i].position},
                     \n Employee's username: ${this.employees[i].username},
                     \n Employee's password: ******** `);
      }
      console.log('=============================================================');
    } else {
      console.log('=============================================================');
      console.log('There is no employee on the list...');
      console.log('=============================================================');
    }
  }
  Add_employees(name, position, username, password) {
    this.employees.push(new Employee(name, position, username, password))
    console.log('=============================================================');
    console.log('Add employee to the list...');
    console.log('=============================================================');
  }
  Delete_employees(name) {
    if (this.employees.length > 0) {
      for (var i = 0; i < this.employees.length; i++) {
        if (name === this.employees[i].name) {
          this.employees.splice(i, 1)
          console.log('=============================================================');
          console.log('Delete Employee from the list...');
          console.log('=============================================================');
          break;
        }
      }
    } else {
      console.log('=============================================================');
      console.log('There is no employee on the list...');
      console.log('=============================================================');
    }
  }

  /*---------------PATIENTS------------------*/
  List_patient() {
    if (this.patients.length > 0) {
      console.log('=============================================================');
      console.log('Patient`s List:');
      for (var i = 0; i < this.patients.length; i++) {
        console.log(`\n Patient's Id: ${this.patients[i].id},
                     \n Patient's Name: ${this.patients[i].name},
                     \n Patient's Diagnose: ${this.patients[i].diagnose}`);
      }
      console.log('=============================================================');
    } else {
      console.log('=============================================================');
      console.log('There is no Patient on the list...');
      console.log('=============================================================');
    }
  }
  Add_patient(id, name, diagnosis) {
    this.patients.push(new Patient(id, name, diagnosis))
    console.log('=============================================================');
    console.log('Add patients to the list...');
    console.log('=============================================================');
  }
  Delete_patient(id) {
    if (this.patients.length > 0) {
      for (var i = 0; i < this.patients.length; i++) {
        if (Number(id) === this.patients[i].id) {
          console.log('=============================================================');
          console.log('Delete patients from the list...');
          console.log('=============================================================');
          break;
        }
      }
    } else {
      console.log('=============================================================');
      console.log('There is no patients on the list...');
      console.log('=============================================================');
    }
  }


  //menu
  Menu_doctor() {
    console.log('=============================================================');
    console.log('What would you like to do?');
    console.log('\nOptions:\n');
    console.log('[1] list patients');
    console.log('[2] add patients <patient_name> <patient_diagnose>');
    console.log('[3] remove patients <patient_id>');
    console.log('[4] exit');
    console.log('=============================================================');
  }

  Menu_admin() {
    console.log('=============================================================');
    console.log('What would you like to do?');
    console.log('\nOptions:\n');
    console.log('[1] list employees');
    console.log('[2] add employees <employee_name> <employee_position> <employee_username> <employee_password>');
    console.log('[3] remove employees <employee_name>');
    console.log('[4] exit');
    console.log('=============================================================');
  }

  Menu_OB() {
    console.log('=============================================================');
    console.log('What would you like to do?');
    console.log('\nOptions:\n');
    console.log('[1] exit');
    console.log('=============================================================');
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


//Controller
let hospital = new Hospital('Hayati','Jln.Kaliurang KM 5 Yogyakarta')
let Doctor = new Employee('Dr.dr-an','Doctor','dran','123')
let Admin = new Employee('Admin','Admin','Admin','Admin')
let ob = new Employee('Joko','OB','MrJoko','joko123')
let identity = []
let Arr_patients = []
let Arr_employees = []
let count = 0


rl.setPrompt(`\n===================================================
              \n Welcome to ${hospital.name} Hospital
              \n ${hospital.location}
              \n===================================================
              \nPlease enter your username:`);
rl.prompt();

rl.on('line', (answer) =>{
  if (answer == 'dran' || answer == 'Admin' || answer == 'MrJoko') {
    identity.push(answer)
  }
  if(identity[0] === 'dran' || identity[0] == 'Admin' || identity[0] == 'MrJoko') {
    if (count == 0) {
      count = 1
      rl.setPrompt(`Please Enter Your Password:`)
    } else if (identity[0] === Doctor.username && answer === Doctor.password && count == 1) {
      count = 2
      console.log('===================================================');
      console.log(`Welcome, ${Doctor.name}. Your access level is: ${Doctor.position}`);
      hospital.Menu_doctor()
      console.log('===================================================');
      rl.setPrompt('Please enter number of option: ');
    } else if (identity[0] === Admin.username && answer === Admin.password && count == 1) {
      count = 2
      console.log('===================================================');
      console.log(`Welcome, ${Admin.name}. Your access level is: ${Admin.position}`);
      hospital.Menu_admin()
      console.log('===================================================');
      rl.setPrompt('Please enter number of option: ');
    } else if (identity[0] === ob.username && answer === ob.password && count == 1) {
      count = 2
      console.log('===================================================');
      console.log(`Welcome, ${ob.name}. Your access level is: ${ob.position}`);
      hospital.Menu_OB()
      console.log('===================================================');
      rl.setPrompt('Please enter number of option: ');
    } else if (identity[0] === Doctor.username) {
        if (count === 2) {
          switch (answer) {
            case '1':
              hospital.List_patient();
              hospital.Menu_doctor();
              rl.setPrompt('Please enter number of option: ');
              break;
            case '2':
              count = 3;
              console.log('===================================================');
              rl.setPrompt('Patient Name: ');
              break;
            case '3':
              count = 5;
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
        else if (count === 3) {
          count = 4;
          Arr_patients.push(answer);
          rl.setPrompt('Patient Diagnose: ');
        }
        else if (count === 4) {
          count = 2;
          Arr_patients.push(answer);
          hospital.Add_patient((hospital.patients.length + 1), Arr_patients[0], Arr_patients[1]);
          hospital.Menu_doctor();
          rl.setPrompt('Please enter number of option: ');
          Arr_patients.splice(0, 2);
        }
        else if (count === 5) {
          count = 2;
          hospital.Delete_patient(answer);
          hospital.Menu_doctor();
          rl.setPrompt('Please enter number of option: ');
        }
      } else if (identity[0] === Admin.username) {
      if (count === 2) {
        switch (answer) {
          case '1':hospital.List_employees()
                   hospital.Menu_admin()
                   rl.setPrompt('Please Enter Number of Option: ')
            break;
          case '2':count = 3
                   console.log('=================================================');
                   rl.setPrompt('Employee Name: ')
            break;
          case '3':count = 7
                   console. log('=================================================');
                   rl.setPrompt('Employee Name: ')
            break;
          case '4':console.log('Have a Nice Day!');
                   process.exit(0)
            break;
          default:console.log('Please Input Correct Number');
            break;
        }
      } else if (count == 3) {
        count = 4
        Arr_employees.push(answer)
        rl.setPrompt('Employee Position :')
      } else if (count == 4) {
        count = 5
        Arr_employees.push(answer)
        rl.setPrompt('Employee username :')
      } else if (count == 5) {
        count = 6
        Arr_employees.push(answer)
        rl.setPrompt('Employee Password :')
      } else if (count == 6) {
        count = 2
        Arr_employees.push(answer)
        hospital.Add_employees(Arr_employees[0], Arr_employees[1], Arr_employees[2], Arr_employees[3])
        hospital.Menu_admin()
        rl.setPrompt('Please enter Number of Option: ')
        Arr_employees.splice(0, 4)
      } else if (count == 7) {
        count = 2
        hospital.Delete_employees(answer)
        hospital.Menu_admin()
        rl.setPrompt('Please enter Number of Option: ')
      }
    } else if (identity[0] === ob.username) {
        if (count === 2) {
          switch (answer) {
            case '1':console.log('Have a Nice Day!');
                     process.exit(0)
              break;
            default:console.log('Please Input Correct Number');
          }
        }
      }
      rl.prompt()
  } else {
    rl.setPrompt(`Please Enter Your username:\n`)
    rl.prompt()
  }
}).on('exit', () => {
  console.log('Have A Nice Day!');
  process.exit(0)
})