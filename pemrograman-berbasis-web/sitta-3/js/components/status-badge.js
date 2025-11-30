const StatusBadge = {
    template: '#tpl-badge',
    props: ['qty', 'safety'],
    computed: {
        statusInfo() {
            if (this.qty === 0) return { text: 'Kosong', class: 'status-badge status-kosong' };
            if (this.qty < this.safety) return { text: 'Menipis', class: 'status-badge status-menipis' };
            return { text: 'Aman', class: 'status-badge status-aman' };
        },
        badgeClass() { return this.statusInfo.class; },
        text() { return this.statusInfo.text; }
    }
};