$(document).ready(function() {
  $.getJSON('./database/quiz/' + get_params()['topic'] + '.json', function(groups) {
    groups.map(function(group, index) {
      let id = group['id'];
      let k = index + 1;
      $('#quiz_categories').append("<div class='col-xs-12 col-sm-6 sol-md-4 col-lg-2'><a href='./quiz/exercise.html?id=" + id + "' ><div class='topic'> Exercise " + k + "</div></a></div>")
    });
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
