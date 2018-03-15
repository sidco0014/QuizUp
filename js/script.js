$(document).ready(function () {
    var next_question_btn = $('#next-question');
    var question_arr = [
        {
            question_id: 'Q_1',
            question_txt: "Today is what day?",
            question_points: 10,
            question_options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            question_correct_ans: 'Wednesday'
        },
        {
            question_id: 'Q_2',
            question_txt: "What date is your birthday?",
            question_points: 10,
            question_options: [14, 15, 16, 17],
            question_correct_ans: 14

        },
        {
            question_id: 'Q_3',
            question_txt: "What is the Bitcoin Value today?",
            question_points: 10,
            question_options: [10000, 9000, 8000, 7000],
            question_correct_ans: 8000

        }];

    next_question_btn.click(function () {
        if (question_arr.length === 0) {
            alert("Game Over!");
        }

        //Rendering questions one by one on screen
        var question_obj = question_arr.splice(0, 1);
        renderQuestionObjects(question_obj);
    })

});

function renderQuestionObjects(question_obj) {
    var question_text = $('.question--text');
    var answer_choices = $('.answer--choices');

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
            console.log(selected_answer_choice);
            checkCorrectAnswer(question_correct_answer, selected_answer_choice, question_obj);
        });
    }
}


function checkCorrectAnswer(question_correct_answer, selected_answer_choice, question_obj) {
    if (question_correct_answer == selected_answer_choice) {
        console.log("Correct Answer selected!");
        UpdatePoints(question_obj);
    }
    else {
        console.log("Incorrect Answer");
    }
}

var totalPoints = 0;

function UpdatePoints(question_obj) {
    for (var i = 0; i < question_obj.length; i++) {
        totalPoints += question_obj[i].question_points;
    }
    console.log(totalPoints);
}
