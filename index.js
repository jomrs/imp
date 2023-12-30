import { setupArgs } from './utils/args.js';
import { getDollarQuotation } from './api/quotation.js';

let { product_value, transport_fee, icms_tax } = setupArgs();
const dollar_current = await getDollarQuotation();
let flag_above_50 = false;
let final_princing = 0;

const fullprice = (product_value/dollar_current) + (transport_fee/dollar_current);
let fullprice_real = fullprice * dollar_current;

// if above 50 dollars then it should apply more taxes.
if (fullprice > 50) {
    flag_above_50 = true;
    // We need to add a 60% of the product value + transport fee to original price
    // then with this value you have to apply the ICMS*
    // its important to note that this 60% tax only applies as the gov program "Remessa Conforme"
    // that forces the international marketplace add this value in the price of the product.
    final_princing = fullprice_real + ((fullprice_real * 60)/100);
    // and since ICMS is an instante and interstate tax it only applies when the product is in Brazil.
    final_princing = final_princing + ((final_princing * icms_tax)/100);
} else {// if its bellow 50 dollars, then only ICMS* is applied.
    final_princing = fullprice_real + ((fullprice_real * icms_tax)/100);
}

console.table({
    "icms_tax": icms_tax + "%",
    "more_than_50_dollars": flag_above_50,
    "product_value": "R$ " + Number(product_value).toFixed(2) + " REAIS",
    "transport_fee": "R$ " + Number(transport_fee).toFixed(2) + " REAIS",
    "current_dollar": "R$ " + Number(dollar_current).toFixed(2) + " REAIS",
    "final_pricing": "R$ " + Number(final_princing).toFixed(2) + " REAIS",
    "final_pricing_USD": "R$ " + Number(final_princing/dollar_current).toFixed(2) + " USD"
});
