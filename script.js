class Kendaraan {
  constructor(jenis) {
    this.jenis = jenis;
  }
}

class Pelanggan {
  constructor(nama, nomorTelepon, kendaraanDisewa) {
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = kendaraanDisewa;
  }

  getInfo() {
    return {
      nama: this.nama,
      nomorTelepon: this.nomorTelepon,
      kendaraan: this.kendaraanDisewa.jenis,
    };
  }
}

const daftarPelanggan = [];

function masukSistem() {
  document.getElementById("welcomeSection").style.display = "none";
  document.getElementById("mainSection").style.display = "block";
}

document.getElementById("formPelanggan").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const telepon = document.getElementById("telepon").value.trim();
  const jenisKendaraan = document.getElementById("kendaraan").value;

  if (nama && telepon && jenisKendaraan) {
    const kendaraan = new Kendaraan(jenisKendaraan);
    const pelanggan = new Pelanggan(nama, telepon, kendaraan);
    daftarPelanggan.push(pelanggan);
    tampilkanPelanggan();
    this.reset();
  }
});

function hapusPelanggan(index) {
  if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    daftarPelanggan.splice(index, 1);
    tampilkanPelanggan();
  }
}

function tampilkanPelanggan() {
  const tbody = document.getElementById("tabelPelanggan");
  tbody.innerHTML = "";

  daftarPelanggan.forEach((p, index) => {
    const info = p.getInfo();
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${info.nama}</td>
    <td>${info.nomorTelepon}</td>
    <td><span class="badge badge-kendaraan">${info.kendaraan}</span></td>
    <td class="text-center">
      <button class="btn btn-sm btn-danger" onclick="hapusPelanggan(${index})">🗑️ Hapus</button>
    </td>
  `;
    tbody.appendChild(row);
  });
}

document.getElementById("searchInput").addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();
  const rows = document.querySelectorAll("#tabelPelanggan tr");
  rows.forEach((row) => {
    const nama = row.cells[0].textContent.toLowerCase();
    const telepon = row.cells[1].textContent.toLowerCase();
    row.style.display = nama.includes(keyword) || telepon.includes(keyword) ? "" : "none";
  });
});
