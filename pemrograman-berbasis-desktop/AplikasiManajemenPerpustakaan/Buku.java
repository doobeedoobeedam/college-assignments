public class Buku {
    private String judul;
    private String penulis;
    private String kategori;
    private boolean tersedia;

    public Buku(String judul, String penulis, String kategori) {
        this.judul = judul;
        this.penulis = penulis;
        this.kategori = kategori;
        this.tersedia = true;
    }

    public String getJudul() {
        return judul;
    }

    public String getPenulis() {
        return penulis;
    }

    public String getKategori() {
        return kategori;
    }

    public boolean isTersedia() {
        return tersedia;
    }

    public void setTersedia(boolean tersedia) {
        this.tersedia = tersedia;
    }

    public void tampilkanInfo() {
        System.out.println("Judul: " + judul);
        System.out.println("Penulis: " + penulis);
        System.out.println("Kategori: " + kategori);
        System.out.println("Status: " + (tersedia ? "Tersedia" : "Dipinjam"));
    }
}