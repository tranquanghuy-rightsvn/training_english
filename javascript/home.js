$(document).ready(function() {
  $.getJSON('./database/i18n.json', function(langs) {
    let lg = "";
    if(get_params()['lang'] == undefined){
      lg = 'en';
    }else{
      lg = get_params()['lang'];
    }

    let current = langs.filter(function(lang) {
      return lang['lang'] == lg;
    })[0];

    $('.content-home').html(current['content']);
  });
});


function get_params(){
  var queryString = window.location.search;

  queryString = queryString.slice(1);

  var params = {};

  var paramPairs = queryString.split("&");

  for (var i = 0; i < paramPairs.length; i++) {
      var pair = paramPairs[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1] || "");
      params[key] = value;
  }

  return params
}
