import { argv, exit } from 'node:process';

let { product_value, transport_fee } = 0;
// REF: https://focusnfe.com.br/blog/tabela-icms
let icms_tax = 17;

function showHelp() {
    console.log("This program shows how much you will be spending buying in an international marketplace if you are Brazilian.");
    console.log("The values are in 'REAIS' using the current 'USD-DOLLAR' through an open api to get the cotation ('https://docs.awesomeapi.com.br/api-de-moedas').");
    console.log("\nUsage:");
    console.log("\t--h\t\tShow this info.");
    console.log("\t--p=0.00\tValue of the product.");
    console.log("\t--tf=0.00\tValue of the transport fee (Default value is 0).");
    console.log("\t--icms=17\tValue of the tax for instate and interstate operations (Default value is 17% - use porcentage).");
    return 0;
}

function setupArgs() {
    argv.forEach((val) => {
        if (val.includes('--h')) {
            showHelp();            
        }
        if (val.includes('--p')) {
            product_value = val.split('=')[1];
            if (product_value == undefined) {
                exit(1);
            }
        }
        if (val.includes('--tf')) {
            transport_fee = val.split('=')[1];
            if (transport_fee == undefined) {
                exit(1)
            }
        }
        if (val.includes('--icms')) {
            icms_tax = val.split('=')[1];
            if (icms_tax == undefined) {
                exit(1);
            }
        }
    });

    return { product_value, transport_fee, icms_tax }
}

export { setupArgs };
