document.addEventListener("DOMContentLoaded", function() {

  if (!localStorage.getItem("penggunaSITTA")) {
    window.location.href = "index.html";
    return;
  }
  
  const formTracking = document.getElementById("formTracking");
  const inputDO = document.getElementById("noDO");
  const hasilTracking = document.getElementById("hasilTracking");

  formTracking.addEventListener("submit", function(event) {
    event.preventDefault();
    const noDO = inputDO.value.trim();

    // Validasi
    if (noDO === "") {
      alert("Silakan masukkan Nomor Delivery Order.");
      return;
    }

    // Mencari data di data.js
    const data = dataTracking[noDO];

    tampilkanHasil(data);
  });

  function tampilkanHasil(data) {
    hasilTracking.style.display = "block";

    if (!data) {
      // Jika data tidak ada
      hasilTracking.innerHTML = `<div class="alert alert-error" style="display: block;">Data untuk Nomor DO tersebut tidak ditemukan.</div>`;
      return;
    }

    let progressWidth = "25%";
    let progressClass = "";
    if (data.status === "Dalam Perjalanan") {
      progressWidth = "60%";
    } else if (data.status === "Terkirim") {
      progressWidth = "100%";
      progressClass = "sukses"; // Ganti warna jadi hijau
    }

    let timelineHTML = '<ul class="timeline">';
    data.perjalanan.forEach(item => {
      timelineHTML += `
        <li class="timeline-item">
          <strong>${item.keterangan}</strong>
          <span>${item.waktu}</span>
        </li>
      `;
    });
    timelineHTML += '</ul>';

    // Menampilkan output
    hasilTracking.innerHTML = `
      <h3>Detail Pengiriman: ${data.nomorDO}</h3>
      <p><strong>Nama Mahasiswa:</strong> ${data.nama}</p>
      
      <div class="progress-container">
        <strong>Status: ${data.status}</strong>
        <div class="progress-bar">
          <div class="progress-fill ${progressClass}" style="width: ${progressWidth};">
            ${data.status}
          </div>
        </div>
      </div>
      
      <h4>Informasi Paket</h4>
      <table class="tabel-data">
        <tbody>
          <tr>
            <th>Ekspedisi</th>
            <td>${data.ekspedisi}</td>
          </tr>
          <tr>
            <th>Tanggal Kirim</th>
            <td>${data.tanggalKirim}</td>
          </tr>
          <tr>
            <th>Jenis Paket</th>
            <td>${data.paket}</td>
          </tr>
          <tr>
            <th>Total Pembayaran</th>
            <td>${data.total}</td>
          </tr>
        </tbody>
      </table>
      
      <h4>Riwayat Perjalanan</h4>
      ${timelineHTML}
    `;
  }
  
  // Logout
  document.getElementById("btnLogout").addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("penggunaSITTA");
    window.location.href = "index.html";
  });
});