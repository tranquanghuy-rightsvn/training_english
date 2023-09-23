$(document).ready(function() {
  $.getJSON('../../database/speaking/data.json', function(groups) {
    groups.map(function(quiz, index){
      let k = index + 1;
      let tab = 1;

      if(index > 9 && index <= 19){
        tab = 2
      }else if(index > 19 && index <= 29){
        tab = 3
      }else if(index > 29 && index <= 39){
        tab = 4
      }

      let corect = quiz['correct']
      let html = '';
      html += "<div class='box-speaking'>"
      html += "<p><b>Question: </b>" +  quiz['title'] + "</p>";
      html += "<p><b>Sample answer: </b><p>";
      html += "<audio controls>";
      html += "<source src='https://docs.google.com/uc?open&id=" + quiz['url'] + "' type='audio/mp3'>";
      html += "</audio>";
      html += "<p><b>Transcript: </b>" +  quiz['content'] +"</p>";
      html += "<textarea placeholder='Your answer' id='reading-" + k + "'></textarea>";
      html += "<button class='btn btn-warning' onclick='save_reading(" + k + ")'>Save answer</button>";
      html += "</div>";
      $('#page-'+ tab).append(html);

      if(localStorage.getItem(key_store(k)) != null ){
        $('#reading-' + k).val(localStorage.getItem(key_store(k)));
      }
    });
  })
})

function save_reading(k){
  let content = $('#reading-' + k).val();
  localStorage.setItem(key_store(k), content);
  alert("Saved!")
}

function key_store(k){
  return "reading-" + k;
}
