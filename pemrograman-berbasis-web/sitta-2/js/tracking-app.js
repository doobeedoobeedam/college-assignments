const appTracking = Vue.createApp({
    data() {
        return {
            // Mengambil data
            trackingList: tracking,
            pengirimanList: pengirimanList,
            paketList: paket,
            stokList: stok,
            
            // Data untuk form DO baru
            newDO: {
                nim: '',
                nama: '',
                ekspedisi: '',
                selectedPaketKode: '',
                tglKirim: '',
                totalHarga: 0
            },
            selectedPaketDetails: [],
            
            // Data untuk fitur tracking
            searchDO: '',
            searchResultKey: '',
            trackingResult: null,
            trackingError: ''
        };
    },
    
    // Indikator 4: Computed Property
    computed: {
        nextDONumber() {
            const year = new Date().getFullYear();
            const currentDOCount = Object.keys(this.trackingList).length;

            const nextSequence = (currentDOCount + 1).toString().padStart(4, '0');
            
            return `DO${year}-${nextSequence}`;
        }
    },
    
    // Indikator 5: Watcher
    watch: {
        'newDO.selectedPaketKode'(newKode) {
            if (!newKode) {
                this.newDO.totalHarga = 0;
                this.selectedPaketDetails = [];
                return;
            }
            
            const selectedPaket = this.paketList.find(p => p.kode === newKode);
            
            if (selectedPaket) {
                this.newDO.totalHarga = selectedPaket.harga;
                
                this.selectedPaketDetails = selectedPaket.isi.map(kodeMK => {
                    const detailMK = this.stokList.find(stok => stok.kode === kodeMK);
                    if (detailMK) {
                        return { 
                            kode: detailMK.kode, 
                            judul: detailMK.judul,
                            harga: detailMK.harga
                        };
                    }
                    return { kode: kodeMK, judul: 'Data MK Tidak Ditemukan', harga: 0 };
                });
                
            } else {
                this.newDO.totalHarga = 0;
                this.selectedPaketDetails = [];
            }
        }
    },
    
    // Indikator 4: Methods Property
    methods: {
        getTodayDate() {
            const today = new Date();
            const y = today.getFullYear();
            const m = (today.getMonth() + 1).toString().padStart(2, '0');
            const d = today.getDate().toString().padStart(2, '0');
            return `${y}-${m}-${d}`;
        },
        
        setTodayDate() {
            this.newDO.tglKirim = this.getTodayDate();
        },
        
        submitNewDO() {
            if (!this.newDO.nim || !this.newDO.nama || !this.newDO.ekspedisi || !this.newDO.selectedPaketKode || !this.newDO.tglKirim) {
                alert('Semua field wajib diisi!');
                return;
            }
            
            const doNumber = this.nextDONumber;
            
            const dataToSave = {
                nim: this.newDO.nim,
                nama: this.newDO.nama,
                status: "Pesanan Diterima",
                ekspedisi: this.newDO.ekspedisi,
                tanggalKirim: this.newDO.tglKirim,
                paket: this.newDO.selectedPaketKode,
                total: this.newDO.totalHarga,
                perjalanan: [
                    { waktu: new Date().toLocaleString('sv-SE'), keterangan: "Pesanan Diterima dan sedang diproses" }
                ]
            };
            
            this.trackingList[doNumber] = dataToSave;
            
            alert(`DO baru ${doNumber} berhasil dibuat!`);
            
            // Reset form
            this.newDO = {
                nim: '', nama: '', ekspedisi: '', selectedPaketKode: '', 
                tglKirim: '', totalHarga: 0
            };
            this.selectedPaketDetails = [];
        },
        
        trackDO() {
            this.trackingError = '';
            this.trackingResult = null;
            const key = this.searchDO.trim().toUpperCase();
            
            if (!key) {
                this.trackingError = "Silakan masukkan Nomor DO.";
                return;
            }
            
            const result = this.trackingList[key];
            
            if (result) {
                this.trackingResult = result;
                this.searchResultKey = key;
            } else {
                this.trackingError = `Nomor DO "${key}" tidak ditemukan.`;
            }
        },
        
        formatRupiah(value) {
            if (typeof value !== "number") {
                value = 0;
            }
            return 'Rp ' + value.toLocaleString('id-ID');
        }
    },
    
    mounted() {
        this.setTodayDate();
    }
}).mount('#tracking-app');