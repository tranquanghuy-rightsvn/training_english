$(document).ready(function() {
  if(parseInt(get_params()['id']) > 174 || parseInt(get_params()['id']) < 1 ){
    window.location.href = "/";
  }

  $.getJSON('./database/exercises/ex_' + get_params()['id'] + '.json', function(teams) {
    var ansArray = [];

    for (var u = 0; u < teams[0].length; u++) {
      ansArray.push(teams[0][u].ans);
    }

    teams.map(function (words, j) {
      let i = j + 1;
      let active = i === 1 ? 'active' : ''
      let selected = i === 1 ? 'true' : 'false'
      $('#nav-tab').append( "<a class='nav-link " + active + "' id='nav-exercise-" + i +"' data-bs-toggle='tab' href='#exercise-" + i + "' role='tab' aria-controls='nav-exercise-" + i +"' aria-selected='" + selected +"'> Exercise " + i + "</a>")
      let html = "";
      words.map(function (word, l) {
        let k = l + 1
        html += "<div class='box-exercise'>"
        html += "<div class='row'>"
        html += "<div class='col-sm-12 col-md-9'>"
        html += "<p>"+ k +". " + word.ques + "</p>"
        html += "</div>"
        html += "<div class='col-sm-12 col-md-3'>"
        html += "<h6>" + "<select class='form-select' data-success='" + word.ans +"'><option selected>Select a word</option>"
        shuffle_array(ansArray).map(function(word){
          html += '<option>' + word + "</option>"
        })
        html += "</select>" + "</h6>"
        html += "</div></div></div>"
      });

      $('#nav-tabContent').append("<div class='tab-pane fade show " + active + "' id='exercise-" + i + "' role='tabpanel' aria-labelledby='nav-exercise-" + i + "'></div>")
      $('#exercise-' + i).append(html)
      $('#exercise-' + i).append("<div class='box-button mgt-20 d-flex justify-content-end'><button class='btn btn-danger mgr-20' onclick='reset_exersice(" + i +")'> Restart </button><button class='btn btn-success' onclick='submit_exersice(" + i +")'> Submit </button></div>")

    });
  });


  $.getJSON('./database/general_topics.json', function(groups){
    if(parseInt(get_params()['id']) > 111){
      return
    }else{
      var id = parseInt(get_params()['id']);
      var k = 0;
      groups.map(function(group, index){
        if(id >= parseInt(group['id_start'])){
          k = index;
          return;
        }
      });

      $('#back_word_list').attr("href", "topic.html?topic=" + groups[k]['brief'])
    }
  });

  $.getJSON('./database/academic_topics.json', function(groups){
    if(parseInt(get_params()['id']) < 112){
      return
    }else{
      var id = parseInt(get_params()['id']);
      var k = 0;
      groups.map(function(group, index){
        if(id >= parseInt(group['id_start'])){
          k = index;
          return;
        }
      });

      $('#back_word_list').attr("href", "topic.html?topic=" + groups[k]['brief'])
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

function submit_exersice(p){
  let correct = 0;
  let sum = 0;
  $('#exercise-' + p + ' select.form-select').each(function() {
    var select = $(this);
    var selectedValue = select.val();

    if (selectedValue === select.data('success')) {
      select.closest('.box-exercise').addClass('ans-right');
      select.closest('.box-exercise').removeClass('ans-wrong');
      correct += 1;
    } else {
      select.closest('.box-exercise').addClass('ans-wrong');
      select.closest('.box-exercise').removeClass('ans-right');
    }

    sum += 1;
  });
  $('.btn.btn-success').blur();
  if(correct/sum >= 2/3){
    localStorage.setItem("quiz" + "-done-" + get_params()['id'], 'true');
  }else{
    localStorage.removeItem("quiz" + "-done-" + get_params()['id'])
  }
}

function reset_exersice(p){
  var result = confirm('Are you sure?');

  if (result) {
    $('#exercise-' + p + ' select.form-select').each(function() {
      var select = $(this);
      select.val('Select a word');
      select.closest('.box-exercise').removeClass('ans-wrong');
      select.closest('.box-exercise').removeClass('ans-right');
    });
  }
  $('.btn.btn-danger').blur();
}

function shuffle_array(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
