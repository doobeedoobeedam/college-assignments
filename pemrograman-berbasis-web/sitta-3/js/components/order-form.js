const OrderForm = {
    template: '#tpl-order',
    props: ['paketList', 'ekspedisiList', 'stokList'],
    data() {
        return {
            form: {
                nim: '', nama: '', paket: '', ekspedisi: '', tanggal: ''
            }
        };
    },
    computed: {
        selectedPaketData() {
            return this.paketList.find(p => p.kode === this.form.paket);
        },
        totalHarga() {
            return this.selectedPaketData ? this.selectedPaketData.harga : 0;
        },
        detailIsiPaket() {
            if (!this.selectedPaketData) return [];
            return this.selectedPaketData.isi.map(kode => {
                const item = this.stokList.find(s => s.kode === kode);
                return item ? item : { kode: kode, judul: 'Unknown' };
            });
        }
    },
    methods: {
        formatRupiah(val) { return 'Rp ' + val.toLocaleString('id-ID'); },
        submitForm() {
            // Validasi
            if (!this.form.nim || !this.form.paket) {
                alert("Mohon lengkapi data!"); 
                return;
            }

            const newDO = {
                nim: this.form.nim,
                nama: this.form.nama,
                status: "Pesanan Diterima",
                ekspedisi: this.form.ekspedisi,
                tanggalKirim: this.form.tanggal,
                paket: this.form.paket,
                total: this.totalHarga,
                perjalanan: [{ waktu: new Date().toLocaleString(), keterangan: "Order dibuat" }]
            };

            this.$emit('save-do', newDO);
            alert("DO Berhasil dibuat!");
            // Reset form
            this.form.nim = ''; 
            this.form.paket = '';
        }
    }
};