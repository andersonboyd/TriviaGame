$(document).ready(function(){
    $("#timeRemains").hide();
    $("#start").click(trivia.start);
    $("#options").on("click", ".option", trivia.checker);
    // audio.play();
});

// var audio = new Audio("assets/music/Helen Dell, Dodger Stadium Organist - Take Me out to the Ballgame.mp3");

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    resultID: "",
    timer: 0,
    timerOn: false,
    time: "",
    questions: {
        q1: "What is Cy Young's real name?",
        q2: "The nickname for the 1927 New York Yankees is what?",
        q3: "Who was the first African-American player in the MLB?",
        q4: "Who broke Babe Ruth's career homerun record?",
        q5: "Which MLB pitcher threw a no-hitter while tripping on LSD?",
        q6: "Who is the only player to be killed by a pitch during a game?",
        q7: "As of 2019, which three teams won the last three World Series?"
    },
    options: {
        q1: ["Cypress Hill", "Cyrus John", "Denton True", "Dalton Terrence"],
        q2: ["Murderer's Row", "Bronx Bombers", "Swinging Sultans", "Killer Crew"],
        q3: ["Bo Jackson", "Jackie Robinson", "Satchel Paige", "Freddie Gibbs"],
        q4: ["Lou Gehrig", "Nomar Garciaparra", "Sammy Sosa", "Hank Aaron"],
        q5: ["Sandy Koufax", "Doc Ellis", "Greg Maddux", "Felix Hernandez"],
        q6: ["Ray Chapman", "Ty Cobb", "Honus Wagner", "Buck Weaver"],
        q7: ["Indians, Dodgers, Red Sox", "Cardinals, Padres, White Sox", "Cubs, Astros, Red Sox", "Yankees, Yankees, Yankees"]
    },
    answers: {
        q1: "Denton True",
        q2: "Murderer's Row",
        q3: "Jackie Robinson",
        q4: "Hank Aaron",
        q5: "Doc Ellis",
        q6: "Ray Chapman",
        q7: "Cubs, Astros, Red Sox"
    },

    start: function(){
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.time);

        $("#results").hide();
        $("#game").show();
        $("#timer").text(trivia.time);
        $("#start").hide();
        $("#timeRemains").show();
        trivia.nextQuestion();
    },

    timerStart: function(){
        trivia.timer = 10;
        $("#timer").text(trivia.timer);
        if(!trivia.timerOn){
            trivia.time = setInterval(trivia.timerRuns, 1000);
        }
    },

    nextQuestion: function(){
        trivia.timerStart();
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $("#question").text(questionContent);

        var questionOptions = Object.values(trivia.options)[trivia.currentSet];
        $.each(questionOptions, function(index, key){
            $("#options").append($("<button class='option btn'>"+key+"</button>"));
        });
    },

    
    checker: function(){
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        if(this.textContent === currentAnswer){
            trivia.correct++;
            clearInterval(trivia.time);
            trivia.resultID = setTimeout(trivia.guessResult, 1000);
            $("#results").show();
            $("#results").html("<h3>Correct!</h3>");
        }
        else{
            trivia.incorrect++;
            clearInterval(trivia.time);
            trivia.resultID = setTimeout(trivia.guessResult, 1000);
            $("#results").show();
            $("#results").html("<h3>Oh no! The correct answer is "+currentAnswer+".</h3>");
        }
    },

    guessResult: function(){
        trivia.currentSet++;
        $(".option").remove();
        $("#results h3").remove();
        trivia.nextQuestion();
    },

    timerRuns: function(){
        if(trivia.timer > 0 && trivia.currentSet < Object.keys(trivia.questions).length){
            trivia.timer--;
            $("#timer").text(trivia.timer);
        }
        else if(trivia.timer === 0 && trivia.currentSet < Object.keys(trivia.questions).length){
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.time);
            trivia.resultID = setTimeout(trivia.guessResult, 3000);
            $("#results").show();
            $("#results").html("<h3>Time's up! The answer was " + Object.values(trivia.answers)[trivia.currentSet] + ".</h3>");
        }
        else if(trivia.currentSet === Object.keys(trivia.questions).length){
            $("#results").show();
            $("#results").html("<h3>Thanks for playing!</h3><br/>"+"<p>Correct: "+trivia.correct+"</p>"+"<p>Incorrect: "+trivia.incorrect+"</p>"+"<p>Unanswered: "+trivia.unanswered+"</p>"+"<p>Play again?</p>");
            $("#game").hide();
            $("#start").show();
        }
        else{
            clearInterval(trivia.time);
            trivia.nextQuestion();
        }
    }
}