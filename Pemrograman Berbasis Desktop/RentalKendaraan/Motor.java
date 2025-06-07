public class Motor extends Kendaraan {
    private int cc;

    public Motor(String nama, double hargaSewa, int cc) {
        super(nama, hargaSewa, "Motor", true);
        this.cc = cc;
    }

    @Override
    public void tampilKendaraan() {
        System.out.println("[Motor] " + getNama() + " - Harga: Rp" + getHargaSewa() + ", CC: " + cc + ", Status: " + (isTersedia() ? "Tersedia" : "Disewa"));
    }
}