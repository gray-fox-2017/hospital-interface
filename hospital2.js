'use strict'
const rls = require('readline-sync');
const Table = require('cli-table2');

class Hospital {
  constructor(datas) {
    this.nPatient = datas.npatient;
    this.nEmployee = datas.nemployee;
    this.name = datas.name;
    this._employees  = [];
    this._patients = [];
    this.init();
  }
  init(){
    this.addPatient({name:'poppy',pass:'123'});
    this.addPatient({name:'sari',pass:'123'});
    this.addEmployee({name:'meyer',position:'ob',pass:'123'});
    this.addEmployee({name:'miko',position:'admin',pass:'123'});
    this.addEmployee({name:'lycaa',position:'dokter',pass:'123'})
  }
  getIndex(position,id) {
    if (position === 'patient') return this._patients.findIndex((x)=> x.id.toString() === id);
    else return this._employees.findIndex((x)=> x.id.toString() === id);
    return -1;
  }
  showPatientDetail(id) {
    let idx = this.getIndex('patient',id.toString());
    let body = this._patients[idx];
    let table = new Table({
        head: ['ID','Nama','Diagnosa','Password'],
        style: { 'padding-left': 0, 'padding-right': 0, 'margin-top':0,'margin-bottom':0 }
    });
    table.push([body.id,body.name,body.diagnosis,body.pass]);
    console.log(table.toString());
  }

  showEmployeeDetail(id) {
    let idx = this.getIndex('employee',id.toString());
    // console.log(idx);
    let body = this._employees[idx];
    // console.log(body);
    let table = new Table({
        head: ['ID','Nama','Position','Password'],
        style: { 'padding-left': 0, 'padding-right': 0, 'margin-top':0,'margin-bottom':0 }
    });
    table.push([body.id,body.name,body.position,body.pass]);
    console.log(table.toString());
  }

  showAllPatients() {
    let table = new Table({
        head: ['ID','Nama','Diagnosa','Password'],
        style: { 'padding-left': 0, 'padding-right': 0, 'margin-top':0,'margin-bottom':0 }
    });
    let body = this._patients;
    body.forEach((x)=> table.push([x.id,x.name,x.diagnosis,x.pass]));
    console.log(table.toString());
  }

  showAllEmployees() {
    let table = new Table({
        head: ['ID','Nama','Position','Password'],
        style: { 'padding-left': 0, 'padding-right': 0, 'margin-top':0,'margin-bottom':0 }
    });
    let body = this._employees;
    body.forEach((x)=> table.push([x.id,x.name,x.position,x.pass]));
    console.log(table.toString());
  }

  removeEmployee(idx){
    this._employees.splice(idx,1);
  }

  removePatient(idx) {
    this._patients.splice(idx,1);
  }

  removeRecord(idx) {
    this._patients[idx].diagnosis = '';
  }

  editRecord(idx,nr) {
    this._patients[idx]['diagnosis'] = nr;
  }

  addEmployee(datas) {
    let id = this.generateId('employee');
    datas.id = id;
    let ne = new Employee(datas);
    this._employees.push(ne);
  }

  addPatient(datas) {
    let id = this.generateId('patient');
    datas.id = id;
    let np = new Patient(datas);
    this._patients.push(np);
  }

  generateId(position) {
    let id;
    let len;
    if (position === 'patient') {
      len = this._patients.length
      id = (len > 0 ? parseInt(this._patients[len-1].id)+1 : 1);
    } else {
      len = this._employees.length
      id = (len > 0 ? parseInt(this._employees[len-1].id)+1 : 1);
    }

    return id;
  }

  allowedToAdd(position) {
    if (position === 'patient') return (this.nPatient > this._patients.length);
    else return (this.nEmployee > this._employees.length);
  }
}



class StartHospital {
  constructor (datas) {
    this.h = new Hospital(datas);
    this.user = null;
    this.menus = null;
    this.loginView();
  }

  loginView() {
    console.log(`Welcome to ${this.h.name}`);
    console.log('--------------------');
    this.user = this.doLogin();
    let strwelcome = `HI, ${this.user.name}! Your access level is `+(this.user.category === 'patient'? 'PATIENT': this.user.position.toUpperCase());
    console.log(strwelcome);
    this.showMenu();
  }

  doLogout() {
    this.user = null;
    this.menus = [];
    // this.loginView();
  }

  doLogin() {
    let user = '';
    let found;
    let pass = '';
    let data = [];

    //cek username
    while (user === '') {
      user = rls.question('Please enter your Username : ');
      found = this.h._patients.findIndex( (x) => x.name === user);
      if (found === -1) {
        found = this.h._employees.findIndex((x) => x.name === user);
        if (found === -1) {
          console.log('Invalid Username');
          user = '';
        }
        data = this.h._employees[found];
      } else {
        data = this.h._patients[found];
      }
    }
    //cek password
    while (pass === '') {
      pass = rls.question('Please enter your Password : ', {
        hideEchoBack: true // The typed text on screen is hidden by `*` (default).
      });
      if (pass !== data.pass) {
        pass = '';
        console.log('Wrong Password');
      }
    }
    //set menu
    let menu = MENU[data.category];
    if (data.category === 'employee')
      menu = menu[data.position];
    this.menus = menu;

    return data;
  }

  inputMenu() {
    let mn = '';
    while (mn === '') {
      mn = rls.question('Choose Option: ');
      if (this.user.category === 'patient') {
        switch (mn) {
          case '1' : this.h.showPatientDetail(this.user.id); break;
          case '2' : this.doLogout(); break;
          default: console.log('Invalid Option'); mn = ''; break;
        }
      } else {
        switch (this.user.position) {
          case 'ob' :
            {
              switch (mn){
                case '1' : this.h.showEmployeeDetail(this.user.id); break;
                case '2' : this.doLogout(); break;
                default: console.log('Invalid Option'); mn = ''; break;
              }
            }; break;
          case 'admin' :
            {
              switch (mn){
                case '1' : this.h.showAllPatients(); break;
                case '2' : this.h.showAllEmployees(); break;
                case '3' : this.addPatient(); break;
                case '4' : this.removePatient(); break;
                case '5' : this.addEmployee(); break;
                case '6' : this.removeEmployee(); break;
                case '7' : this.h.showEmployeeDetail(this.user.id); break;
                case '8' : this.doLogout(); break;
                default: console.log('Invalid Option'); mn = ''; break;
              }
            };break;
          case 'dokter' :
            {
              switch (mn){
                case '1' : this.h.showAllPatients(); break;
                case '2' : this.showPatientDetail();break;
                case '3' : this.editRecord();break;
                case '4' : this.removeRecord();break;
                case '5' : this.h.showEmployeeDetail(this.user.id); break;
                case '6' : this.doLogout(); break;
                default: console.log('Invalid Option'); mn = ''; break;
              }
            }
            break;
        }
      }


    }
    if(this.user !== null) this.showMenu();
    else this.loginView();
  }

  showMenu() {
    console.log('Menu');
    this.menus.forEach((x) => {console.log(x);} );
    this.inputMenu();
  }

  showPatientDetail() {
    let id = '';
    let idx = '';
    while (id === '') {
      id = rls.question('Masukan id pasien').trim();
      idx = this.h.getIndex('patient',id.toString());
      if ( idx === -1) {
        console.log('ID Pasien tidak terdaftar!');
        id = '';
      }
    }
    this.h.showPatientDetail(id);
  }

  showEmployeeDetail() {
    let id = '';
    let idx = '';
    while (id === '') {
      id = rls.question('Masukan id karyawan').trim();
      idx = this.h.getIndex('employee',id);
      if ( idx === -1) {
        console.log('ID Karyawan tidak terdaftar!');
        id = '';
      }
    }
    this.h.showEmployeeDetail(id);
  }

  editRecord() {
    let id = '';
    let idx = '';
    let nr = '';
    while (id === '') {
      id = rls.question('Masukan id pasien : ').trim();
      idx = this.h.getIndex('patient',id.toString());
      if ( idx === -1) {
        console.log('ID Pasien tidak terdaftar!');
        id = '';
      }
    }

    while (nr === '') {
      nr = rls.question('Masukan record pasien : ').trim();
    }

    this.h.editRecord(idx,nr);
  }

  removeRecord() {
    let id = '';
    let idx = '';
    while (id === '') {
      id = rls.question('Masukan id pasien').trim();
      idx = this.h.getIndex('patient',id.toString());
      if ( idx === -1) {
        console.log('ID Pasien tidak terdaftar!');
        id = '';
      }
    }

    this.h.removeRecord(idx);
  }

  addPatient() {
    let allow = this.h.allowedToAdd('patient');
    let id;
    let name = '';
    let pass = '';
    if (allow) {
      while (name === '') {
        name = rls.question('Masukan nama pasien : ').trim();
      }
      while (pass === '') {
        pass = rls.question('Masukan password : ',{hideEchoBack:true}).trim();
      }
      id = this.h.generateId('patient');
      this.h.addPatient({name:name,pass:pass,id:id});

      console.log('Berhasil menambahkan pasien');
      this.h.showAllPatients();
    } else
      console.log('Tidak dapat menambahkan pasien, rumah sakit penuh!');


  }

  removePatient() {
    let id = '';
    let idx;
    while (id === '') {
      id = rls.question('Masukan id pasien : ').trim();
      idx = this.h._patients.findIndex((x)=> x.id.toString() === id);
      if ( idx === -1) {
        console.log('ID Pasien tidak terdaftar!');
        id = '';
      }
    }
    this.h.removePatient(idx);
    console.log('Berhasil menghapus pasien');
    this.h.showAllPatients();
  }

  addEmployee() {
    let allow = this.h.allowedToAdd('employee');
    let id;
    let name = '';
    let pass = '';
    let position = '';
    if (allow) {
      while (name === '') {
        name = rls.question('Masukan nama pegawai : ').trim();
      }
      while (pass === '') {
        pass = rls.question('Masukan password : ',{hideEchoBack:true}).trim();
      }
      while (position === '' || (position !== 'dokter' && position !== 'admin' && position !== 'ob')) {
        position = rls.question('Masukan position [dokter|ob|admin]: ').trim();
      }
      id = this.h.generateId('employee');
      this.h.addEmployee({name:name,pass:pass,id:id,position:position});

      this.h.showAllEmployees();
      console.log('Berhasil menambahkan pegawai');
    } else
      console.log('Tidak dapat menambahkan pegawai, rumah sakit penuh!');
  }

  removeEmployee() {
    let id = '';
    let idx;
    while (id === '') {
      id = rls.question('Masukan id pegawai : ').trim();
      idx = this.h._employees.findIndex((x)=> x.id.toString() === id);
      if ( idx === -1) {
        console.log('ID Pegawai tidak terdaftar!');
        id = '';
      }
    }
    this.h.removeEmployee(idx);
    console.log('Berhasil menghapus pegawai');
    this.h.showAllEmployees();
  }

  reset_board(){
    console.log("\x1B[2J")
  }

}


let mnPat = ['1. Lihat Data Pasien', '2. Logout'];
let mnOB = ['1. Lihat Data Saya', '2. Logout'];
let mnAdm = ['1. Lihat List Pasien', '2. Lihat List Pegawai', '3. Tambah Pasien', '4. Hapus Pasien','5. Tambah Pegawai', '6. Hapus Pegawai','7. Lihat Data Saya' ,'8. Logout'];
let mnDoc = ['1. Lihat List Pasien', '2. Lihat Record Pasien', '3. Ubah Record Pasien','4. Hapus Record Pasien' ,'5. Lihat Data Saya','6. Logout'];
let mnEmp = {admin : mnAdm, ob : mnOB, dokter : mnDoc};
const MENU = {patient : mnPat, employee : mnEmp};


let start = new StartHospital({name:'Rumah Sakit Mistis',nemployee:5,npatient:5});




