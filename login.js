let Login = class Login {
  constructor(hospital){
    this.hospital = hospital
  }
  cekUname(usrname) {
    let kat = 'patient';
    let iusr = this.hospital.patients.findIndex( (x) => x.name === usrname);
    if (iusr === -1) {
      kat = 'employee';
      iusr = this.hospital.employees.findIndex( (x) => x.username === usrname);
    }
    return (iusr !== -1  ? {idx : iusr, kat : kat} : false);
  }
  tryLogin(idx,pass,kat){
    let data = [];
    pass = pass.toString();
    // console.log(idx);
    switch (kat) {
      case 'patient':
        data = this.hospital.patients[idx];
        break;
      case 'employee' :
        data = this.hospital.employees[idx];
        break;
    }
    return (data.password === pass ? data : false);
  }
  logout(){
    return true;
  }
}

module.exports = {Login};