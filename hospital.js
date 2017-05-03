"use strict"

const ListEmployee = require('./employee.js');

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this._employees = new ListEmployee(employees)
    this.patients = patients
    this.location = location
  }

  get employees() {
    return this._employees.pegawai;
  }

  addEmployee(arr) {
    this._employees.addPegawai(arr);
    this._employees.save();
  }

  removeEmployee(attribut, place) {
    this._employees.pecatPegawai(attribut, place);

  }

}

class Patient {
  constructor(arr) {
    this.id = arr[0]
    this.name = arr[1]
    this.diagnosis = arr[2]
  }
}

let rumahSakit = new Hospital('RS Mitra Khianat', 'Watifatma', 'list-employee.csv', 'masih belom buka');

console.log(rumahSakit.employees);
rumahSakit.removeEmployee('id', '007');

