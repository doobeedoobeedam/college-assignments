document.addEventListener("DOMContentLoaded", function() {
  const pengguna = JSON.parse(localStorage.getItem("penggunaSITTA"));
  
  if (!pengguna) {
    alert("Anda harus login terlebih dahulu.");
    window.location.href = "index.html";
    return;
  }

  // Greeting
  const greetingElement = document.getElementById("greeting");
  const jam = new Date().getHours();
  let sapaan;

  if (jam < 11) {
    sapaan = "Selamat Pagi";
  } else if (jam < 15) {
    sapaan = "Selamat Siang";
  } else if (jam < 19) {
    sapaan = "Selamat Sore";
  } else {
    sapaan = "Selamat Malam";
  }

  greetingElement.textContent = `${sapaan}, ${pengguna.nama}!`;

  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", function(event) {
    event.preventDefault();
    
    // Hapus data dari localStorage
    localStorage.removeItem("penggunaSITTA");

    // Arahkan ke halaman login
    window.location.href = "index.html";
  });
});