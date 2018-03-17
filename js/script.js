$(document).ready(function () {
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
    var arr_len = question_arr.length;
    gameRenderingConfigs(question_arr, arr_len);
    renderPlayerStatsScreen();
});

function gameRenderingConfigs(question_arr, arr_len) {
    var startGameCounter = 0;
    var progressBarHandler = $('.progress-meter');
    var progress_length;
    var progress_bar_text = $('.progress-meter-text');
    var progress_bar_wrapper = $('.progress--bar');
    var loading_wrapper = $('.loading--wrapper');
    var progressCounter = 0;

    $('#next-question').on('click', function () {
        progress_bar_wrapper.css("display", "block");
        var question_points = $('.question--points');
        startGameCounter++;
        if (startGameCounter === 1) {
            loading_wrapper.show().delay(3000).fadeOut();
            renderGameAfterLoad();
            $(this).text("Submit");
        }

        if (startGameCounter >= 2 && startGameCounter <= question_arr.length + 1) {
            progressCounter++;
            progress_length = Math.round((progressCounter / arr_len) * 100);
            progressBarHandler.width(progress_length + "%");
            progress_bar_text.html(progress_length + "%");
        }

        question_points.html("Score : " + '<b>' + totalPoints + '</b>');
        renderQuestionObjects(question_arr, startGameCounter - 1);
    });
}

//Render Question details
var playerQuestionMap = [];

function renderQuestionObjects(question_obj, counter) {
    if (counter < question_obj.length) {
        var question_text = $('.question--text');
        var answer_choices = $('.answer--choices');
        var question_correct_answer = question_obj[counter].question_correct_ans;
        var question_number = question_obj[counter].question_id;
        var result = [];
        question_text.html(question_obj[counter].question_txt);

        for (var j = 0; j < question_obj[counter].question_options.length; j++) {
            result.push('<li>');
            result.push('<input ' +
                'type="radio" ' +
                'name="' + question_obj[counter].question_id + '" ' +
                'value="' + question_obj[counter].question_options[j] + '">');

            result.push("<b>" + question_obj[counter].question_options[j] + "</b>");
            result.push('</li>');
            answer_choices.html(result.join(''));
        }
        $('input[name="' + question_obj[counter].question_id + '"]:radio').on('click', function () {
            var selected_answer_choice = $(this).val();
            var radioName = $(this).attr("name");
            if ($('input:radio:checked')) {
                $(":radio[name='" + radioName + "']").attr({"disabled": true});
            }
            calculatePlayerQuestionDetails(question_number, question_correct_answer, selected_answer_choice);
            checkCorrectAnswer(question_correct_answer, selected_answer_choice, question_obj, counter);
        });
    }
    //If counter exceeds the array length, the game ended.
    else {
        onGameEnd();
    }
}

//Sets a flag if correct answer is given by the user
var correctAnsFlag = false;

function checkCorrectAnswer(question_correct_answer, selected_answer_choice, question_obj, counter) {
    if (question_correct_answer == selected_answer_choice) {
        console.log("Correct Answer selected!");
        correctAnsFlag = true;
    }
    else {
        console.log("Incorrect Answer");
        correctAnsFlag = false;
    }
    UpdatePoints(correctAnsFlag, question_obj, counter);
}

//Calculate Total points scored by player
var totalPoints = 0;
var points_earned = [];

function UpdatePoints(flag, question_obj, counter) {
    if (counter < question_obj.length) {
        if (flag) {
            totalPoints += question_obj[counter].question_points;

        }
        points_earned.push(totalPoints);
    }
    console.log(points_earned);
}

var seconds = 0,
    minutes = 0,
    hours = 0;

//Function to calculate the total time elapsed.
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

var setTimer;

//Call countDownTimer() every one second to show timer.
function startTimer() {
    setTimer = true;
    if (setTimer) {
        setTimeout(countDownTimer, 1000);
    }
}

// Function call after game is ended
function onGameEnd() {
    setTimer = false;
    $('#check-stats').css({display: "inline-block"});
    $('.question--content').css({color: "#ccc"});
    $('#next-question').attr({
        "disabled": 'true',
        "style": "cursor:not-allowed",
        "title": "Game over, cannot submit!"
    });
}

//Render the game contents after the loading is completed
function renderGameAfterLoad() {
    var game_wrapper = $('.game--wrapper');
    var submit_button = $('#next-question');
    var submit_btn_wrapper = $('.submit--buttons');
    submit_button.attr("disabled", true);

    setTimeout(function () {
        game_wrapper.show();
        countDownTimer();
        submit_button.attr("disabled", false);
        submit_btn_wrapper.css("margin-top", 0);
    }, 3500);
}

function renderPlayerStatsScreen() {
    var player_stats = $('#check-stats');
    // var question_id = $('.question--id');
    // var correct_option = $('.correct--option');
    // var selection_option = $('.selection--option');
    player_stats.on('click', function () {
        $('.player-stats--wrapper').fadeIn();
        $('.game--wrapper').css('display', 'none');
        $('.submit--buttons').css('display', 'none');
        $('#myChart').css('display', 'block');
        // for (var i = 0; i < playerQuestionMap.length; i++) {
        //     question_id.html(playerQuestionMap[i].question_id);
        //     correct_option.html(playerQuestionMap[i].correct_ans);
        //     selection_option.html(playerQuestionMap[i].selected_ans);
        // }
        createPlayerGraph();

    });

}

function calculatePlayerQuestionDetails(question_number, question_correct_answer, selected_answer_choice) {
    playerQuestionMap.push({
        'question_id': question_number,
        'correct_ans': question_correct_answer,
        'selected_ans': selected_answer_choice
    });
    return playerQuestionMap;
}

function createPlayerGraph() {
    var ctx = document.getElementById("myChart").getContext('2d');
    Chart.defaults.global.defaultFontColor = '#EEEEEE';
    Chart.defaults.global.defaultFontFamily = '\'Montserrat\', sans-serif';
    Chart.defaults.global.defaultFontStyle = '600';
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [{
                label: 'Score',
                data: points_earned,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: 'white'
                }
            }
        }
    });
}
