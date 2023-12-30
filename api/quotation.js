import { exit } from 'node:process';

async function getDollarQuotation() {
    try {
        return fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
            .then(response => response.json())
            .then(data => data['USDBRL']['bid']);
    } catch (e) {
        console.log(e);
        exit(1);
    }
}

export { getDollarQuotation };
