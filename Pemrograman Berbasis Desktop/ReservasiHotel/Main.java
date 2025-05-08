import java.util.Scanner;

public class Main {
    static Kamar[] daftarKamar = new Kamar[6];
    static Kamar[] kamarDipesan = new Kamar[3];
    static int[] lamaMenginap = new int[3];

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        inisialisasiKamar();

        tampilkanKamar();

        System.out.println("\n- PEMESANAN KAMAR -");
        System.out.print("Berapa kamar yang ingin dipesan? (maks 3): ");
        int jumlahPesan = input.nextInt();

        if (jumlahPesan > 3) {
            System.out.println("Maaf, maksimal hanya dapat bisa memesan tiga kamar.");
            return;
        }

        for(int i = 0; i < jumlahPesan; i++) {
            while (true) {
                System.out.print("Nomor Kamar ke-" + (i + 1) + ": ");
                int nomor = input.nextInt();
                Kamar k = cariKamar(nomor);

                if (k == null) {
                    System.out.println("Kamar dengan nomor tersebut tidak ditemukan!");
                    continue;
                }

                if (!k.tersedia) {
                    System.out.println("Kamar tidak tersedia. Silakan pilih kamar lain.");
                    continue;
                }

                System.out.print("Lama Menginap (malam): ");
                int malam = input.nextInt();

                kamarDipesan[i] = k;
                lamaMenginap[i] = malam;
                k.tersedia = false;
                break;
            }
        }

        cetakStruk(jumlahPesan);
    }

    static void inisialisasiKamar() {
        daftarKamar[0] = new Kamar(101, "Standar", 200000, true); 
        daftarKamar[1] = new Kamar(102, "Superior", 250000, true); 
        daftarKamar[2] = new Kamar(103, "Deluxe", 300000, true); 
        daftarKamar[3] = new Kamar(104, "Suite", 400000, true); 
        daftarKamar[4] = new Kamar(105, "Standar", 200000, true); 
        daftarKamar[5] = new Kamar(106, "Superior", 250000, true); 
    }

    static void tampilkanKamar() {
        System.out.println("- DAFTAR KAMAR -");
        for (int i = 0; i < daftarKamar.length; i++) {
            Kamar k = daftarKamar[i];
            System.out.println("Nomor: " + k.nomorKamar + ", Tipe: " + k.tipeKamar + ", Harga: " + k.hargaPerMalam  + ", Tersedia: " + (k.tersedia ? "Ya" : "Tidak"));
        }
    }

    static Kamar cariKamar(int nomor) {
        for (int i = 0; i < daftarKamar.length; i++) {
            if (daftarKamar[i].nomorKamar == nomor) {
                return daftarKamar[i];
            }
        }
        return null;
    }

    static void cetakStruk(int jumlah) {
        double totalSebelumPajak = 0;
        double layanan = 50000 * jumlah;

        System.out.println("\n- STRUK RESERVASI -");
        for (int i = 0; i < jumlah; i++) {
            Kamar k = kamarDipesan[i];
            double subtotal = k.hargaPerMalam * lamaMenginap[i];
            System.out.println("Kamar " + k.nomorKamar + " (" + k.tipeKamar + "), " + lamaMenginap[i] + " malam, Harga/Malam: " + k.hargaPerMalam + " => Total: " + subtotal);
            totalSebelumPajak += subtotal;
        }

        double pajak = totalSebelumPajak * 0.10;
        double totalSetelahPajak = totalSebelumPajak + pajak + layanan;

        boolean dapatDiskon = totalSebelumPajak > 500000;
        boolean gratisSarapan = totalSebelumPajak > 300000;

        if (dapatDiskon) {
            totalSetelahPajak *= 0.85;
        }

        System.out.println("Subtotal Sebelum Pajak: Rp " + totalSebelumPajak);
        System.out.println("Pajak (10%): Rp " + pajak);
        System.out.println("Biaya Layanan: Rp " + layanan);

        if (dapatDiskon) {
            System.out.println("Diskon 15% Diterapkan");
        }

        if (gratisSarapan) {
            System.out.println("Gratis Sarapan untuk Semua Tamu!");
        }

        System.out.println("Total Akhir: Rp " + totalSetelahPajak);
    }
}
