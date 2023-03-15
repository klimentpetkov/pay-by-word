'use strict';

function initialize() {
    $('body').on('checkout:updateCheckoutView', function() {
        // Should do this only if the selected payment method is epay.bg
        setTimeout(function() {
            $('.payment-details').html('Good-Word');
        }, 500);
    });

    // $('.place-order').html('Go to ePay.bg to finish the order').data('action', '').off('click').on('click', function() {
    //     window.location.href = $('#epay-bg-controller').data('action');
    // });
}

initialize();

module.exports = {
    initialize: initialize
}