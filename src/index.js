require("dotenv").config();
const Events = require("events");
const { Application } = require("express");
const _Events = require("./events");

// Change name of the class.
module.exports = class Template {
    /**
     * 
     * @param {Events} mainEvent 
     * @param {Application} server 
     * @param {{
     *  CategoryModel: CategoryModel,
     *  CustomerModel: CustomerModel,
     *  ImageModel: ImageModel,
     *  InvoiceModel: InvoiceModel,
     *  OrderModel: OrderModel,
     *  ProductModel: ProductModel,
     *  TransactionsModel: TransactionsModel,
     *  ConfigurableOptionsModel: ConfigurableOptionsModel
     * }} models 
     * @param {Object} Logger
     * @param {{
     *  Admin: CacheAdmin,
     *  Customer: CacheCustomer,
     *  Product: CacheProduct,
     *  Transaction: CacheTransactions,
     *  Order: CacheOrder,
     *  Invoice: CacheInvoice,
     *  f_orders: ce_orders
     * }} MainCache
     */
    constructor(mainEvent, server, models, Logger, MainCache) {
        // Contains all events to listen to.
        _Events(mainEvent, server, models, Logger, MainCache);
        // The event listner, which will be called when the event is emitted.
        this.mainEvent = mainEvent;
        // The express server.
        this.server = server;
        // The models for our database, like fetching from it or modified etc.
        this.models = models;
        // The logger.
        this.Logger = Logger;
    }
}
