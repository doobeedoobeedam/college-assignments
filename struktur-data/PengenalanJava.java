import java.util.LinkedList;

public class PengenalanJava {
    public static void main(String[] args) {
        
        // 1. deklarasi variabel dengan tipe data integer yang bernama 'jumlahBaris'
        int jumlahBaris;
        jumlahBaris = 100;


        // 2. deklarasi variabel dengan tipe data string yang bernama 'kalimatBaru' yang berisi kata 'Deklarasi tipe data String'
        String kalimatBaru = "Deklarasi tipe data string";


        // 3. deklarasi array satu dimensi dengan nama 'empatAngka', tipe data integer, yang berisi angka (07, 10, 20, 23)
        int[] empatAngka = {07, 10, 20, 23};


        // 4. deklarasi array dua dimensi dengan nama 'alfabet', tipe data String, yang terdiri dari tiga baris dan tiga kolom
        String[][] alfabet = {
            {"p", "s", "n"},
            {"w", "l", "b"},
            {"f", "r", "b"}
        };

        // 5. deklarasi linkedlist dengan nama ListAngka yang memiliki list (26,08,23,24,16)
        LinkedList<Integer> listAngka = new LinkedList<>();
            listAngka.add(26);
            listAngka.add(8);
            listAngka.add(23);
            listAngka.add(24);
            listAngka.add(16);

        // Output
        System.out.println("Nomor 1: " + jumlahBaris);
        System.out.println("Nomor 2: " + kalimatBaru);

        System.out.println("Nomor 3 array empatAngka:");
        for (int angka : empatAngka) {
            System.out.print(angka + " ");
        }

        System.out.println("\nNomor 4 array alfabet:");
        
        for (String[] baris : alfabet) {
            for (String huruf : baris) {
                System.out.print(huruf + " ");
            }
            System.out.println();
        }

        System.out.println("Nomor 5 linked list listAngka: " + listAngka);
    }
}
