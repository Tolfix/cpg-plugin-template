module.exports = class Events {

    constructor(mainEvent, server, models, Logger, MainCache) {
        
        this.mainEvent = mainEvent;

        this.mainEvent.on("invoice_created", invoice => {
            
        });

        this.mainEvent.on("invoice_deleted", invoice => {
            
        });

        this.mainEvent.on("invoice_updated", invoice => {
            
        });

        this.mainEvent.on("invoice_paid", invoice => {
            
        });

        this.mainEvent.on("invoice_notified", invoice => {
            
        });

        this.mainEvent.on("order_created", order => {
            
        });

        this.mainEvent.on("order_deleted", order => {
            
        });

        this.mainEvent.on("order_updated", order => {
            
        });

        this.mainEvent.on("categories_created", categorie => {
            
        });

        this.mainEvent.on("categories_deleted", categorie => {
            
        });

        this.mainEvent.on("categories_updated", categorie => {
            
        });

        this.mainEvent.on("product_created", product => {
            
        });

        this.mainEvent.on("product_deleted", product => {
            
        });

        this.mainEvent.on("product_updated", product => {
            
        });

        this.mainEvent.on("customer_created", customer => {
            
        });

        this.mainEvent.on("customer_deleted", customer => {
            
        });

        this.mainEvent.on("customer_updated", customer => {
            
        });

        this.mainEvent.on("images_created", image => {
            
        });

        this.mainEvent.on("images_deleted", image => {
            
        });

        this.mainEvent.on("images_updated", image => {
            
        });

        this.mainEvent.on("transaction_created", transaction => {
            
        });

        this.mainEvent.on("transaction_deleted", transaction => {
            
        });

        this.mainEvent.on("transaction_updated", transaction => {
            
        });

        this.mainEvent.on("configurable_options_created", configurable_option => {
            
        });

        this.mainEvent.on("configurable_options_deleted", configurable_option => {
            
        });

        this.mainEvent.on("configurable_options_updated", configurable_option => {
            
        });

        this.mainEvent.on("quotes_created", quote => {
            
        });

        this.mainEvent.on("quotes_deleted", quote => {
            
        });

        this.mainEvent.on("quotes_updated", quote => {
            
        });

    }

}