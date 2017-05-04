class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location

    this._employeeList = [];
    this._patientList = [];
  }

  addEmployee(name, position, username, password) {
    if(this._employeeList.length <= this.employees) {
      this._employeeList.push(new Employee(name, position, username, password));
    }
  }

  removeEmployee(employeeUsername) {
    for(let i = 0; i < this._employeeList.length; i++) {
      if(employeeUsername == this._employeeList[i].username) {
        this._employeeList.splice(i, 1);
        return console.log("Employee data deleted!")
      }
    }
    return console.log("Employee data not available!")
  }

  addPatient(id, name, diagnosis) {
    this._patientList.push(new Patient(id, name, diagnosis));

    this.patients = this._patientList.length;
  }

  removePatient(patientID) {
    for(let i = 0; i < this._patientList.length; i++) {
      if(patientID == this._patientList[i].id) {
        this._patientList.splice(i, 1);
        return console.log("Patient data deleted!")
      }
    }
    return console.log("Patient data not available!")
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
    this.authorization = "basic";
    switch (this.position) {
      case "Admin":
        this.authorization = "full";
        break;
      case "Dokter":
      case "Resepsionis":
        this.authorization = "limited";
        break;
    }
  }
}

class Execute {
  constructor(rumahSakit) {
    this.db = rumahSakit;
    this.separator = "====================================================="

    this.login();
  }

  login() {
    console.log(`Welcome to ${this.db.name}`)
    console.log(this.separator)
    this.userInput();
  }

  userInput() {
    this.user = readlineSync.question('Enter your username: \n');
    for(let i = 0; i < this.db._employeeList.length; i++) {
      if(this.user == this.db._employeeList[i].username) {
        return this.passInput(i);
      }
    }
    return this.userInput();
  }

  passInput(index) {
    this.pass = readlineSync.question('Enter your password: \n', {
      hideEchoBack: true
    });
    if(this.pass == this.db._employeeList[index].password) {
      return this.welcomeScreen(index);
    } else {
      console.log('Wrong password')
      return this.passInput(index);
    }
  }

  welcomeScreen(index) {
    console.log("\x1B[2J")
    console.log(this.separator);
    console.log(`Welcome, ${this.db._employeeList[index].name}. Your access level is ${this.db._employeeList[index].authorization}.`)
    console.log(this.separator);
    this.mainMenu(index);
  }

  mainMenu(index) {
    console.log(`What would you like to do?`)
    console.log(`[1] Logout`)
    switch (this.db._employeeList[index].authorization) {
      case "full":
        console.log(`[2] List employee`)
        console.log(`[3] Add employee`)
        console.log(`[4] Remove employee`)
        console.log(`[5] List patients`)
        console.log(`[6] Add records`)
        console.log(`[7] Remove records`)
        break;
      case "limited":
      console.log(`[2] List patients`)
      console.log(`[3] Add records`)
      console.log(`[4] Remove records`)
        break;
    }
    this.interact = readlineSync.question('Choose your option \n');
    return this.interaction(index, this.interact)
  }

  interaction(index, input) {
    console.log("\x1B[2J")
    switch (this.db._employeeList[index].authorization) {
      case "full":
        this.fullInteraction(index, input);
        break;
      case "limited":
        this.limitedInteraction(index, input);
        break;
      default:
        this.basicInteraction(index, input);
      }
  }

  basicInteraction(index, input) {
    switch (input) {
      case "1":
        this.login();
        break;
      default:
        console.log(`Invalid option`);
        this.mainMenu(index);
    }
  }

  limitedInteraction(index, input) {
    switch (input) {
      case "1":
        return this.login();
        break;
      case "2":
        return this.patientList(index)
        break;
      case "3":
        return this.addingPatient(index)
        break;
      case "4":
        return this.removingPatient(index)
        break;
      default:
        console.log(`Invalid option`);
        return this.mainMenu(index);
    }
    return this.mainMenu(index);
  }

  fullInteraction(index, input) {
    switch (input) {
      case "1":
        return this.login();
        break;
      case "2":
        return this.employeeList(index);
        break;
      case "3":
        return this.addingEmployee(index);
        break;
      case "4":
        return this.removingEmployee(index);
        break;
      case "5":
        return this.patientList(index)
        break;
      case "6":
        return this.addingPatient(index)
        break;
      case "7":
        return this.removingPatient(index)
        break;
      default:
        console.log(`Invalid option`);
        return this.mainMenu(index);
    }
    return this.mainMenu(index);
  }

  patientList(index) {
    console.log(this.db._patientList);
    this.resumeMainMenu(index);
  }

  employeeList(index) {
    console.log(this.db._employeeList);
    this.resumeMainMenu(index);
  }

  addingPatient(index) {
    let arr = [];
    const r2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log('Enter patient ID: ')
    this.patientData = r2.on('line', (input) => {
      arr.push(input);
      if(arr.length == 1) console.log('Enter patient name: ')
      if(arr.length == 2) console.log('Enter patient diagnosis: ')
      if(arr.length == 3) {
        this.patientData.close();
        this.db.addPatient(arr[0], arr[1], arr[2]);
        this.patientList(index);
      }
    })
  }

  removingPatient(index) {
    this.patientID = readlineSync.question('Select patient ID \n');
    this.db.removePatient(this.patientID)
    return this.patientList(index);
  }

  addingEmployee(index) {
    let arr = [];
    const r2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log('Enter employee name: ')
    this.employeeData = r2.on('line', (input) => {
      arr.push(input);
      if(arr.length == 1) console.log('Enter employee position: ')
      if(arr.length == 2) console.log('Enter employee username: ')
      if(arr.length == 3) console.log('Enter employee password: ')
      if(arr.length == 4) {
        this.employeeData.close();
        this.db.addEmployee(arr[0], arr[1], arr[2], arr[3]);
        this.resumeMainMenu(index)
      }
    })
  }

  removingEmployee(index) {
    this.employeeUser = readlineSync.question('Enter employee username \n');
    this.db.removeEmployee(this.employeeUser)
    return this.employeeList(index);
  }

  resumeMainMenu(index) {
    console.log(this.separator);
    console.log(`Press enter to continue`)
    const r1 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.resumeMenu = r1.on('line', (input) => {
      this.resumeMenu.close();
      this.mainMenu(index);
    })
  }
}

let hospital = new Hospital("Sehat Sentosa", "Dusun Maju Jaya", 6, 3)

hospital.addEmployee("Budi", "Admin", "budi", "123")
hospital.addEmployee("Susi", "Dokter", "susi", "123")
hospital.addEmployee("Wawan", "Resepsionis", "wawan", "123")
hospital.addEmployee("Desi", "Office Boy", "desi", "123")

hospital.addPatient("001", "Taufik", "pilek")

const readline = require('readline');
var readlineSync = require('readline-sync')

let program = new Execute(hospital);