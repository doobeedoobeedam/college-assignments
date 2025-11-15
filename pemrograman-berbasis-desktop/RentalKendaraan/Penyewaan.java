import java.util.*;
import java.io.*;

public class Penyewaan {
    private ArrayList<Kendaraan> kendaraanDisewa;

    public Penyewaan() {
        kendaraanDisewa = new ArrayList<>();
    }

    public void sewaKendaraan(Kendaraan k) throws Exception {
        if (!k.isTersedia()) {
            throw new Exception("Kendaraan tidak tersedia untuk disewa.");
        }
        kendaraanDisewa.add(k);
        k.setStatus(false);
    }

    public double hitungTotal() {
        double total = 0;
        for (Kendaraan k : kendaraanDisewa) {
            total += k.getHargaSewa();
        }
        return total;
    }

    public void cetakStruk() {
        try (PrintWriter out = new PrintWriter(new FileWriter("struk.txt"))) {
            out.println("=== STRUK PENYEWAAN ===");
            for (Kendaraan k : kendaraanDisewa) {
                out.println(k.getNama() + " - Rp" + k.getHargaSewa());
            }
            out.println();
            out.println("TOTAL: Rp" + hitungTotal());
        } catch (IOException e) {
            System.out.println("Gagal menyimpan struk.");
        }
    }
}
