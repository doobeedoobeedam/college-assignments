const DoTracking = {
    template: '#tpl-tracking',
    props: ['trackingData'], // Data tracking dari JSON
    data() {
        return {
            keyword: '',
            result: null,
            resultKey: '',
            searched: false,
            newStatusDesc: ''
        };
    },
    methods: {
        // Fitur seacrh (enter / klik Tombol)
        doSearch() {
            this.searched = true;
            this.result = null;
            this.newStatusDesc = '';

            // Bersihkan input agar tidak sensitif huruf besar/kecil
            const searchKey = this.keyword.trim().toLowerCase();

            if (!searchKey) return;

            for (const item of this.trackingData) {
                // Ambil key (Nomor DO) dari objek saat ini
                const doNumber = Object.keys(item)[0];
                const detail = item[doNumber];

                // Cek apakah Nomor DO cocok (case-insensitive) ATAU Cek apakah NIM cocok
                if (doNumber.toLowerCase() === searchKey || detail.nim === searchKey) {
                    this.result = detail;
                    this.resultKey = doNumber;
                    break; // Berhenti mencari kalau sudah ketemu
                }
            }
        },

        // Reset (tombol Esc) 
        resetSearch() {
            this.keyword = '';
            this.result = null;
            this.searched = false;
        },

        formatDate(dateString) {
            if (!dateString) return '-';

            // Ubah string "YYYY-MM-DD" jadi objek Date
            const date = new Date(dateString);

            const options = {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            };

            // Ubah ke format lokal Indonesia
            return date.toLocaleDateString('id-ID', options);
        },

        formatDateTime(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);

            // Cek jika date invalid
            if (isNaN(date.getTime())) return dateString; // Kembalikan teks asli kalau bukan format tanggal

            return date.toLocaleString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(/\./g, ':'); // Opsional: mengganti pemisah waktu titik dengan titik dua
        },

        addHistory() {
            if (!this.newStatusDesc.trim()) {
                alert("Mohon isi keterangan status terlebih dahulu!");
                return;
            }

            // ambil waktu local
            const currentTime = new Date().toLocaleString('sv-SE');

            // buat object riwayat naru
            const newLog = {
                waktu: currentTime,
                keterangan: this.newStatusDesc
            };

            // push ke array Perjalanan
            if (this.result && this.result.perjalanan) {
                this.result.perjalanan.push(newLog);

                // Update status utama juga (opsional, agar sinkron dengan update terakhir)
                this.result.status = this.newStatusDesc;

                // Reset input
                this.newStatusDesc = '';
            }
        }
    }
};