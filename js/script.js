$(document).ready(function () {
    var next_question_btn = $('#next-question');
    var question_arr = [
        {
            question_id: 'Q_1',
            question_txt: "Today is what day?",
            question_points: 100,
            question_options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            question_correct_ans: 'Wednesday'
        },
        {
            question_id: 'Q_2',
            question_txt: "What date is your birthday?",
            question_points: 100,
            question_options: [14, 15, 16, 17],
            question_correct_ans: 14

        },
        {
            question_id: 'Q_3',
            question_txt: "What is the Bitcoin Value today?",
            question_points: 100,
            question_options: [10000, 9000, 8000, 7000],
            question_correct_ans: 8000

        },
        {
            question_id: 'Q_4',
            question_txt: "What is the ETH Value today?",
            question_points: 100,
            question_options: [600, 700, 650, 550],
            question_correct_ans: 600

        }
    ];


    // var question_obj = question_arr.splice(0, 1);
    // renderQuestionObjects(question_obj);
    gameRenderingConfigs(question_arr);

});

function renderQuestionObjects(question_obj) {
    var question_text = $('.question--text');
    var answer_choices = $('.answer--choices');
    // var next_question_btn = $('#next-question');

    for (var i = 0; i < question_obj.length; i++) {
        question_text.html(question_obj[i].question_txt);
        var question_correct_answer = question_obj[i].question_correct_ans;
        var result = [];
        for (var j = 0; j < question_obj[i].question_options.length; j++) {
            result.push('<li>');
            result.push('<input ' +
                'type="radio" ' +
                'name="' + question_obj[i].question_id + '" ' +
                'value="' + question_obj[i].question_options[j] + '">');

            result.push("<b>" + question_obj[i].question_options[j] + "</b>");
            result.push('</li>');
            answer_choices.html(result.join(''));
        }

        $('input[name="' + question_obj[i].question_id + '"]:radio').on('click', function () {
            var selected_answer_choice = $(this).val();
            if ($('input:radio:checked')) {
                $(this).attr("disabled", true);
            }
            checkCorrectAnswer(question_correct_answer, selected_answer_choice, question_obj);
        });
    }
}

//Sets a flag if correct answer is given by the user
var correctAnsFlag = false;

function checkCorrectAnswer(question_correct_answer, selected_answer_choice, question_obj) {
    if (question_correct_answer == selected_answer_choice) {
        console.log("Correct Answer selected!");
        correctAnsFlag = true;
    }
    else {
        console.log("Incorrect Answer");
        correctAnsFlag = false;
    }
    UpdatePoints(correctAnsFlag, question_obj);
}


//Calculate Total points scored by player
var totalPoints = 0;

function UpdatePoints(flag, question_obj) {
    for (var i = 0; i < question_obj.length; i++) {
        if (flag) {
            totalPoints += question_obj[i].question_points;
        }
    }
    console.log(totalPoints);
}

var seconds = 0,
    minutes = 0,
    hours = 0;

function countDownTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;

        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    var timeContext = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds > 9 ? seconds : "0" + seconds);

    $('#time--elapsed').html(timeContext);
    startTimer();
}


function startTimer() {
    setTimeout(countDownTimer, 1000);
    return;
}

function gameRenderingConfigs(question_arr) {
    var StartGameCounter = 0;
    $('#next-question').on('click', function () {
        StartGameCounter++;
        if (StartGameCounter === 1) {
            countDownTimer();
        }
        $(this).text("Submit");

        onGameEnd(question_arr);

        var question_obj = question_arr.splice(0, 1);
        renderQuestionObjects(question_obj);
    });
}


function onGameEnd(question_arr) {
    if (question_arr.length === 0) {
        $('#check-stats').css({display: "inline-block"});
        $('.question--content').css({color: "#ccc"});
        $('input:radio').attr("disabled", true);
        $('#next-question').attr("disabled", true);
    }

}
