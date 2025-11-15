import java.util.*;

public class Main {
    public static void main(String[] args) {
        RentalKendaraan rental = new RentalKendaraan();
        Penyewaan penyewaan = new Penyewaan();
        Scanner input = new Scanner(System.in);
        boolean running = true;

        while (running) {
            System.out.println("\n==== MENU UTAMA RENTAL ====");
            System.out.println("1. Tambah Kendaraan");
            System.out.println("2. Tampilkan Kendaraan Tersedia");
            System.out.println("3. Sewa Kendaraan");
            System.out.println("4. Tampilkan Total dan Cetak Struk");
            System.out.println("5. Keluar");
            System.out.print("Pilih menu: ");
            int pilih = input.nextInt();
            input.nextLine();

            switch (pilih) {
                case 1:
                    rental.tambahKendaraan();
                    break;
                case 2:
                    rental.tampilkanKendaraanTersedia();
                    break;
                case 3:
                    System.out.print("Masukkan nama kendaraan yang ingin disewa: ");
                    String nama = input.nextLine();
                    Optional<Kendaraan> ditemukan = rental.getDaftarKendaraan().stream()
                        .filter(k -> k.getNama().equalsIgnoreCase(nama)).findFirst();
                    if (ditemukan.isPresent()) {
                        try {
                            penyewaan.sewaKendaraan(ditemukan.get());
                            System.out.println("Berhasil menyewa kendaraan.");
                        } catch (Exception e) {
                            System.out.println(e.getMessage());
                        }
                    } else {
                        System.out.println("Kendaraan tidak ditemukan.");
                    }
                    break;
                case 4:
                    System.out.println("Total sewa: Rp" + penyewaan.hitungTotal());
                    penyewaan.cetakStruk();
                    System.out.println("Struk telah dicetak ke file.");
                    break;
                case 5:
                    rental.simpanData();
                    running = false;
                    break;
                default:
                    System.out.println("Pilihan tidak valid.");
            }
        }
    }
}
