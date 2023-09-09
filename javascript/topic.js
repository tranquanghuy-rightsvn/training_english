$(document).ready(function() {
  $.getJSON('./database/groups/' + get_params()['topic'] + '.json', function(object) {
    $('.title').text(object.title)
    object.exercises.map(function (exercise, index) {

      let html = "";
      html += "<p> Group " + (index + 1) + "</p>"
      exercise.words.map(function(item){
        html += "<span class='badge bg-custom'>" + item + " </span>"
      });

      $('#topics').append("<div class='col-sm-12 col-md-6'><a href='./exercise.html?id=" + exercise.id + "' ><div class='exercise'>" + html + "</div></a></div>" )
    })
  })
  .fail(function() { window.location.href = "/"; });

  const general_topics = ['all_adjective', 'arts_entertainment_literature', 'basic_science_academia', 'crime_the_law', 'feeling_qualities_states', 'food_eating', 'heal_the_body', 'lots_of_nouns', 'money_work', 'nouns_verbs_both', 'phrasal_verbs', 'structures_places_objects', 'the_natural_wolrd', 'the_political_world', 'the_social_world', 'transitions', 'verbs_verbs_and_verbs', 'war_violence_conflict']

  if(general_topics.includes(get_params()['topic'])){
    $('#back_to_category').attr("href", "./general_vocabulary.html")
  }else{
    $('#back_to_category').attr("href", "./academic_vocabulary.html")
  }
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
