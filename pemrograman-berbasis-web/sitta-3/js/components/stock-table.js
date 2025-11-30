const StockTable = {
    template: '#tpl-stock',
    components: {
        'status-badge': StatusBadge
    },
    props: ['initialData'],
    data() {
        return {
            stokList: [],
            // Filter Data
            filterUPBJJ: '',
            filterKategori: '',
            filterKritis: false,

            showAddModal: false,
            newItem: {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                harga: 0,
                qty: 0,
                safety: 10,
                lokasiRak: '',
                catatanHTML: ''
            },

            // Edit State
            showEditModal: false,
            editingItem: null,

            // Sorting Data
            sortKey: 'judul', // Default sort berdasarkan judul
            sortAsc: true, // Default Ascending (A-Z)

            // Edit Data
            showEditModal: false,
            editingItem: null,

            upbjjOptions: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
            kategoriOptions: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"]
        };
    },
    watch: {
        initialData: {
            immediate: true,
            handler(newData) {
                if (newData && newData.length > 0) this.stokList = [...newData];
            }
        },
        filterUPBJJ(newVal) {
            if (newVal === '') this.filterKategori = '';
        }
    },
    computed: {
        filteredStok() {
            let data = this.stokList;

            // FILTERING
            if (this.filterUPBJJ) data = data.filter(i => i.upbjj === this.filterUPBJJ);
            if (this.filterKategori) data = data.filter(i => i.kategori === this.filterKategori);
            if (this.filterKritis) data = data.filter(i => i.qty < i.safety || i.qty === 0);

            // SORTING
            return data.sort((a, b) => {
                let mod = this.sortAsc ? 1 : -1;

                // Ambil nilai berdasarkan key (judul/qty/harga)
                let valA = a[this.sortKey];
                let valB = b[this.sortKey];

                // Jika sorting teks = judul, ubah ke lowercase agar tidak case-sensitive
                if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) return -1 * mod;
                if (valA > valB) return 1 * mod;
                return 0;
            });
        }
    },
    methods: {
        formatRupiah(val) {
            return typeof val === 'number' ? 'Rp ' + val.toLocaleString('id-ID') : 'Rp 0';
        },

        // FITUR SORTING
        sort(key) {
            // Kalau klik kolom yang sama, balik arah (Asc <--> Desc)
            if (this.sortKey === key) {
                this.sortAsc = !this.sortAsc;
            } else {
                // Kalau klik kolom baru, set jadi Ascending default
                this.sortKey = key;
                this.sortAsc = true;
            }
        },

        // FITUR RESET FILTER
        resetFilters() {
            this.filterUPBJJ = '';
            this.filterKategori = '';
            this.filterKritis = false;
            this.sortKey = 'judul';
            this.sortAsc = true;
        },

        hapusItem(kode) {
            if (confirm('Yakin ingin menghapus ' + kode + '?')) {
                const idx = this.stokList.findIndex(i => i.kode === kode);
                if (idx > -1) this.stokList.splice(idx, 1);
            }
        },
        editItem(item) {
            this.editingItem = {
                ...item
            };
            this.showEditModal = true;
        },
        saveEdit() {
            const index = this.stokList.findIndex(i => i.kode === this.editingItem.kode);
            if (index !== -1) {
                this.stokList[index] = {
                    ...this.editingItem
                };
                alert(`Data ${this.editingItem.kode} berhasil diperbarui!`);
            }
            this.cancelEdit();
        },
        cancelEdit() {
            this.showEditModal = false;
            this.editingItem = null;
        },
        openAddModal() {
            // Reset form setiap kali dibuka
            this.newItem = {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                harga: null,
                qty: null,
                safety: 10,
                lokasiRak: '',
                catatanHTML: ''
            };
            this.showAddModal = true;
        },

        closeAddModal() {
            this.showAddModal = false;
        },

        saveNewItem() {
            // (Sebetulnya sudah di-handle oleh atribut 'required' di HTML, tapi di-double check di JS)
            if (!this.newItem.kode || !this.newItem.judul || !this.newItem.kategori || !this.newItem.upbjj) {
                alert("Mohon lengkapi semua field bertanda bintang (*)");
                return;
            }

            // Cek apakah kode MK sudah ada di stokList
            const isDuplicate = this.stokList.some(item => item.kode === this.newItem.kode.toUpperCase());
            if (isDuplicate) {
                alert(`Kode Mata Kuliah ${this.newItem.kode} sudah ada! Mohon gunakan kode lain.`);
                return;
            }

            // Push object baru ke array stokList
            this.stokList.push({
                ...this.newItem,
                kode: this.newItem.kode.toUpperCase() // Format kode jadi huruf besar
            });

            alert("Data berhasil ditambahkan!");
            this.closeAddModal();
        }
    }
};