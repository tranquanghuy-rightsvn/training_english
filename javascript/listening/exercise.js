$(document).ready(function() {
  if(get_params()['topic'] == 'conversation' || get_params()['topic'] == 'music'){
    $('.button').append("<button class='btn btn-warning mgb-1' onclick='view_result()'> View Result</button>");
  }

  $.getJSON('../../database/listening/' + get_params()['topic'] + '.json', function(groups) {
    let exercise = groups.filter(function(teams) {
      return teams['id'] == get_params()['id'];
    })[0];

    if(get_params()['topic'] == 'conversation' || get_params()['topic'] == 'music'){
      var audioElement = $('<audio controls>');
      var sourceElement = $('<source src="https://docs.google.com/uc?export=open&id=' + exercise["url"] + '" type="audio/mp3">');

      audioElement.append(sourceElement);

      $('.audio').append(audioElement);

      $('.title').text(exercise['title']);
      $('.content-ex').html(exercise['content']);
      $(".content-ex span").each(function () {
        var spanText = $(this).text();
        var inputElement = $('<input type="text">');
        inputElement.attr('data-success', spanText);
        $(this).replaceWith(inputElement);
      });
    }else if(get_params()['topic'] == 'short_sentence'){
      exercise['quizzes'].map(function(quiz, i){
        let j = i + 1;
        $('#short-sentence').append("<div class='box-sentence sentence-" + j +"'>");
        let audioElement = $('<audio controls>');
        let sourceElement = $('<source src="https://docs.google.com/uc?export=open&id=' + quiz["url"] + '" type="audio/mp3">');
        audioElement.append(sourceElement);
        $('.sentence-' + j).append(audioElement);
        $('.sentence-' + j).append("<div class='sentence-content'><textarea data-success='" + quiz["content"] +"' rows='3'></textarea></div>")
        $('.sentence-' + j).append("<button class='btn btn-warning' onclick='view_rs(" + j + ")'>View result</button>")
      });

    }else if(get_params()['topic'] == 'podcast'){
      $('#short-sentence').append("<div class='nav nav-tabs' id='nav-tab' role='tablist'><a class='nav-link active' id='nav-page-1' data-bs-toggle='tab' href='#page-1' role='tab' aria-controls='nav-page-1' aria-selected='true'>Exercise</a><a class='nav-link' id='nav-page-2' data-bs-toggle='tab' href='#page-2' role='tab' aria-controls='nav-page-2' aria-selected='true'>Transcript</a></div>")

      $('#short-sentence').append("<div class=\"tab-content\" id=\"nav-tabContent\"><div class=\"tab-pane fade show active\" id=\"page-1\" role=\"tabpanel\" aria-labelledby=\"nav-page-1\"></div><div class=\"tab-pane fade show\" id=\"page-2\" role=\"tabpanel\" aria-labelledby=\"nav-page-2\"></div></div></div>")

      $('#page-2').html(exercise['content']);

      var audioElement = $('<audio controls>');
      var sourceElement = $('<source src="https://docs.google.com/uc?export=open&id=' + exercise["url"] + '" type="audio/mp3">');

      audioElement.append(sourceElement);
      $('.audio').append(audioElement);
      $('.title').text(exercise['title']);

      exercise["quizzes"].map(function(quiz, index){
        let k = index + 1;
        let corect = quiz['correct']
        let html = '';
        html += "<div class='quiz-data quiz_" + k + "' data-success=" + quiz['correct'] +">"
        html += "<p>" + k + ". ";
        html += quiz['title'] + "</p>"
        html += "<button class='btn-choice' data-choice='a'> A. " + quiz['a'] + "</button><br/>"
        html += "<button class='btn-choice' data-choice='b'>B. " + quiz['b'] + "</button><br/>"
        html += "<button class='btn-choice' data-choice='c'>C. " + quiz['c'] + "</button><br/>"
        if(quiz['d'] != undefined){
          html += "<button class='btn-choice' data-choice='d'>D. " + quiz['d'] + "</button><br/>"
        }
        html += "</div>";
        $('#page-1').append(html);

        $("button.btn-choice").click(function() {
          $(this).addClass("checked");
          $(this).siblings().removeClass("checked")
        });
      });
    }
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

function submit_exersice(){
  let sum = 0;
  let correct = 0;

  if(get_params()['topic'] == 'conversation' || get_params()['topic'] == 'music'){
    $(".content-ex input").each(function () {
      if(Number.isInteger($(this).val()) || Number.isInteger($(this).data('success'))){
        if($(this).val() == $(this).data('success')){
          $(this).addClass('ex-correct');
          $(this).removeClass('ex-incorrect');
          correct += 1
        }else{
          $(this).addClass('ex-incorrect');
          $(this).removeClass('ex-correct');
        };
      }else{
        if($(this).val().toLowerCase().trim() == $(this).data('success').toLowerCase().trim()){
          $(this).addClass('ex-correct');
          $(this).removeClass('ex-incorrect');
          correct += 1
        }else{
          $(this).addClass('ex-incorrect');
          $(this).removeClass('ex-correct');
        };
      }

      sum += 1;
    });
  }else if(get_params()['topic'] == 'podcast'){
    var elements = Array.from(document.getElementsByClassName('quiz-data'));

    elements.map(function(element) {
      let button = $(element).find('button.checked');
      let successData = element.dataset.success;
      if(successData == button.data('choice')){
        button.addClass('btn-corect');
        button.siblings('button').removeClass('btn-incorect');
        button.siblings('button').removeClass('btn-corect');
        correct += 1;
      }else{
        button.addClass('btn-incorect');
        button.siblings('button').removeClass('btn-corect');
        button.siblings('button').removeClass('btn-incorect');
      }
    });

    sum = elements.length;
  }else if(get_params()['topic'] == 'short_sentence'){
    $("#page-1 textarea").each(function () {
      if(Number.isInteger($(this).val()) || Number.isInteger($(this).data('success'))){
        if($(this).val() == $(this).data('success')){
          $(this).addClass('se-correct');
          $(this).removeClass('se-incorrect');
          correct += 1
        }else{
          $(this).addClass('se-incorrect');
          $(this).removeClass('se-correct');
        };
      }else{
        if($(this).val().toLowerCase().trim() == $(this).data('success').toLowerCase().trim()){
          $(this).addClass('se-correct');
          $(this).removeClass('se-incorrect');
          correct += 1
        }else{
          $(this).addClass('se-incorrect');
          $(this).removeClass('se-correct');
        };
      }

      sum += 1;
    })
  }

  $('.result').text("Your score: " + correct + "/" + sum)
  $('.btn.btn-success').blur();
  if(correct/sum >= 2/3){
    localStorage.setItem(get_params()['topic'] + "-done-" + get_params()['id'], 'true');
  }else{
    localStorage.removeItem(get_params()['topic'] + "-done-" + get_params()['id'])
  }
}

function view_result(){
  $(".content-ex input:not(.ex-correct)").each(function () {
    $(this).val($(this).data('success'));
    $(this).removeClass('ex-incorrect');
  });

  $('.btn.btn-warning').blur();
}

function view_rs(i){
  $(".sentence-" + i + " textarea").each(function () {
    $(this).val($(this).data('success'));
    $(this).removeClass('se-incorrect');
    $(this).removeClass('se-correct');
  })

  $('.btn.btn-warning').blur();
}
