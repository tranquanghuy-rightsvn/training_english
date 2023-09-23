$(document).ready(function() {
  $.getJSON('./database/general_topics.json', function(topics) {
    topics.map(function (topic) {
      $('#groups_general').append("<div class='col-xs-12 col-sm-6 sol-md-4 col-lg-2'><a href='./topic.html?topic=" + topic.brief + "' ><div class='topic'>" + topic.name + "</div></a></div>");
    });
  });
});
