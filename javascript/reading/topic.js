$(document).ready(function() {
  $.getJSON('../../database/reading/data.json', function(groups) {
    groups.map(function(group, index) {
      let id = group['id'];
      let k = index + 1;
      let name = group['name'];
      let is_done = localStorage.getItem("reading" + "-done-" + id);

      if(is_done == 'true'){
        $('#exercises').append("<div class='col-xs-12 col-md-6'><a href='./reading/exercise.html?id=" + id + "' ><div class='topic done'> <p>" + name + "</p></div></a></div>")
      }else{
        $('#exercises').append("<div class='col-xs-12 col-md-6'><a href='./reading/exercise.html?id=" + id + "' ><div class='topic'> <p>" + name + "</p></div></a></div>")
      }
    });
  });
});
