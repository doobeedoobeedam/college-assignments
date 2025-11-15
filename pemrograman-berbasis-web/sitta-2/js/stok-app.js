const appStok = Vue.createApp({
    data() {
        return {
            // Mengambil data
            stokList: stok,
            upbjjList: upbjjList,
            kategoriList: kategoriList,

            // Data untuk filter
            filterUPBJJ: '',
            filterKategori: '',
            filterKritis: false,

            // Data untuk sorting
            sortKey: 'judul',
            sortAsc: true,

            // Data untuk form tambah
            showAddForm: false,
            newItem: {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 10,
                catatanHTML: ''
            },

            // Data untuk modal edit
            showEditModal: false,
            editingItem: null,
            originalItem: null
        };
    },

    computed: {
        filteredAndSortedStok() {
            let filtered = this.stokList;

            // Filter
            if (this.filterUPBJJ) {
                filtered = filtered.filter(item => item.upbjj === this.filterUPBJJ);
            }
            if (this.filterKategori) {
                if (this.filterUPBJJ) {
                    filtered = filtered.filter(item => item.kategori === this.filterKategori);
                }
            }
            if (this.filterKritis) {
                filtered = filtered.filter(item => item.qty < item.safety || item.qty === 0);
            }

            // Sorting
            if (this.sortKey) {
                filtered = [...filtered].sort((a, b) => {
                    let valA = a[this.sortKey];
                    let valB = b[this.sortKey];

                    if (typeof valA === 'string') {
                        valA = valA.toLowerCase();
                        valB = valB.toLowerCase();
                    }

                    let comparison = 0;
                    if (valA > valB) {
                        comparison = 1;
                    } else if (valA < valB) {
                        comparison = -1;
                    }

                    return this.sortAsc ? comparison : -comparison;
                });
            }

            return filtered;
        }
    },

    methods: {
        getStatus(item) {
            if (item.qty === 0) {
                return {
                    text: 'Kosong',
                    class: 'status-badge status-kosong'
                };
            } else if (item.qty < item.safety) {
                return {
                    text: 'Menipis',
                    class: 'status-badge status-menipis'
                };
            } else {
                return {
                    text: 'Aman',
                    class: 'status-badge status-aman'
                };
            }
        },

        sortBy(key) {
            if (this.sortKey === key) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortKey = key;
                this.sortAsc = true;
            }
        },

        resetFilters() {
            this.filterUPBJJ = '';
            this.filterKategori = '';
            this.filterKritis = false;
        },

        addNewItem() {
            if (!this.newItem.kode || !this.newItem.judul || !this.newItem.kategori || !this.newItem.upbjj) {
                alert('Kode, Judul, Kategori, dan UPBJJ wajib diisi!');
                return;
            }
            if (this.stokList.some(item => item.kode === this.newItem.kode)) {
                alert('Kode Mata Kuliah sudah ada!');
                return;
            }

            this.stokList.push({
                ...this.newItem
            });

            // Reset form
            this.newItem = {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 10,
                catatanHTML: ''
            };
            this.showAddForm = false;
        },

        openEditModal(item) {
            this.originalItem = item;
            this.editingItem = {
                ...item
            };
            this.showEditModal = true;
        },

        saveEdit() {
            if (!this.editingItem) return;

            Object.assign(this.originalItem, this.editingItem);

            this.cancelEdit();
        },

        cancelEdit() {
            this.showEditModal = false;
            this.editingItem = null;
            this.originalItem = null;
        }
    }
}).mount('#stok-app');