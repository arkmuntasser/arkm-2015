var bannerEl = document.querySelector('[data-social-banner]');

var twittrURL = 'https://docs.google.com/spreadsheets/d/1WZm_0b5TgN9wLmwCbWztuMggzo6s8n2Y2cf__kGMJ4Y/pubhtml?gid=0&single=true&output=html';

var instagramURL = 'https://docs.google.com/spreadsheets/d/1WpuD0GvstX6gqIrMXWjqtM7GYt23UQ0Lf_LbYU1wz4I/pubhtml'

function init() {
  Tabletop.init({
    key: instagramURL,
    callback: showInfo,
    simpleSheet: true
  });
}

function showInfo(data, tabletop) {
  data = data.reverse();

  bannerEl.style.backgroundImage = 'url(' + data[0].image + ')';

  var caption = data[0].text.replace(' #ark', '');
  bannerEl.querySelector('[data-social-banner-caption]').innerHTML = caption;
  bannerEl.querySelector('[data-social-banner-date]').innerHTML = data[0].date.toLowerCase().split(' at ')[0];
}

document.addEventListener('DOMContentLoaded', function() {
  init();
});
