var wordList = ['jazz','jinx','trick','monkey','catacomb','technology',
'sailing','bagpipes','buffalo','icebox','internet','oxygen',
'tree','website','develop','interest','zombie',
'watchtower','bus','condenser','lamp','pyramid',
'intelligence','faculty','commandeer','obscure','initiate',
'enlighten','rhythm','zephyr','hangman','javascript','chicken',
'zoology','because','create','aperature','branch','clavicle',
'degree','television','jacuzzi','components','coding','cactus',
'avalanche','franchise','green','helicopter','itinerary',
'kaleidoscope','linger','fox','mummify','television','nimble',
'sriracha','quail','results','singe','topple','utility','volatile',
'why','yaw','spy','czar','contrast','treated','species','breeze',
'advise','mill','smell','leader','grain','height','whom',
'serious','coffee','focus','complete','purchase','remind',
'deliver','check','structure','distributor','cylinder','vitamin',
'command','hardware','processing','scanner','memory','peripheral',
'cactus','fireplace','cellular','reactive'];

var word = "";
var hidden = "";
var guesses = [];
var showing = 0;

function newGame(){
  word = wordList[Math.floor(Math.random()*100)];
  hidden = (word.replace(/\w/g,"-")).split("");
  guesses = [];
  showing = 0;
  $('#current').text(hidden.join(""));
  $('.list-group-item-danger').removeClass('list-group-item-danger');
  $('#imgs').children().addClass('hide');
  $('#0').removeClass('hide');
}

$(document).ready(function(){
  newGame();

  $(window).keypress(function(event){
    var ascii = event.which;
    var char = String.fromCharCode(ascii);

    if ((ascii >= 97 && ascii <= 122)&&(guesses.indexOf(char) === -1)){
      $('#'+char).parent().addClass("list-group-item-danger");
      guesses.push(char);

      if (word.indexOf(char) > -1){
        var charI = [];
        for(var i=0;i<word.length;i++){if (word[i] === char){charI.push(i);}}
        charI.forEach(function(i){hidden[i] = char;});
        $('#current').text(hidden.join(""));

        if (word === hidden.join("")){
          window.confirm("You Win!!!");
          $('#game-area').velocity({rotateX:180},{duration:250}).velocity('reverse');
          newGame();
        }
      } else if (word.indexOf(char) === -1){
          $('#imgs').children().addClass('hide');
          showing += 1;
          $('#'+showing).removeClass('hide');

          if (showing >= 6){
            window.confirm("you lose! this word was: " + word);
            $('#game-area').slideUp(function(){$('#game-area').slideDown()})
            newGame();
          }
      }
    } else {$('#game-area').fadeOut(25,function(){$('#game-area').fadeIn(25)})};
  });

  $('#newgame').click(function(){
    newGame();
  });
});
