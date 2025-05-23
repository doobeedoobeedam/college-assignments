import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {
    private static Buku[] daftarBuku = new Buku[100];
    private static int jumlahBuku = 0;
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        tambahBukuBaru("Filosofi Teras", "Henry Manampiring", "Non-Fiksi");
        tambahBukuBaru("Little Women", "Louisa May Alcott", "Fiksi");
        tambahBukuBaru("Sejarah Dunia", "E.H. Gombrich", "Sejarah");
        tambahBukuBaru("Dona Dona", "Toshikazu Kawaguchi", "Fiksi");

        int pilihan;
        do {
            System.out.println("\n=== Aplikasi Manajemen Perpustakaan ===");
            System.out.println("1. Tampilkan Daftar Buku");
            System.out.println("2. Peminjaman Buku");
            System.out.println("3. Pengembalian Buku");
            System.out.println("4. Manajemen Data Buku (Admin)");
            System.out.println("5. Keluar");
            System.out.print("Pilih menu (masukkan nomor menu): ");

            try {
                pilihan = scanner.nextInt();
                scanner.nextLine();

                switch (pilihan) {
                    case 1:
                        tampilkanDaftarBuku();
                        break;
                    case 2:
                        peminjamanBuku();
                        break;
                    case 3:
                        pengembalianBuku();
                        break;
                    case 4:
                        manajemenDataBuku();
                        break;
                    case 5:
                        System.out.println("Terima kasih telah menggunakan aplikasi ini.");
                        break;
                    default:
                        System.out.println("Pilihan tidak valid. Silakan masukkan angka 1-5.");
                }
            } catch (InputMismatchException e) {
                System.out.println("Input tidak valid. Harap masukkan angka (1-5).");
                scanner.nextLine(); 
                pilihan = 0;
            }

        } while (pilihan != 5);
    }

    private static void tambahBukuBaru(String judul, String penulis, String kategori) {
        daftarBuku[jumlahBuku] = new Buku(judul, penulis, kategori);
        jumlahBuku++;
    }

    private static void tampilkanDaftarBuku() {
        System.out.println("\n=== Daftar Buku ===");
        for (int i = 0; i < jumlahBuku; i++) {
            System.out.println("\nBuku ke-" + (i + 1));
            daftarBuku[i].tampilkanInfo();
        }
    }

    private static void peminjamanBuku() {
        System.out.println("\n=== Peminjaman Buku ===");
        while (true) {
            System.out.print("Masukkan judul buku yang ingin dipinjam (atau ketik 'selesai' untuk keluar): ");
            String judul = scanner.nextLine();
            if (judul.equalsIgnoreCase("selesai")) {
                break;
            }
            boolean ditemukan = false;
            for (int i = 0; i < jumlahBuku; i++) {
                if (daftarBuku[i].getJudul().equalsIgnoreCase(judul)) {
                    ditemukan = true;
                    if (daftarBuku[i].isTersedia()) {
                        daftarBuku[i].setTersedia(false);
                        System.out.println("\nBuku berhasil dipinjam!");
                        cetakStrukPeminjaman(daftarBuku[i]);
                    } else {
                        System.out.println("Maaf, buku \"" + daftarBuku[i].getJudul()
                                + "\" sedang dipinjam. Silakan pilih buku lain\n");
                    }
                    break;
                }
            }
            if (!ditemukan) {
                System.out.println("Buku tidak ditemukan. Silakan masukkan judul yang benar\n");
            }
        }
    }

    private static void pengembalianBuku() {
        System.out.println("\n=== Pengembalian Buku ===");
        System.out.print("Masukkan judul buku yang ingin dikembalikan: ");
        String judul = scanner.nextLine();
        boolean ditemukan = false;
        for (int i = 0; i < jumlahBuku; i++) {
            if (daftarBuku[i].getJudul().equalsIgnoreCase(judul)) {
                ditemukan = true;
                if (!daftarBuku[i].isTersedia()) {
                    daftarBuku[i].setTersedia(true);
                    System.out.print("Masukkan jumlah hari keterlambatan: ");
                    int hariTerlambat = scanner.nextInt();
                    scanner.nextLine();
                    int denda = 0;
                    if (hariTerlambat > 7) {
                        denda = (hariTerlambat - 7) * 5000;
                    }
                    System.out.println("\nBuku berhasil dikembalikan.");
                    cetakStrukPengembalian(daftarBuku[i], hariTerlambat, denda);
                } else {
                    System.out.println("\nBuku ini tidak sedang dipinjam");
                }
                break;
            }
        }
        if (!ditemukan) {
            System.out.println("\nBuku tidak ditemukan");
        }
    }

    private static void cetakStrukPeminjaman(Buku buku) {
        System.out.println("\n--- Struk Peminjaman ---");
        System.out.println("Judul     : " + buku.getJudul());
        System.out.println("Penulis   : " + buku.getPenulis());
        System.out.println("Kategori  : " + buku.getKategori());
        System.out.println("Status    : " + (buku.isTersedia() ? "Tersedia" : "Dipinjam"));
        System.out.println("-------------------------\n");
    }
    
    private static void cetakStrukPengembalian(Buku buku, int hariTerlambat, int denda) {
        System.out.println("\n--- Struk Pengembalian ---");
        System.out.println("Judul       : " + buku.getJudul());
        System.out.println("Penulis     : " + buku.getPenulis());
        System.out.println("Kategori    : " + buku.getKategori());
        System.out.println("Status      : " + (buku.isTersedia() ? "Tersedia" : "Dipinjam"));
        System.out.println("Terlambat   : " + hariTerlambat + " hari");
        System.out.println("Total Denda : Rp. " + denda);
        System.out.println("----------------------------\n");
    }    

    private static void manajemenDataBuku() {
        int pilihan;
        do {
            System.out.println("\n=== Manajemen Data Buku (Admin) ===");
            System.out.println("1. Tambah Buku Baru");
            System.out.println("2. Ubah Informasi Buku");
            System.out.println("3. Hapus Buku");
            System.out.println("4. Kembali ke Menu Utama");
            System.out.print("Pilih menu (masukkan nomor menu): ");
            pilihan = scanner.nextInt();
            scanner.nextLine();

            switch (pilihan) {
                case 1:
                    System.out.print("Masukkan judul buku: ");
                    String judul = scanner.nextLine();
                    System.out.print("Masukkan penulis buku: ");
                    String penulis = scanner.nextLine();
                    System.out.print("Masukkan kategori buku: ");
                    String kategori = scanner.nextLine();
                    tambahBukuBaru(judul, penulis, kategori);
                    System.out.println("Buku berhasil ditambahkan");
                    break;
                case 2:
                    System.out.print("Masukkan judul buku yang ingin diubah: ");
                    String judulUbah = scanner.nextLine();
                    boolean ditemukan = false;
                    for (int i = 0; i < jumlahBuku; i++) {
                        if (daftarBuku[i].getJudul().equalsIgnoreCase(judulUbah)) {
                            ditemukan = true;
                            System.out.print("Anda yakin ingin mengubah buku ini? (ya/tidak): ");
                            String konfirmasi = scanner.nextLine();
                            if (konfirmasi.equalsIgnoreCase("ya")) {
                                System.out.print("Masukkan judul baru: ");
                                String judulBaru = scanner.nextLine();
                                System.out.print("Masukkan penulis baru: ");
                                String penulisBaru = scanner.nextLine();
                                System.out.print("Masukkan kategori baru: ");
                                String kategoriBaru = scanner.nextLine();
                                daftarBuku[i] = new Buku(judulBaru, penulisBaru, kategoriBaru);
                                System.out.println("Informasi buku berhasil diubah");
                            } else {
                                System.out.println("Pengubahan dibatalkan");
                            }
                            break;
                        }
                    }
                    if (!ditemukan) {
                        System.out.println("\nBuku tidak ditemukan");
                    }
                    break;
                case 3:
                    System.out.print("Masukkan judul buku yang ingin dihapus: ");
                    String judulHapus = scanner.nextLine();
                    boolean dihapus = false;
                    for (int i = 0; i < jumlahBuku; i++) {
                        if (daftarBuku[i].getJudul().equalsIgnoreCase(judulHapus)) {
                            for (int j = i; j < jumlahBuku - 1; j++) {
                                daftarBuku[j] = daftarBuku[j + 1];
                            }
                            jumlahBuku--;
                            dihapus = true;
                            System.out.println("\nBuku berhasil dihapus");
                            break;
                        }
                    }
                    if (!dihapus) {
                        System.out.println("\nBuku tidak ditemukan");
                    }
                    break;
                case 4:
                    System.out.println("Kembali ke menu utama");
                    break;
                default:
                    System.out.println("Pilihan tidak valid. Silakan coba lagi");
            }
        } while (pilihan != 4);
    }
}