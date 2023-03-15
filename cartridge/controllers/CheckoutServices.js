'use strict';

var server = require('server');

var base = module.superModule;
server.extend(base);

var Encoding = require('dw/crypto/Encoding');
var BasketMgr = require('dw/order/BasketMgr');
var OrderMgr = require('dw/order/OrderMgr');
var WeakMac = require('dw/crypto/WeakMac');
var Bytes = require('dw/util/Bytes');
var URLUtils = require('dw/web/URLUtils');
var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var Transaction = require('dw/system/Transaction');
var Site = require('dw/system/Site');

server.prepend('PlaceOrder', server.middleware.https, function (req, res, next) {
    next();
});

server.append('PlaceOrder', function (req, res, next) {
    next();
});

module.exports = server.exports();