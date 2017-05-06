"use strict"

const Hospital = require('./hospital.js');

let rumahSakit = new Hospital('RS Mitra Khianat', 'Watifatma', 'masih belom buka');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});