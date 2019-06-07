$(document).ready(function(){
    $("#timeRemains").hide();
    $("#start").click(trivia.start);
    $("#options").on("click", ".option", trivia.checker);
});

var audio = new Audio("assets/music/Helen Dell, Dodger Stadium Organist - Take Me out to the Ballgame.mp3");
var sound = new Audio("assets/music/crackcheer.mp3");
var boo = new Audio("assets/music/boo.mp3");
var out = new Audio("assets/music/out.mp3");

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
        q3: "Name the first African-American player in the MLB.",
        q4: "Who broke Babe Ruth's career homerun record?",
        q5: "Which MLB pitcher threw a no-hitter while high on LSD?",
        q6: "Who is the only player to be killed by a pitch during a game?",
        q7: "As of 2019, which three teams won the last three World Series?",
        q8: "Who was the first pitcher to hit 100MPH?",
        q9: "Name the only player to hit a home run and score a touchdown in the NFL in the same week.",
        q10: "What was the original name of the Houston Astros?",
        q11: "Whose jersey number was the first ever retired by an MLB team?",
        q12: "Who is the only player to hit two grand slams in one inning?",
        q13: "Players have hit two grand slams in a game 13 times.  How many times this has been accomplished in the hitter’s home park?",
        q14: "Which two cities have the oldest stadiums in major league baseball?",
        q15: "A baseball field is approximately what size?"
    },
    options: {
        q1: ["Cypress Hill Young", "Cyrus John Young", "Denton True Young", "Dalton Terrence Young"],
        q2: ["Murderers Row", "Bronx Bombers", "Swinging Sultans", "Killer Crew"],
        q3: ["Bo Jackson", "Jackie Robinson", "Satchel Paige", "Freddie Gibbs"],
        q4: ["Willie Mays", "Nomar Garciaparra", "Sammy Sosa", "Hank Aaron"],
        q5: ["Sandy Koufax", "Dock Ellis", "Greg Maddux", "Felix Hernandez"],
        q6: ["Ray Chapman", "Ty Cobb", "Honus Wagner", "Buck Weaver"],
        q7: ["Indians, Dodgers, Red Sox", "Cardinals, Padres, White Sox", "Cubs, Astros, Red Sox", "Yankees, Yankees, Yankees"],
        q8: ["Rollie Fingers", "Roger Clemens", "Bob Gibson", "Nolan Ryan"],
        q9: ["Barry Sanders", "Deion Sanders", "Bo Jackson", "Tim Tebow"],
        q10: ["Houston Buffaloes", "Houston River Bandits", "Houston Colt .45s", "Houston Hurricanes"],
        q11: ["Lou Gehrig", "Walter Johnson", "Babe Ruth", "Christy Mathewson"],
        q12: ["Roberto Clemente", "Fernando Tatis", "Jose Altuve", "Juan Marichal"],
        q13: ["Once", "Twice", "Three times", "This has never happened"],
        q14: ["New York City & Philadelphia", "Pittsburgh & St. Louis", "Boston & Chicago", "Baltimore & Cleveland"],
        q15: ["One acre", "Two acres", "Three acres", "Four acres"]
    },
    answers: {
        q1: "Denton True Young",
        q2: "Murderers Row",
        q3: "Jackie Robinson",
        q4: "Hank Aaron",
        q5: "Dock Ellis",
        q6: "Ray Chapman",
        q7: "Cubs, Astros, Red Sox",
        q8: "Nolan Ryan",
        q9: "Deion Sanders",
        q10: "Houston Colt .45s",
        q11: "Lou Gehrig",
        q12: "Fernando Tatis",
        q13: "Once",
        q14: "Boston & Chicago",
        q15: "Two acres"
    },
    photos: {
        q1: `<img src="assets/images/CyYoung.jpg"/>`,
        q2: `<img src="assets/images/murderersRow.jpg"/>`,
        q3: `<img src="assets/images/jackie.jpg"/>`,
        q4: `<img src="assets/images/hank.jpg"/>`,
        q5: `<img src="assets/images/dock.jpg"/>`,
        q6: `<img src="assets/images/ray.jpg"/>`,
        q7: `<img src="assets/images/trophy.jpg"/>`,
        q8: `<img src="assets/images/nolan.jpg"/>`,
        q9: `<img src="assets/images/deion.jpg"/>`,
        q10: `<img src="assets/images/colt.jpg"/>`,
        q11: `<img src="assets/images/GehrigLou.jpg"/>`,
        q12: `<img src="assets/images/fernando.jpg"/>`,
        q13: `<img src="assets/images/slam.jpg"/>`,
        q14: `<img src="assets/images/ballparks.jpg"/>`,
        q15: `<img src="assets/images/dimensions.jpg"/>`
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
        audio.play();
    },

    timerStart: function(){
        trivia.timer = 10;
        $("#timer").text(trivia.timer);
        if(!trivia.timerOn){
            trivia.time = setInterval(trivia.timerRuns, 1000);
        }
    },

    nextQuestion: function(){
        $("#options").show();
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
        var photos = Object.values(trivia.photos)[trivia.currentSet];
        if(this.textContent === currentAnswer){
            trivia.correct++;
            clearInterval(trivia.time);
            trivia.resultID = setTimeout(trivia.guessResult, 1000);
            $("#results").show();
            $("#results").html("<h3>Correct!</h3><br/>");
            sound.play();
        }
        else{
            trivia.incorrect++;
            clearInterval(trivia.time);
            trivia.resultID = setTimeout(trivia.guessResult, 1000);
            $("#results").show();
            $("#results").html("<h3>Oh no! The correct answer is "+currentAnswer+".</h3><br>");
            boo.play();
        }
        $("#results").append(photos);
        $("#options").hide();
    },

    guessResult: function(){
        trivia.currentSet++;
        $(".option").remove();
        $("#results").empty();
        trivia.nextQuestion();
    },

    timerRuns: function(){
        var photos = Object.values(trivia.photos)[trivia.currentSet];
        if(trivia.timer > 0 && trivia.currentSet < Object.keys(trivia.questions).length){
            trivia.timer--;
            $("#timer").text(trivia.timer);
        }
        else if(trivia.timer === 0 && trivia.currentSet < Object.keys(trivia.questions).length){
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.time);
            trivia.resultID = setTimeout(trivia.guessResult, 3000);
            $("#options").hide();
            $("#results").show();
            $("#results").html("<h3>Time's up! The answer was " + Object.values(trivia.answers)[trivia.currentSet] + ".</h3><br/>");
            $("#results").append(photos);
            out.play();
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