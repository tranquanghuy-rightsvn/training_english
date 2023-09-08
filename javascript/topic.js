$(document).ready(function() {
  $.getJSON('./database/groups/' + get_params()['topic'] + '.json', function(object) {
    $('.title').text(object.title)
    console.log(object)
    object.exercises.map(function (exercise, index) {

      let html = "";
      html += "<p> Group " + (index + 1) + "</p>"
      exercise.words.map(function(item){
        html += "<span class='badge bg-custom'>" + item + " </span>"
      });

      $('#topics').append("<div class='col-sm-12 col-md-6'><a href='./exercise.html?id=" + exercise.id + "' ><div class='exercise'>" + html + "</div></a></div>" )
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
