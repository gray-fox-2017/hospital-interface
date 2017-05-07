"use strict";

let Employee = class Employee {
  constructor(datas) {
    this.category = 'employee';
    this.id = datas.id;
    this.position = datas.position;
    this.name = datas.name;
    this.pass = datas.pass;
    // this.men;
  }
}


module.exports = {
  Employee
}
