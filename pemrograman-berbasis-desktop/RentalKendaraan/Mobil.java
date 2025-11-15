public class Mobil extends Kendaraan {
    private int jumlahPintu;

    public Mobil(String nama, double hargaSewa, int jumlahPintu) {
        super(nama, hargaSewa, "Mobil", true);
        this.jumlahPintu = jumlahPintu;
    }

    @Override
    public void tampilKendaraan() {
        System.out.println("[Mobil] " + getNama() + " - Harga: Rp" + getHargaSewa() + ", Pintu: " + jumlahPintu + ", Status: " + (isTersedia() ? "Tersedia" : "Disewa"));
    }
}