import axios from 'axios';
import {format} from 'date-fns';

export class BTCPay {
    static createInvoice(storeId, invoice) {
        console.log(invoice)
        return axios.post(`https://btcpay.eastus.cloudapp.azure.com/api/v1/stores/${storeId}/invoices`, invoice, {
            headers: {
                Authorization: `token ${process.env.BTC_API_KEY}`
            }
        }).then(({data}) => data);
    }

    static getInvoicePaymentMethod(storeId, invoiceId){
        return axios.get(`https://btcpay.eastus.cloudapp.azure.com/api/v1/stores/${storeId}/invoices/${invoiceId}/payment-methods`, {
            headers: {
                Authorization: `token ${process.env.BTC_API_KEY}`
            }
        }).then(({data}) => data);
    }
}
