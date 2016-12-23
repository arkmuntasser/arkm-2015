window.onload = function() { init() };
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1WZm_0b5TgN9wLmwCbWztuMggzo6s8n2Y2cf__kGMJ4Y/pubhtml';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });
}

function showInfo(data, tabletop) {
  console.log('Success: ', data);
}
