$(document).ready(function() {
  $.getJSON('../../database/quiz/' + get_params()['topic'] + '.json', function(groups) {
    let exercise = groups.filter(function(teams) {
      return teams['id'] == get_params()['id'];
    });

    $('.title').text("Exercise " + get_params()['id'])
    exercise.map(function(quizzes){
      quizzes['quizzes'].map(function(quiz, index){
        let tab = 1;
        if(index > 9 && index <= 19){
          tab = 2
        }else if(index > 19 && index <= 29){
          tab = 3
        }else if(index > 29 && index <= 39){
          tab = 4
        }

        let k = index + 1;
        let corect = quiz['correct']
        let html = '';
        html += "<div class='quiz-data quiz_" + k + "' data-success=" + quiz['correct'] +">"
        html += "<p>" + k + ". ";
        html += quiz['title'] + "</p>"
        html += "<button class='btn-choice' data-choice='a'> A. " + quiz['a'] + "</button><br/>"
        html += "<button class='btn-choice' data-choice='b'>B. " + quiz['b'] + "</button><br/>"
        html += "<button class='btn-choice' data-choice='c'>C. " + quiz['c'] + "</button><br/>"
        html += "<button class='btn-choice' data-choice='d'>D. " + quiz['d'] + "</button><br/>"
        html += "</div>";
        $('#page-'+ tab).append(html);
      });
    });

    $("button.btn-choice").click(function() {
      $(this).addClass("checked");
      $(this).siblings().removeClass("checked")
    });
  });

  $('#back_to_topic').attr("href", "./topic.html?topic=" + get_params()['topic'])

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

function submit_exercise(){
  var elements = Array.from(document.getElementsByClassName('quiz-data'));

  let corect_quiz = 0;

  elements.map(function(element) {
    let button = $(element).find('button.checked');
    let successData = element.dataset.success;
    if(successData == button.data('choice')){
      button.addClass('btn-corect');
      button.siblings('button').removeClass('btn-incorect');
      button.siblings('button').removeClass('btn-corect');
      corect_quiz += 1;
    }else{
      button.addClass('btn-incorect');
      button.siblings('button').removeClass('btn-corect');
      button.siblings('button').removeClass('btn-incorect');
    }
  });

  $('.result').html("<p>Corect quizzes: " + corect_quiz + "/40</p>");
  if(corect_quiz/40 >= 2/3){
    localStorage.setItem(get_params()['topic'] + "-done-" + get_params()['id'], 'true');
  }else{
    localStorage.removeItem(get_params()['topic'] + "-done-" + get_params()['id'])
  }
}
