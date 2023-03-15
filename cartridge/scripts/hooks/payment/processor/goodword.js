"use strict";

var Transaction = require('dw/system/Transaction');
var collections = require('*/cartridge/scripts/util/collections');

/**
 * Verifies that entered credit card information is a valid card. If the information is valid a
 * credit card payment instrument is created
 * @param {dw.order.Basket} basket Current users's basket
 * @param {Object} paymentInformation - the payment information
 * @param {string} paymentMethodID - paymentmethodID
 * @param {Object} req the request object
 * @return {Object} returns an error object
 */
function Handle(basket, paymentInformation, paymentMethodID, req) {
    var currentBasket = basket;

    Transaction.wrap(function () {
        var paymentInstruments = currentBasket.getPaymentInstruments(
            'GOOD_WORD'
        );

        collections.forEach(paymentInstruments, function (item) {
            currentBasket.removePaymentInstrument(item);
        });

        var paymentInstrument = currentBasket.createPaymentInstrument(
            'GOOD_WORD', currentBasket.totalGrossPrice
        );
    });

    return {
        error: false
    }
}

function Authorize() {
    return {
        error: false
    }
}

exports.Handle = Handle;
exports.Authorize = Authorize;