// rl.setPrompt(`Masukkan nama karyawan \n`)
// rl.prompt();
// rl.on('line',input_nama =>{
//   tmp["name"] = input_nama;
//   rl.setPrompt(`Masukkan posisi karyawan (admin / doctor / offficeboy)\n`)
//   rl.prompt();
//   rl.on('line',input_pos => {
//     tmp["position"] = input_pos;
//     rl.setPrompt(`Masukkan username untuk karyawan \n`);
//     rl.prompt();
//     rl.on('line',input_username => {
//       tmp["username"] = input_username;
//       rl.setPrompt(`Masukkan password untuk karyawan \n`)
//       rl.prompt();
//       rl.on('line',input_pass => {
//         tmp["password"] = input_pass;
//         this.employee_data.push(tmp)
//         fs.writeFile('employee.json', JSON.stringify(this.employee_data) , (err) => {
//         if (err) throw err;
//         console.log(`Data karyawan sudah disimpan`);
//         });
//       })
//     })
//   })
// })
