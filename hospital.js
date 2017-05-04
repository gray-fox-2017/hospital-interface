//use readline to fix this challenge
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Hospital {
    constructor(name, location) {
        this.name = name;
        this.location = location;
        this.dataPatient = [];
        this.dataEmployee = new Employee("Angga","Admin","Angga","1234");
    }

    welcome() {
        var nameRumahSakit = this.name;
        var addrRumahSakit = this.location;
        var garisGambar = "===========================";
        console.log(nameRumahSakit);
        console.log(addrRumahSakit);
        console.log(garisGambar);
        //Tanya Username nya
        rl.question("Please input your Username :",(Username) =>{
          if(Username === ES["username"]){
            //Sudah Masuk
            this.InputPassword();
          }
          else{
            this.Reset();
            console.log("Username Salah");
            console.log("\n");
            this.welcome();
          }
            }
        );
    }

    Reset(){
      console.log("\x1B[2J");
    }

    WelcomeUser(){
      return `Welcome, ${ES["name"]}. Your access level is : ${ES["position"]}`;
    }

    InputPassword(){
        //Tanya Password nya
        rl.question("Please Input your Password :",(Password) => {
                if(Password === ES["password"]){
                  //Sudah Masuk
                    switch (ES["position"]){
                        case "Admin" :
                          console.log("This Name");
                          break;
                        case "Patient" :
                          break;
                        case "Doktor" :
                          break;
                        case "Office Boy":
                          break;``
                    }

                }
                else{
                    this.Reset();
                    console.log("Password Salah, Tolong coba lagi !");
                    this.InputPassword();
                }
            }
        );
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

const Rs = new Hospital("Welcome Rumah Sakit Berkah","Jalan Ahamad yani no 21");

Rs.welcome();