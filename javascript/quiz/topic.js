$(document).ready(function() {
  $.getJSON('../../database/quiz/' + get_params()['topic'] + '.json', function(groups) {
    groups.map(function(group, index) {
      let id = group['id'];
      let k = index + 1;

      let is_done = localStorage.getItem(get_params()['topic'] + "-done-" + id);
      if(is_done == 'true'){
        $('#quiz_categories').append("<div class='col-xs-12 col-sm-6 sol-md-4 col-lg-2'><a href='./exercise.html?id=" + id + "&topic=" + get_params()['topic'] + "' ><div class='topic done'> <p>Exercise " + k + "</p></div></a></div>")

      }else{
        $('#quiz_categories').append("<div class='col-xs-12 col-sm-6 sol-md-4 col-lg-2'><a href='./exercise.html?id=" + id + "&topic=" + get_params()['topic'] + "' ><div class='topic'> <p>Exercise " + k + "</p></div></a></div>")
      }
    });
  });

  let title;
  switch(get_params()['topic']) {
    case 'tense':
      title = "12 tenses";
      break;
    case 'synonyms_anonyms':
      title = "Synonym Word";
      break;
    case 'synonym_sentence_matching':
      title = "Synonym Sentence Matching";
      break;
    case 'word_form':
      title = "Word Form";
      break;
    case 'preposition':
      title = "Preposition/Phrasal Verb";
      break;
    case 'idiom':
      title = "Idiom";
      break;
    case 'vocabulary':
      title = "Vocabulary";
      break;
    case 'conjuction':
      title = "Conjuction";
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
