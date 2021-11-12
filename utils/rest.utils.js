const {handleServerError} = require('../errors');

class ServerRest{
    attach(obj){
        return Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
            .filter(x => x !== "constructor")
            .reduce((o, k) => {
                o[k] = (event, ...args)=> {
                    event.input = event.body ? JSON.parse(event.body) : null;
                    return obj[k](event, ...args)
                        .then((body)=>({
                            statusCode: 200,
                            body: JSON.stringify(
                                body,
                                null,
                                2
                            )
                        }))
                        .catch(handleServerError);
                }
                return o;
            }, {});
    }
}

module.exports = new ServerRest();
