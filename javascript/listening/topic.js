$(document).ready(function() {
  $.getJSON('../../database/listening/' + get_params()['topic'] + '.json', function(groups) {
    groups.map(function(group, index) {
      let id = group['id'];
      let k = index + 1;
      let title = group['title'];


      let is_done = localStorage.getItem(get_params()['topic'] + "-done-" + id);

      if(is_done == 'true'){
        $('#exercises').append("<div class='col-xs-12 col-md-6'><a href='./exercise.html?id=" + id + "&topic=" + get_params()['topic'] + "' ><div class='topic done'> <p>" + title + "</p></div></a></div>")
      }else{
        $('#exercises').append("<div class='col-xs-12 col-md-6'><a href='./exercise.html?id=" + id + "&topic=" + get_params()['topic'] + "' ><div class='topic'> <p>" + title + "</p></div></a></div>")
      }
    });
  });

  let title;
  switch(get_params()['topic']) {
    case 'conversation':
      title = "Conversations";
      break;
    case 'podcast':
      title = "Podcasts";
      break;
    case 'short_sentence':
      title = "Short sentences";
      break;
    case 'music':
      title = "Sings";
      break;
  }

  $('#topic_title').text(title);

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
