import java.io.Serializable;

public abstract class Kendaraan implements Serializable {
    private String nama;
    private double hargaSewa;
    private String jenis;
    private boolean status;

    public Kendaraan(String nama, double hargaSewa, String jenis, boolean status) {
        this.nama = nama;
        this.hargaSewa = hargaSewa;
        this.jenis = jenis;
        this.status = status;
    }

    public abstract void tampilKendaraan();

    // Encapsulation
    public String getNama() { return nama; }
    public double getHargaSewa() { return hargaSewa; }
    public String getJenis() { return jenis; }
    public boolean isTersedia() { return status; }
    public void setStatus(boolean status) { this.status = status; }
}