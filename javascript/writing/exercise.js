$(document).ready(function() {
  $.getJSON('../../database/writing/' + get_params()['topic'] + '.json', function(groups) {
    let exercise = groups.filter(function(teams) {
      return teams['id'] == get_params()['id'];
    })[0];

    $('.title').html("<b>Question:</b> " + exercise['title'])
    $('#page-2').html("<p>" + exercise['contents'][0] + "</p>");
    $('#page-3').html("<p>" + exercise['contents'][1] + "</p>");
    if(localStorage.getItem(key_store()) != null){
      $('#your-essay').val(localStorage.getItem(key_store()));
    }
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

function submit_exersice(){
  let content = $('#your-essay').val();
  if(content != ''){
    localStorage.setItem(key_store(), content);
    localStorage.setItem(get_params()['topic']  + '-done-' + get_params()['id'], 'true');
    alert("Saved!")

  }else{
    alert("Please write something!")
  }
}

function key_store(){
  return get_params()['topic'] + "--" + get_params()['id']
}
