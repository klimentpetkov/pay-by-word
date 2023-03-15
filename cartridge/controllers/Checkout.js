'use strict'

var server = require('server');
var base = module.superModule;
server.extend(base);

var URLUtils = require('dw/web/URLUtils');

server.append('Begin', function(req, res, next) {
    var assets = require('*/cartridge/scripts/assets');
    assets.addJs('int_epay_bg/js/checkout/checkout.js');

    // TODO: fix me!
    res.setViewData({
        presubmitUrl : URLUtils.url('GoodWord-PreSubmit')
    });

    next();
});

module.exports = server.exports();