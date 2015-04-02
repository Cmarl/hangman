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
  newGame(); //start new game on page load

  $(window).keypress(function(event){ //listen on keyboard
    var ascii = event.which;
    var char = String.fromCharCode(ascii);

    if ((ascii >= 97 && ascii <= 122)&&(guesses.indexOf(char) === -1)){
      $('#'+char).parent().addClass("list-group-item-danger");         //turn letter red
      guesses.push(char);                                          //remember this guess

      if (word.indexOf(char) > -1){                      //check word for letter guessed
        var charI = [];                                     //save i's of guessed letter
        for(var i=0;i<word.length;i++){if (word[i] === char){charI.push(i);}}
        charI.forEach(function(i){hidden[i] = char;});       //replace dashes with guess
        $('#current').text(hidden.join(""));              // update text shown with same

        if (word === hidden.join("")){                                   //check for win
          window.confirm("You Win!!!");
          $('#game-area').velocity({rotateX:360});
          //only works on first spin, tried clearing classes, clearing style
          // and also tried hiding and un-hiding div..,
          // same issue with when using animate and css functions..
          newGame();
        }
      } else if (word.indexOf(char) === -1){                           //incorrect guess
          $('#imgs').children().addClass('hide');                          //hide frames
          showing += 1;
          $('#'+showing).removeClass('hide');                          //show next frame

          if (showing >= 6){                                            //check for loss
            window.confirm("you lose! this word was: " + word);
            $('#game-area').slideUp(function(){$('#game-area').slideDown()})   //animate
            newGame();
          }
      }
    } else {$('#game-area').fadeOut(25,function(){$('#game-area').fadeIn(25)})};
  });
  $('#newgame').click(function(){
    newGame();
  });
});
