$(document).ready(function () {
    var next_question_btn = $('#next-question');
    var question_arr = [
        {
            question_id: 1,
            question_txt: "Today is what day?",
            question_points: 10,
            question_options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            question_correct_ans: 'Wednesday'
        },
        {
            question_id: 2,
            question_txt: "What date is your birthday?",
            question_points: 10,
            question_options: [14, 15, 16, 17],
            question_correct_ans: 14

        },
        {
            question_id: 3,
            question_txt: "What is the Bitcoin Value today?",
            question_points: 10,
            question_options: [10000, 9000, 8000, 7000],
            question_correct_ans: 8000

        }];

    //Rendering the first question object
    var first_question_obj = question_arr.splice(0, 1);
    firstQuestionObject(first_question_obj);

    next_question_btn.click(function () {
        if (question_arr.length === 0) {
            console.log("Last Question over");
        }

     //Rendering the subsequent next question objects
     var question_obj = question_arr.splice(0, 1);
     nextQuestionObjects(question_obj);
    })

});


function firstQuestionObject(first_question_obj) {
    var question_text = $('.question--text');
    var answer_choices = $('.answer--choices');
    var result =[];
    for (var i = 0; i < first_question_obj.length; i++) {
        question_text.html(first_question_obj[i].question_txt);
        for (var j = 0; j < first_question_obj[i].question_options.length; j++) {
            result.push('<li>');
            result.push("<b>"+ first_question_obj[i].question_options[j] + "</b>");
            result.push('</li>');
            answer_choices.html(result.join(''));
        }
    }
}

function nextQuestionObjects(question_obj) {
    var question_text = $('.question--text');
    var answer_choices = $('.answer--choices');
    for (var i = 0; i < question_obj.length; i++) {
        question_text.html(question_obj[i].question_txt);
        var result =[];
        for (var j = 0; j < question_obj[i].question_options.length; j++) {
            result.push('<li>');
            result.push("<b>"+ question_obj[i].question_options[j] + "</b>");
            result.push('</li>');
            answer_choices.html(result.join(''));
        }
    }
}
