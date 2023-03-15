'use strict'

/**
 * Verifies the required provided goodWord toxicity.
 * @param {String} commentText - The verified text
 * @returns {Object} an object that has error and toxicity score information
 */
function processInput(commentText) {
    var Site = require('dw/system/Site');
    var toxicityUrl = Site.getCurrent().getPreferences().getCustom()['prospectiveApiUrl'];
    var toxicityKey = Site.getCurrent().getPreferences().getCustom()['prospectiveApiKey'];
    var HTTPClient = require('dw/net/HTTPClient');
    var httpClient = new HTTPClient();
    var toxicityScore;

    var toxicityRequest = {
      "comment": {
        "text": commentText
      },
      "languages": ["en"],
      "requestedAttributes": {
        "TOXICITY": {}
      }
    };

    httpClient.setRequestHeader('Content-Type', 'application/json');
    httpClient.open('POST', toxicityUrl + '?key=' + toxicityKey);
    httpClient.setTimeout(3000);
    httpClient.send(JSON.stringify(toxicityRequest));

    toxicityScore = 1.0;

    if (httpClient.statusCode == 200) {
        var parsedResult = JSON.parse(httpClient.text);
        toxicityScore = parseFloat(parsedResult.attributeScores.TOXICITY.summaryScore.value);
    }

    return {
        error: toxicityScore > 0.5,
        statusCode: httpClient.getStatusCode(),
        statusMessage: httpClient.getStatusMessage(),
        toxicityScore: toxicityScore
    };
}

function processForm(req, paymentForm, viewFormData) {
  var viewData = viewFormData;

  viewData.paymentMethod = {
    value: paymentForm.paymentMethod.value,
    htmlName: paymentForm.paymentMethod.value
  };

  return {
    error: false,
    viewData: viewFormData
  }
}

exports.processForm = processForm;
exports.processInput = processInput;