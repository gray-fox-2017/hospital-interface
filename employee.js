'use strict'

const fs = require('fs');

class ListEmployee{
  constructor(file) {
    this._file = file
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

  pecatPegawai(attribut, penyebut) {
    let index = rumahSakit.employees.map(x => x.attribut);
    let urutanKe = index.indexOf(penyebut);

    this._perbaris.splice(urutanKe, 1);
    fs.writeFileSync(this._file, this._perbaris, 'utf-8');

    return 'Pegawai berhasil di pecat!!'

  }

  get file() {
    return this._file
  }

  addPegawai(arr) {
    var anakBaru = new Employee(arr);
    this._belomdisave.push('\n' + arr.join(','));
    this._pegawai.push(anakBaru);
  }

  save() {
    if (this._belomdisave.length > 0) {
      fs.appendFileSync(this._file, this._belomdisave, 'utf-8');
      this._belomdisave = [];
      return 'Save berhasil!!'
    } else {
      return 'Belum ada penambahan apapun'
    }

  }
}

class Employee {
  constructor(arr) {
    this.id = arr[0]
    this.name = arr[1]
    this.position = arr[2]
    this.username = arr[3]
    this.password = arr[4]
  }
}

module.exports = ListEmployee;