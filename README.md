<p align="center">
  <a href="https://tolfix.com/" target="_blank"><img width="260" src="https://cdn.tolfix.com/images/TX-Small.png"></a>
  <br/>
  CPG-Plugin-Template
</p>

# ⭐ | CPG-Plugin-Template
Plugin template for CPG.

# 📝 | Creating `module`
Modules can be used for products, perhaps you are selling a game server, and when they purchase the product you want to create a server.
Modules make this possible and easier.

## General setup
You'll need to listen on `invoice_paid` so you can fetch products ids and check if they have the respective `module_name`.
If a product has your `module_name` you can proceed to check if they have the matching attributes in `modules` to generate whatever you need in that process.

## Example file
```ts
require("dotenv").config();
const BuildDir = process.cwd() + "/build";
// @ts-ignore
import type { ILoggingTypes } from "@cpg/Interfaces/Logging.interface";
// @ts-ignore
import type mainEvent from "@cpg/Events/Main.event";
// @ts-ignore
import type { server } from "@cpg/Server/Server"; 
// @ts-ignore
import type cs from "@cpg/Database/Models/Customers/Customer.model";
// @ts-ignore
import type pm from "@cpg/Database/Models/Products.model";
// @ts-ignore
import type { sendEmail as sE } from "@cpg/Email/Send"
import config from "../config.json";

// Change name of the class.
export = async function main()
{
    const Logger = (await import(`${BuildDir}/Lib/Logger`)).default as ILoggingTypes;
    const MainEvent = (await import(`${BuildDir}/Events/Main.event`)).default as typeof mainEvent;
    const Server = (await import(`${BuildDir}/Server/Server`)).server as typeof server;
    const sendEmail = (await import(`${BuildDir}/Email/Send`)).sendEmail as typeof sE;
    const CustomerModel = (await import(`${BuildDir}/Database/Models/Customers/Customer.model`)).default as typeof cs;
    const ProductModel = (await import(`${BuildDir}/Database/Models/Products.model`)).default as typeof pm;
    Logger.info(`Starting ${config.name} plugin with version ${config.version}.`);

    const module_name = "cpg-plugin-emails";
    const module_attr = {
        header_text: "Header text file for product",
    }

    Server.get(`/modules/${module_name}`, (req, res) =>
    {
        res.send(module_attr);
    });

    MainEvent.on(`invoice_paid`, async (invoice) =>
    {
        const customer = await CustomerModel.findOne({ $or: [
            { uid: invoice.customer_uid },
            { id: invoice.customer_uid }
        ] });
        if(!customer)
            return;
        // find all products in the invoice.items..product_id
        const products = await ProductModel.find({ id: { $in: invoice.items.map(i => i.product_id) } });
        Logger.debug(`Found ${products.length} products in invoice.`);
        // Check if any of the products has module.
        // Filter them
        const mProducts = products.filter(p => p.module_name.includes(module_name));
        Logger.debug(`Found ${mProducts.length} products with module.`);
        if(mProducts.length <= 0)
            return;

        mProducts.forEach(p =>
        {
            // Get header_text from p.modules
            const header_text = p.modules.find(m => m.name === "header_text");
            if(!header_text)
                return;
            Logger.debug(`Found header_text: ${header_text.value}`);
            sendEmail({
                receiver: customer?.personal.email,
                subject: `Product specific email`,
                body: {
                    body: `<h1>${header_text.value}</h1>`,
                }
            })
        });
    });
}
```

# 📝 | Custom payment methods
If you want to create your own payment method for `CPG` there is a way.
This might be useful if your plugin has a third party payment gateway that isn't added to `CPG` officialy yet.

# ⚙ | Setup
First of come up with a uniqe `payment_metod` name. This name will be used when proceeding on `orders/place`.

## Setup | API
Once a name has been decided, proceed to add it in `payment_methods` (v3/configs/payment_methods) in the API. This will ensure is accepted on checking and won't fail.

## Setup | Plugin
Now you need to create some methods to make this work, and import correct files to ensure it goes through without issues.
You might also need to create custom routes, but we won't go through on this.

```ts
require("dotenv").config();
const BuildDir = process.cwd() + "/build";
// @ts-ignore
import type { ce_orders as ce_orders_type } from "@cpg/Lib/Orders/PlaceOrder";
// @ts-ignore
import type { A_CC_Payments as A_CC_Payments_type } from "@cpg/Types/PaymentMethod";
// @ts-ignore
import type { sendEmail as sE } from "@cpg/Email/Send"
import config from "../config.json";
// Change name of the class.
export = async function main()
{
    const ce_orders = (await import(`${BuildDir}/Lib/Orders/PlaceOrder`)).ce_orders as typeof ce_orders_type;
    const A_CC_Payments = (await import(`${BuildDir}/Types/PaymentMethod`)).A_CC_Payments as typeof A_CC_Payments_type;

    const payment_method_name = "steam" as const;
    A_CC_Payments.push(payment_method_name);

    // @ts-ignore
    ce_orders.set(payment_method_name, (order, invoice, req, res, next) =>
    {
        // Handle order/invoice
    });
}

```

# 📢 | Contribute
Want to contribute? Great! You can contribute by `forking` this repository, then make changes and make a `PR`!

Or simple ask on our [`discord server`](https://discord.tolfix.com).

# 🔮 | Discord
[![Discord](https://discord.com/api/guilds/833438897484595230/widget.png?style=banner4)](https://discord.tolfix.com)

# ⚙ | Tolfix
**Tolfix** is a `company` focusing about `IT`, `Development` and `Networking`, we drive to help others with their `problems` when it comes to `IT` and love contributing to others.
Want to find more information about us you can visit us at [`https://tolfix.com/`](https://tolfix.com/).
