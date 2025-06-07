import java.util.*;
import java.io.*;

public class RentalKendaraan {
    private ArrayList<Kendaraan> daftarKendaraan;
    private Scanner input;

    public RentalKendaraan() {
        daftarKendaraan = new ArrayList<>();
        input = new Scanner(System.in);
        loadData();
    }

    public void tambahKendaraan() {
        System.out.print("Masukkan jenis kendaraan (Mobil/Motor/Bus): ");
        String jenis = input.nextLine();
        System.out.print("Nama kendaraan: ");
        String nama = input.nextLine();
        System.out.print("Harga sewa per hari: ");
        double harga = input.nextDouble();
        input.nextLine();

        try {
            switch (jenis.toLowerCase()) {
                case "mobil":
                    System.out.print("Jumlah pintu: ");
                    int pintu = input.nextInt();
                    daftarKendaraan.add(new Mobil(nama, harga, pintu));
                    break;
                case "motor":
                    System.out.print("CC mesin: ");
                    int cc = input.nextInt();
                    daftarKendaraan.add(new Motor(nama, harga, cc));
                    break;
                case "bus":
                    System.out.print("Kapasitas penumpang: ");
                    int kapasitas = input.nextInt();
                    daftarKendaraan.add(new Bus(nama, harga, kapasitas));
                    break;
                default:
                    System.out.println("Jenis kendaraan tidak valid.");
            }
        } catch (InputMismatchException e) {
            System.out.println("Input tidak valid.");
            input.nextLine();
        }
    }

    public void tampilkanKendaraanTersedia() {
        for (Kendaraan k : daftarKendaraan) {
            if (k.isTersedia()) {
                k.tampilKendaraan();
            }
        }
    }

    public ArrayList<Kendaraan> getDaftarKendaraan() {
        return daftarKendaraan;
    }

    public void simpanData() {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("data_kendaraan.dat"))) {
            out.writeObject(daftarKendaraan);
        } catch (IOException e) {
            System.out.println("Gagal menyimpan data kendaraan.");
        }
    }

    public void loadData() {
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("data_kendaraan.dat"))) {
            daftarKendaraan = (ArrayList<Kendaraan>) in.readObject();
        } catch (IOException | ClassNotFoundException e) {
            daftarKendaraan = new ArrayList<>();
        }
    }
}