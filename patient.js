'use strict'

let Patient = class Patient {
  constructor(datas) {
    this.category = 'patient';
    this.name = datas.name;
    this.id = datas.id;
    this.diagnosis = '';
    this.pass = datas.pass;
  }
}


module.exports = {Patient};