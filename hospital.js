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

  removeEmployee(index) {
    this._employeeList.splice(index, 1);
  }

  addPatient(id, name, diagnosis) {
    this._patientList.push(new Patient(id, name, diagnosis));

    this.patients = this._patientList.length;
  }

  removePatient(index) {
    this._patientList.splice(index, 1);
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
    this.separator = "========================================"
    this.db = rumahSakit;

    this.login();
  }

  login() {
    console.log(`Welcome to ${this.db.name}`)
    console.log(this.separator)
    console.log(`Please enter your username:`)
    this.userInput();
  }

  userInput() {
    const r1 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.user = r1.on('line', (input) => {
      for(let i = 0; i < this.db._employeeList.length; i++) {
        if(input == this.db._employeeList[i].username) {
          console.log(`Please enter your password:`)
          return this.passInput(i);
        }
      }
      console.log(`Not a valid username, enter another one`);
    });
  }

  passInput(index) {
    this.user.close();
    const r2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.pass = r2.on('line', (input1) => {
      // this.user.pause();
      if(input1 == this.db._employeeList[index].password) {
        return this.welcomeScreen(index);
      }
      console.log(`Wrong password`)
    });
  }

  welcomeScreen(index) {
    console.log("\x1B[2J")
    console.log(this.separator);
    console.log(`Welcome, ${this.db._employeeList[index].name}. Your access level is ${this.db._employeeList[index].authorization}.`)
    console.log(this.separator);
    this.mainMenu(index);
  }

  mainMenu(index) {
    this.pass.close()
    const r3 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
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
    this.interact = r3.on('line', (input) => {
      return this.interaction(index, input);
    })
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
    this.interact.close();
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
    this.interact.close();
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
    this.interact.close();
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
    this.interact.close();
    console.log(this.db._patientList)
    this.resumeMainMenu(index)
  }

  employeeList(index) {
    this.interact.close();
    console.log(this.db._employeeList)
    this.resumeMainMenu(index)
  }

  addingPatient(index) {
    this.interact.close();
    let arr = [];
    const r6 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log('Enter patient ID: ')
    this.patientData = r6.on('line', (input) => {
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
    this.interact.close();
    const r6 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log('Enter patient index: ')
    this.patientRemove = r6.on('line', (input) => {
      this.patientRemove.close();
      this.db.removePatient(Number(input));
      this.patientList(index);
    })
  }

  addingEmployee(index) {
    this.interact.close();
    let arr = [];
    const r6 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log('Enter employee name: ')
    this.employeeData = r6.on('line', (input) => {
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
    this.interact.close();
    const r6 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log('Enter employee index: ')
    this.employeeRemove = r6.on('line', (input) => {
      this.employeeRemove.close();
      this.db.removeEmployee(Number(input));
      this.employeeList(index);
    })
  }

  resumeMainMenu(index) {
    console.log(this.separator);
    console.log(`Press enter to continue`)
    const r5 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.resumeMenu = r5.on('line', (input) => {
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



let jalankan = new Execute(hospital);
// console.log(jalankan)

