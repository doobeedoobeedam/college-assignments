public class Bus extends Kendaraan {
    private int kapasitasPenumpang;

    public Bus(String nama, double hargaSewa, int kapasitasPenumpang) {
        super(nama, hargaSewa, "Bus", true);
        this.kapasitasPenumpang = kapasitasPenumpang;
    }

    @Override
    public void tampilKendaraan() {
        System.out.println("[Bus] " + getNama() + " - Harga: Rp" + getHargaSewa() + ", Kapasitas: " + kapasitasPenumpang + ", Status: " + (isTersedia() ? "Tersedia" : "Disewa"));
    }
}