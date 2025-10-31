document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const alertError = document.getElementById("alertError");

  // Modal Daftar
  const modalDaftar = document.getElementById("modalDaftar");
  const btnDaftar = document.getElementById("btnDaftar");

  // Modal Lupa Password
  const modalLupa = document.getElementById("modalLupa");
  const btnLupaPassword = document.getElementById("btnLupaPassword");

  // Tombol tutup untuk semua modal
  const closeButtons = document.querySelectorAll(".close-btn");
  const btnTutupModal = document.querySelectorAll(".btn-tutup-modal");

  // Login
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    // Validasi
    if (email === "" || password === "") {
      alert("Email dan password tidak boleh kosong!");
      return;
    }

    // Mencari pengguna di data.js
    const user = dataPengguna.find(
      (pengguna) => pengguna.email === email && pengguna.password === password
    );

    if (user) {
      localStorage.setItem("penggunaSITTA", JSON.stringify(user));
      // Arahkan ke dashboard
      window.location.href = "dashboard.html";
    } else {
      // Error
      alertError.style.display = "block";
    }
  });

  // Modal Daftar
  btnDaftar.addEventListener("click", function () {
    modalDaftar.style.display = "block";
  });

  // Modal Lupa Password
  btnLupaPassword.addEventListener("click", function () {
    modalLupa.style.display = "block";
  });

  // Tutup modal
  function tutupModal(modal) {
    modal.style.display = "none";
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      tutupModal(btn.closest(".modal"));
    });
  });

  btnTutupModal.forEach((btn) => {
    btn.addEventListener("click", function () {
      tutupModal(btn.closest(".modal"));
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target == modalDaftar) {
      tutupModal(modalDaftar);
    }
    if (event.target == modalLupa) {
      tutupModal(modalLupa);
    }
  });
});
