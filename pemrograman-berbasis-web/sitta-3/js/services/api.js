const apiService = {
    async getData() {
        try {
            // Cek apakah fungsi dipanggil
            console.log("Mencoba mengambil data dari data/dataBahanAjar.json...");
            
            const response = await fetch('data/dataBahanAjar.json');
            
            // Cek status respon server
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const json = await response.json();
            
            // Cek isi data yang didapat
            console.log("Data berhasil diambil:", json);
            
            return json;
        } catch (error) {
            // Kalau gagal, error akan muncul merah di console
            console.error("Gagal fetch data:", error);
            return null;
        }
    }
};