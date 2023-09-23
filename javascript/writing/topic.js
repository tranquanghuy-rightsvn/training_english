$(document).ready(function() {
  $.getJSON('../../database/writing/' + get_params()['topic'] + '.json', function(groups) {
    groups.map(function(group, index) {
      let id = group['id'];
      let k = index + 1;
      let title = group['title'];
      let is_done = localStorage.getItem(get_params()['topic'] + "-done-" + id);

      if(is_done == 'true'){
        $('#exercises').append("<div><a href='./exercise.html?id=" + id + "&topic=" + get_params()['topic'] + "' ><div class='topic-custom done'> <p>" + k + ". " + title + "</p></div></a></div>")
      }else{
        $('#exercises').append("<div><a href='./exercise.html?id=" + id + "&topic=" + get_params()['topic'] + "' ><div class='topic-custom'> <p>" + k + ". " + title + "</p></div></a></div>")
      }
    });
  });

  let title;
  switch(get_params()['topic']) {
    case 'advantage_and_disadvantage':
      title = "Advantage and Disadvantage";
      break;
    case 'agumentative_opinion_agree_or_disagree':
      title = "Agumentative/Opinion/Agree or Disagree";
      break;
    case 'prolem_and_solution':
      title = "Problem & Solution";
      break;
    case 'discussion_both_views':
      title = "Discussion (Disscuss both views)";
      break;
    case 'two_part_question':
      title = "2-part Question";
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
