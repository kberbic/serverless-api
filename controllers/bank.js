const ServerRest = require('../utils/rest.utils');

class BankController{
    addBAN(event){
        const {input: card} = event;
    }

    addIBAN(req, res, next){
        const {input: card} = event;
    }

    addCreditCard(req, res, next){

    }
}

module.exports = ServerRest.attach(new BankController());
