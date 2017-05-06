'use strict'

const fs = require('fs');

class ListEmployee{
  constructor() {
    this._file = 'list-employee.csv'
    this._list = fs.readFileSync(this.file, 'utf-8');
    this._perbaris = this._list.split('\n');
    this._pegawai = this._perbaris.map(x => x.split(','));
    this._belomdisave = [];
  }

  get pegawai() {

    let output = []

    for (let  i=1; i<this._pegawai.length; i++) {
      var person = new Employee(this._pegawai[i])
      output.push(person);
    }

    return output;

  }

  pecatPegawai(input) {
    let index = this.pegawai.map(x => x.username);
    let urutanKe = index.indexOf(input);

    this._perbaris.splice(urutanKe, 1);
    fs.writeFileSync(this._file, this._perbaris.join('\n'), 'utf-8');
  }

  get file() {
    return this._file
  }

  addPegawai(arr) {
    var anakBaru = new Employee(arr);
    var sementara = '\n' + arr.join(',');
    this._pegawai.push(anakBaru);
    fs.appendFileSync(this._file, sementara, 'utf-8');
  }

}

class Employee {
  constructor(arr) {
    this.name = arr[0]
    this.position = arr[1]
    this.username = arr[2]
    this.password = arr[3]
  }
}

module.exports = ListEmployee;