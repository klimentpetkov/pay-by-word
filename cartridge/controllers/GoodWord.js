'use strict';

var server = require('server');

server.get('Presubmit', function (req, res, next) {
  var a = 1;
});

server.get('Show', function (req, res, next) {
//   var URLUtils = require('dw/web/URLUtils');
//   var System = require('dw/system/System');

//   if (System.getInstanceType() === System.PRODUCTION_SYSTEM) {
//     res.redirect(URLUtils.url('Home-ErrorNotFound'));
//   }

//   var testForm = server.forms.getForm('profile').customer;
//   var expirationMonth = server.forms.getForm('creditCard').expirationMonth;
//   testForm.expirationMonth = expirationMonth;

//   res.render('styleguide/styleguide', { testForm: testForm });
  // var BasketMgr = require('dw/order/BasketMgr');
  // var currentBasket = BasketMgr.getCurrentBasket();
  var HookMgr = require('dw/system/HookMgr');
  var toxicityResult = {empty: 1};
  var commentText = 'All machines are stupid';

  if (HookMgr.hasHook('app.payment.form.processor.goodword')
  ) {
    toxicityResult = HookMgr.callHook(
      'app.payment.form.processor.goodword',
      'processInput',
      commentText
    );
  }

  /*
  var Transaction = require('dw/system/Transaction');
  var OrderMgr = require('dw/order/OrderMgr');
  // Process Order
  var orderNo = 1;
  var order = OrderMgr.getOrder(orderNo);
  if (order && order.status.displayValue === 'CREATED') {
    Transaction.begin();
    var status = OrderMgr.placeOrder(order);
    Transaction.commit();
  }
  */
  // Goto next step

  res.json(toxicityResult);

  next();
});

module.exports = server.exports();