$(document).ready(function() {
  $.getJSON('./database/exercises/aaer_1.json', function(teams) {
    var ansArray = [[], [], [], [], []];

    for (var i = 0; i <= 4; i++) {
      teams.map(function(team){
        ansArray[i].push(
          {
            "ques": team["ques"][i],
            "ans": team["word"]
          }
        )
      })
      ansArray[i] = shuffle_array(ansArray[i]);
    }

    var myArray = ansArray;

    var jsonArray = JSON.stringify(myArray, null, 2);

    var arrayOutput = document.getElementById("arrayOutput");
    arrayOutput.textContent = jsonArray;
  });
});

function shuffle_array(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
