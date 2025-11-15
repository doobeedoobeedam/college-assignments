document.addEventListener("DOMContentLoaded", function() {
  if (!localStorage.getItem("penggunaSITTA")) {
    window.location.href = "index.html";
    return;
  }
  
  const tabelBody = document.getElementById("tabelStokBody");
  const formTambahStok = document.getElementById("formTambahStok");
  const alertSukses = document.getElementById("alertSukses");

  function tampilkanStok() {
    tabelBody.innerHTML = "";

    // Loop data dari data.js
    dataBahanAjar.forEach((item, index) => {
      // Membuat elemen baris baru
      const baris = document.createElement("tr");

      baris.innerHTML = `
        <td><img src="${item.cover || 'img/placeholder.jpg'}" alt="Cover ${item.namaBarang}"></td>
        <td>${item.kodeLokasi}</td>
        <td>${item.kodeBarang}</td>
        <td>${item.namaBarang}</td>
        <td>${item.jenisBarang}</td>
        <td>${item.edisi}</td>
        <td>${item.stok}</td>
        <td>
          <button class="btn btn-danger btn-sm btn-hapus" data-index="${index}">
            Hapus
          </button>
        </td>
      `;
      
      // Menambahkan baris ke dalam tbody
      tabelBody.appendChild(baris);
    });
  }

  formTambahStok.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Ambil data dari form
    const newItem = {
      kodeLokasi: document.getElementById("kodeLokasi").value,
      kodeBarang: document.getElementById("kodeBarang").value,
      namaBarang: document.getElementById("namaBarang").value,
      jenisBarang: document.getElementById("jenisBarang").value,
      edisi: document.getElementById("edisi").value,
      stok: parseInt(document.getElementById("stok").value), // Ubah ke angka
      cover: "img/placeholder.jpg" // Default cover
    };

    // Menambah ke array data.js
    dataBahanAjar.push(newItem);

    // Tampilkan di tabel
    tampilkanStok();

    alertSukses.style.display = "block";
    setTimeout(() => {
      alertSukses.style.display = "none";
    }, 3000);

    formTambahStok.reset();
  });

  tabelBody.addEventListener("click", function(event) {
    
    // Cek apakah yang diklik adalah tombol hapus
    if (event.target.classList.contains("btn-hapus")) {
      
      const konfirmasi = confirm("Apakah Anda yakin ingin menghapus data ini?");
      
      if (konfirmasi) {
        const index = event.target.getAttribute("data-index");
        dataBahanAjar.splice(index, 1);
        tampilkanStok();
      }
    }
  });

  tampilkanStok();
  
  // Logout
  document.getElementById("btnLogout").addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("penggunaSITTA");
    window.location.href = "index.html";
  });
});