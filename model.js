const Classes = require('./hospital');
const Hospital = Classes[0]
const Patient = Classes[1]
const Employee = Classes[2]

class Model {
  constructor() {
    this._data= new Hospital('Rumah Sakit','Tanah Kusir IV',this.dataEmployees(),this.dataPatients())
  }

  get data(){
    return this._data;
  }

  dataPatients(){
    let data=[]
    data.push(new Patient(1,'aan','batuk'));
    data.push(new Patient(2,'baba','demam'));
    data.push(new Patient(3,'caca','pusing'));
    return data
  }

  dataEmployees(){
    let data=[]
    data.push(new Employee('Ray Laser','Dokter','laser','asdf'));
    data.push(new Employee('James Sraun','Admin','james','asdf'));
    data.push(new Employee('Mudin','Office Boy','mudin','asdf'));
    return data;
  }
}

module.exports = Model;
