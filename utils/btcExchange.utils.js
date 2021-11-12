import axios from 'axios';
import {format} from 'date-fns';

export class BTCExchange {

    static mappers = {
        BTCBAM: {
            from: 'BTC',
            to: 'USD',
            currency: 'USD',
            getRates: BTCExchange.getBAMRates
        },
        DOGEBAM: {
            from: 'DOGE',
            to: 'USDT',
            currency: 'USD',
            getRates: BTCExchange.getBAMRates
        }
    }

    static getCryptoRates(){
        return axios.get('https://api.exchange.bitcoin.com/api/2/public/ticker').then(({data})=> data);
    }

    static getCryptoRatesById(from, to){
        return axios.get(`https://api.exchange.bitcoin.com/api/2/public/ticker/${from}${to}`).then(({data})=> data);
    }

    static getBAMRates() {
        const data = format(new Date(), "MM/dd/yyyy 00:00:00");
        return axios.get(`https://www.cbbh.ba/CurrencyExchange/GetJson?date=${encodeURIComponent(data)}`).then(({data})=> data);
    }

    static async getRates(from, to){
        const key = `${from}${to}`
        const fiat = BTCExchange.mappers[key];
        const crypto = await BTCExchange.getCryptoRatesById(fiat.from, fiat.to);
        const {CurrencyExchangeItems} = await fiat.getRates();
        const rate = CurrencyExchangeItems.find(x=> x.AlphaCode === fiat.currency);
        crypto.id = key;
        delete crypto.symbol;

        rate.Middle = rate.Middle.replace(',','.')
        crypto.original = {rate};

        const props = ['ask','bid','last','low','high','open','bid','bid'];
        props.forEach(p=> {
            crypto.original[p] = crypto[p];
            crypto[p] = Number(crypto[p]) * Number(rate.Middle).toFixed(5)
        });
        return crypto;
    }

    static async calculate(amount, from, to) {
        const output = await BTCExchange.getRates(from.id, to.id);

        const transactionFee = Number(from.payoutFee)
        const payoutFee = Number(to.payoutFee)
        const amountOut = Number(amount) - Number(transactionFee);
        const calcAmount = (Number(amount - transactionFee) * Number(output.last));
        return {
            amount,
            amountOut,
            amountFee: from.payoutFee,
            exchange: output.last,
            payoutWithoutFee: calcAmount.toFixed(to.precisionPayout),
            payout: (calcAmount - (calcAmount * payoutFee)).toFixed(to.precisionPayout),
            payoutFee: to.payoutFee,
            rates: output
        }
    }
}
