$(document).ready(function() {
  $.getJSON('../../database/reading/data.json', function(groups) {
    let exercise = groups.filter(function(teams) {
      return teams['id'] == get_params()['id'];
    })[0];

    const has_gap = $.grep((exercise['groups']), function(group) {
      return group.hasOwnProperty('type') && group.type === 'gap';
    }).length > 0;

    if(has_gap){
      $('.button').append("<button class='btn btn-warning mgb-1' onclick='view_result()'> View Result</button>");
    }

    $('.content-text').html(exercise['content']);
    $('#topic_title').text(exercise['name']);

    exercise['groups'].map(function(group, j){
      let l = j + 1;
      if(group['type'] == 'gap'){
        $('.exercises').append("<div class='box-quiz gap-" + l + "'></div>")
        $('.gap-' + l).append("<h4>" + group['title'] + "</h4>");

        group['quizzes'].map(function(quiz, i){
          let k = i + 1;
          $('.gap-' + l).append("<p>" + k + ". " + quiz + "</p>")
        })

        $('.gap-' + l + " " + "span").each(function () {
          var spanText = $(this).text();
          var inputElement = $('<input type="text">');
          inputElement.attr('data-success', spanText);
          $(this).replaceWith(inputElement);
        });
      }else if(group['type'] == 'multi'){
        $('.exercises').append("<div class='box-quiz multi-" + l + "'></div>")
        $('.multi-' + l).append("<h4>" + group['title'] + "</h4>");

        group['quizzes'].map(function(quiz, i){
          let k = i + 1;

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
          $('.multi-' + l).append(html);
        })

        $("button.btn-choice").click(function() {
          $(this).addClass("checked");
          $(this).siblings().removeClass("checked")
        });
      }else if(group['type'] == 'true_false'){
        $('.exercises').append("<div class='box-quiz true-false-" + l + "'></div>")
        $('.true-false-' + l).append("<h4>" + group['title'] + "</h4>");
        group['quizzes'].map(function(quiz, i){
          let k = i + 1;
          let html = '';
          html += "<p>" + k + ". " + quiz['title'];
          html += "<select data-success='" + quiz['correct'] + "'>";
          html += "<option>Please choose</option>";
          html += "<option value='t'>TRUE</option>"
          html += "<option value='f'>FALSE</option>"
          html += "<option value='n'>NOT GIVEN</option>"
          html += "</select>"
          html += "</p>"

          $('.true-false-' + l).append(html)
        })
      }
    });
  });

  // let title;
  // switch(get_params()['topic']) {
  //   case 'tense':
  //     title = "12 tenses";
  //     break;
  //   case 'synonyms_anonyms':
  //     title = "Synonym Word";
  //     break;
  //   case 'synonym_sentence_matching':
  //     title = "Synonym Sentence Matching";
  //     break;
  // }

  // $('#topic_title').text(title);

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
  let corect_quiz = 0;
  let sum = 0;
  var elements = Array.from(document.getElementsByClassName('quiz-data'));

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
    sum += 1
  });

  $(".box-quiz input").each(function () {
    if(Number.isInteger($(this).val()) || Number.isInteger($(this).data('success'))){
      if($(this).val() == $(this).data('success')){
        $(this).addClass('ex-correct');
        $(this).removeClass('ex-incorrect');
        corect_quiz += 1
      }else{
        $(this).addClass('ex-incorrect');
        $(this).removeClass('ex-correct');
      };
    }else{
      if($(this).val().toLowerCase().trim() == $(this).data('success').toLowerCase().trim()){
        $(this).addClass('ex-correct');
        $(this).removeClass('ex-incorrect');
        corect_quiz += 1
      }else{
        $(this).addClass('ex-incorrect');
        $(this).removeClass('ex-correct');
      };
    }

    sum += 1;
  });

  $(".box-quiz select").each(function () {
    if($(this).val() == $(this).data('success')){
      $(this).addClass('ans-right');
      $(this).removeClass('ans-wrong');
      corect_quiz += 1
    }else{
      $(this).addClass('ans-wrong');
      $(this).removeClass('ans-right');
    };

    sum += 1;
  });

  $('.result').text("Your score: " + corect_quiz + "/" + sum);
  $('.btn.btn-success').blur();
  if(corect_quiz/sum >= 2/3){
    localStorage.setItem("reading" + "-done-" + get_params()['id'], 'true');
  }else{
    localStorage.removeItem("reading" + "-done-" + get_params()['id'])
  }
}

function view_result(){
  $(".box-quiz input:not(.ex-correct)").each(function () {
    $(this).val($(this).data('success'));
    $(this).removeClass('ex-incorrect');
  });
  $('.btn.btn-warning').blur();
}
