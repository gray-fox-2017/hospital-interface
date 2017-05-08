"use strict"

const ListEmployee = require('./employee.js');
const ListPatients = require('./patients.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Hospital {
  constructor(name, location, status) {
    this.name = name
    this.employees = new ListEmployee()
    this.patients = new ListPatients()
    this.location = location
    this.status = status;
    this.currentUser = null;
    this.currentName = null;
    this.currentPosition = null;
    this.count = 1;
  }

  iniate() {
    console.log('\x1B[2J');
    rl.question(`Selamat datang di ${this.name}\n_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+\n\n\nsilahkan masukkan username:    `, user => {
      let daftarUsername = this.employees.pegawai.map(daf => daf.username);
      let daftarPassword = this.employees.pegawai.map(daf => daf.password);
      let indexUser = daftarUsername.indexOf(user);

      if ( indexUser === -1) {
        console.log('\x1B[2J')
        console.log('salah username bro!\n\n')
        this.iniate()
      } else {
        let namanya = this.employees.pegawai[indexUser].name;
        let posisinya = this.employees.pegawai[indexUser].position;
        rl.question(`silahkan masukkan password:    `, pass => {
          let passBetul = daftarPassword[indexUser];
          if (pass === passBetul) {
            this.currentUser = daftarUsername[indexUser];
            this.currentName = namanya;
            this.currentPosition = posisinya;
            console.log('\x1B[2J')
            console.log('\n\nmenuju menu utama ya ' + namanya + ' si ' + posisinya + '\n\n');

            this.menuUtama()
          } else {
            console.log('\x1B[2J')
            console.log('passwordnya salah bro!\n\n')
            this.iniate();
          }
        })
      }
    })
  }

  menuUtama() {
    var menuKomplit = ['Employee List', 'Add Employee', 'Fire Employee', 'Patient List', 'Add Patient', 'Return Patient', 'Hiburan', 'Logout']
    var menu = []
    var posisi = this.currentPosition

    if (posisi === 'Owner' || posisi === 'Admin') {
      menu.push(menuKomplit[0], menuKomplit[1], menuKomplit[2], menuKomplit[3], menuKomplit[6], menuKomplit[7]);
    } else if (posisi === 'Dokter') {
      menu.push(menuKomplit[0], menuKomplit[3], menuKomplit[6], menuKomplit[7]);
    } else if (posisi === 'Suster') {
      menu.push(menuKomplit[0], menuKomplit[3], menuKomplit[4], menuKomplit[5], menuKomplit[6], menuKomplit[7]);
    } else if (posisi === 'OB') {
      menu.push(menuKomplit[6], menuKomplit[7])
    }

    console.log(`\n\n\n     MENU UTAMA     \n`);
    console.log(`______________________\n`);
    for (let i=0;i<menu.length;i++) {
      console.log(`[${i+1}] ${menu[i]}`)
    }

    rl.question(`\nSilahkan pilih mau ngapain ${this.currentName},\nketik angkanya aja:        `, next => {

      if (menu[next-1] === 'Patient List') {
        this.daftarPasyen();

      } else if (menu[next-1] === 'Employee List') {
        this.daftarPegawai();

      } else if (menu[next-1] === 'Add Employee') {
        this.tambahPegawai();

      } else if (menu[next-1] === 'Add Patient') {
        this.tambahPasyen();

      } else if (menu[next-1] === 'Hiburan') {
        this.hiburan();

      } else if (menu[next-1] === 'Logout') {
        this.logout();

      } else if (menu[next-1] === 'Fire Employee') {
        this.pecat();

      } else if (menu[next-1] === 'Return Patient') {
        this.pulangkan();

      } else {
        console.log('\n\nAngkanya yang betul, baru di enter');
        this.menuUtama();
      }
    });
  }

  daftarPasyen() {
    let namaPasien = this.patients.pasien.map(x=>x.name);
    let diagnosisPasien = this.patients.pasien.map(x=>x.diagnosis);
    let statusPasien = this.patients.pasien.map(x=>x.status);

    console.log(`\n\nBerikut daftar pasien yang berobat di ${this.name}`);
    console.log(`______________________________________________________\n`)
    for (let i=0; i<namaPasien.length;i++) {
      if (i<9) {
        console.log(`${i+1}. Nama          : ${namaPasien[i]}\n   Diagnosis     : ${diagnosisPasien[i]}\n   Status Pasien : Rawat ${statusPasien[i]}\n`)
      } else if (i<99){
        console.log(`${i+1}. Nama          : ${namaPasien[i]}\n    Diagnosis     : ${diagnosisPasien[i]}\n    Status Pasien : Rawat ${statusPasien[i]}\n`)
      }
    }
    rl.question(`[1] Balik ke menu utama\nmau ngapain lagi?     `, x => {
      if (x == 1) {
        this.menuUtama();
      } else {
        this.daftarPasyen()
      }})
  }

  daftarPegawai() {
    console.log(`\n\nBerikut daftar karyawan di ${this.name}:\n`)
    for (let i=0;i<this.employees.pegawai.length;i++) {
      let nama = this.employees.pegawai[i].name;
      let posisi = this.employees.pegawai[i].position;
      let username = this.employees.pegawai[i].username;
      console.log(`${i+1}. Nama     : ${nama}\n   Posisi   : ${posisi}\n   Username : ${username}\n`)
    }

    rl.question(`\n[1] Kembali ke menu utama\nMau ngapain lagi nih?   `, x => {
      if (x == 1) {
        this.menuUtama()
      } else {
        console.log('HAH?')
        this.daftarPasyen();
      }
    })
  }

  tambahPegawai() {
    console.log(`\n\nSilahkan masukkan data karyawan baru :\n`)
    rl.question(`\nNama asik: `, nama => {
      if (nama == 1 || nama == "") {
        console.log('datanya di isi dlu dong boss baru di enter');
        this.menuUtama();
      }
      let namaBaru = nama;

      rl.question(`\n\nPosisi:\n[1] Dokter\n[2] Suster\n[3] Admin\n[4] OB\n\n`, posisi => {
        if (posisi == "") {
          console.log('\n\ndatanya di isi dlu dong boss baru di enter');
          this.menuUtama();
        }
        if (posisi == '1') {
          var posisiBaru = 'Dokter';
        } else if (posisi == '2') {
          var posisiBaru = 'Suster';
        } else if (posisi == '3') {
          var posisiBaru = 'Admin';
        } else if (posisi == '4') {
          var posisiBaru = 'OB';
        }

        rl.question(`\n\nUsername:  `, user => {
          if (user == 1|| user == "") {
            console.log('\n\ndatanya di isi dlu dong boss baru di enter');
            this.menuUtama();
          } else if (this.employees.pegawai.map(x=>x.username).indexOf(user) !== -1) {
            console.log('\n\nUsername udah ada bro!!\n')
            this.tambahPegawai();
          } else {
            let usernameBaru = user;

            rl.question(`Password:  `, pass => {
              if (pass == 1 || pass == "") {
                cconsole.log('\n\ndatanya di isi dlu dong boss baru di enter');
                this.menuUtama();
              } else {
                let passBaru = pass;
                let karyawanBaru = [namaBaru, posisiBaru, usernameBaru, passBaru];
                this.employees.addPegawai(karyawanBaru);
                console.log(`\n${namaBaru} sudah berhasil di masukkan ke daftar karyawan ${this.name}.\n\n`);
                this.employees = new ListEmployee();
                
                rl.question(`[1] Kembali ke menu utama\nMau ngapain lagi nih ${this.currentName}??   `, x => {
                  if (x == 1 || x == "") {
                    this.menuUtama()
                  } else {
                    this.menuUtama();
                  }
                })
              }
            })
          }
        })
      })
      })
  }

  pecat() {
    rl.question(`\n\nsilahkan masukkan username karyawan yang mau dipecat:   `, user => {
      let index = this.employees.pegawai.map(x=>x.username).indexOf(user)
      if (this.employees.pegawai[index].position == 'Owner') {
        console.log(`\n\nMohon maaf, penghapusan owner hanya bisa di lakukan dengan peng editan langsung di file .csv`)
        console.log(`\nSaat ini kami telah mengirimkan notifikasi kepada owner bahwa\nada karyawannya yang ingin menghapusnya dari daftar karyawan ${this.name}`)
        this.menuUtama();
      } else if (user == this.currentUser) {
        console.log(`\n\nHahahahaha, kita ga boleh mecat diri kita sendiri ${this.currentName}\nSorry yaaa`);
        this.menuUtama();
      } else if (index == -1) {
        console.log(`\n\nopps karyawan dengan nama tersebut tidak ditemukan`)
        this.pecat();
      } else {
        var byeKaryawan = this.employees.pegawai[index];
        console.log(`\napakah anda yakin akan memecat karyawan dengan detail sebagai berikut:`);
        console.log(byeKaryawan);
        rl.question(`\nya/tidak :    `, input => {
          if (input == 'ya') {
            this.employees.pecatPegawai(input);
            console.log(`\n\nHiks, byee ${byeKaryawan.name}\nSuskes selalu!!`);
            this.employees = new ListEmployee()
            this.menuUtama();
          } else if (input == 'tidak') {
            console.log(`\n\nFiyuhhh, ${byeKaryawan.name} tidak jadi dipecat,\ndia masih bisa mengais rejeki di ${this.name} ini.`)
            this.menuUtama();
          } else if (input == "") {
            console.log('\n\nhadehh, di jawab dlu baru di enter keleus')
            this.pecat();
          }
        })
      }

    })
  }

  tambahPasyen() {
    console.log(`\nSilahkan masukkan data-data pasyen yang ingin ditambahkan ke daftar pasyen ${this.name}`);
    rl.question('\nNama pasien:   ', nama => {
      if (nama == "") {
        console.log('\nIshh!! di isi dulu datanya baru di enter!!\n')
        this.tambahPasyen();
      } else if (nama == '1') {
        this.menuUtama();
      } else if (this.patients.pasien.map(x=>x.name).indexOf(nama) !== -1) {
        var namaPasienBaru = nama + this.count.toString()
        this.count+=1
      } else {
        var namaPasienBaru = nama
      }

      rl.question('\n\nDiagnosa Pasien:   ', diagnosa => {
        if (diagnosa == '1') {
          this.menuUtama();
        } else if (diagnosa == "") {
          console.log('\nIshh!! di isi dulu datanya baru di enter!!\n')
          this.tambahPasyen();
        } else {
          var diagnosaPasienBaru = diagnosa;
        }

        rl.question('\n\nStatus Pasien:\n[1] Rawat Jalan\n[2] Rawat Inap\n\n1/2??   ', status => {
          if (status > 2 || status < 1 || status == "") {
            console.log('\nminum aqua dlu gih!!\n')
            this.tambahPasyen();
          } else if (status == '1') {
            var statusPasienBaru = 'Jalan';

          } else if (status == '2') {
            var statusPasienBaru = 'Inap';

          }

          var pasBar = [namaPasienBaru, diagnosaPasienBaru, statusPasienBaru];
          this.patients.addPasien(pasBar);
          console.log(`\n${namaPasienBaru} sudah di tambahkan ke daftar pasien ${this.name}`)
          this.menuUtama();
        })
      })
    })

  }

  pulangkan() {
    rl.question(`\nSilahkan masukkan nomor urut pasien yang mau di hapus\ndari daftar pasien ${this.name}:   `, urut => {
      if (urut < 1 || urut > this.patients.pasien.length || urut == "") {
        console.log('\nnomor urut yang anda masukkan tidak valid!!');
        this.pulangkan()
      } else {
        var urutanKe = urut-1;
      }
      var byePasien = this.patients.pasien[urutanKe];
      rl.question(`\nApakah anda yakin ingin menghapus ${byePasien.name} dari daftar pasien ${this.name}\nYa/Tidak   `, jawab => {
        if (jawab == 'ya') {
          console.log(`\nBye ${byePasien.name}`)
          this.patients.pasienPulang(urutanKe);
          this.patients = new ListPatients()
          this.menuUtama();
        } else {
          console.log(`\nHooooo, yasudah..`)
          this.menuUtama();
        }
      })
    })
  }

  hiburan() {
    console.log('\x1B[2J');
    rl.question('\n\napa persamaan jomblo ama martabak??\n\n', x => this.jawabanHiburan());
  }

  jawabanHiburan() {
    console.log('\x1B[2J')
    rl.question(`Sama-sama dikacangin\n\n[1] Kembali ke menu utama\n\n`, x => {console.log('\x1B[2J');this.menuUtama()})
  }

  logout() {
    rl.question(`\n\nHeyyyyy ${this.currentName},\nyakin ingin logout?? (ya/tidak)   `, log => {
      if (log == 'ya') {
        this.currentName = null;
        this.currentUser = null;
        this.currentPosition = null;
        this.iniate()
      } else if (log == 'tidak') {
        console.log('\n\nHahaha, yasudah')
        this.menuUtama();
      } else {
        this.logout()
      }
    })
  }
}

let rumahSakit = new Hospital('RS Mitra Khianat', 'Watifatma', 'buka udah 2 tahun');

rumahSakit.iniate()




module.exports = Hospital;

