const app = Vue.createApp({
    data() {
        return {
            currentTab: 'stok',
            sharedData: {
                stok: [],
                paket: [],
                pengirimanList: [],
                tracking: []
            }
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            const data = await apiService.getData();
            if (data) {
                this.sharedData.stok = data.stok;
                this.sharedData.paket = data.paket;
                this.sharedData.pengirimanList = data.pengirimanList;
                this.sharedData.tracking = data.tracking;
            }
        },
        handleNewDO(newData) {
            const nextNum = this.sharedData.tracking.length + 1;
            const doCode = `DO2025-${String(nextNum).padStart(4, '0')}`;
            
            const newEntry = {};
            newEntry[doCode] = newData;
            
            this.sharedData.tracking.push(newEntry);
            
            // Pindah tab ke tracking otomatis
            this.currentTab = 'tracking';
        }
    }
});

// Registrasi komponen
app.component('ba-stock-table', StockTable);
app.component('order-form', OrderForm);
app.component('do-tracking', DoTracking);
app.component('status-badge', StatusBadge);

app.mount('#app');