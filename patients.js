'use strict'

const fs = require('fs');

class ListPatients{
  constructor() {
    this.file = 'list-patiens.csv'
    this._list = fs.readFileSync(this.file, 'utf-8');
    this._perbaris = this._list.split('\n');
    this._pasienMentah = this._perbaris.map(x => x.split(','));
    this.pasien = this._pasienMentah.slice(1,this._pasienMentah.length).map( x => new Patient(x))
  }

  addPasien(arr) {
    this._pasienMentah.push(arr);
    this.pasien.push(new Patient(arr));
    let sementara = '\n' + arr.join(',')
    fs.appendFileSync(this.file, sementara, 'utf-8');
  }

  pasienPulang(nomorPasien) {
    let index = nomorPasien;
    if (index !== -1) {
      this._perbaris.splice(index+1, 1);
      this.pasien.splice(index+1,1);
      let sementara = this._perbaris.join('\n');
      fs.writeFileSync(this.file, sementara, 'utf-8');
    }
  }
}

class Patient {
  constructor(arr) {
    this.name = arr[0]
    this.diagnosis = arr[1]
    this.status = arr[2]
  }
}

var pasyen = new ListPatients();

//console.log(pasyen.pasien);

module.exports = ListPatients;