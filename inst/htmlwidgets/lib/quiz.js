function process_question(i, questions) {

    let this_question = questions[i]

    let ans_text = this_question.answers;
    let cor_text = this_question.correct;



    const question_html = `
<p class = "question">${this_question.question}</p>`
    const answer_html = `
<input class = "answer" type = "radio" name = "q${i + 1}" value = ""`

    var q_text = ''
    for (let ii = 0; ii < ans_text.length; ii++) {
        if (cor_text[ii] == 1) {
            this_id = `correctString${i + 1}`
        } else {
            this_id = "incorrect"
        }
        q_text += `
<input class = "answer" type = "radio" name = "q${i + 1}" value = "${cor_text[ii]}">
<label class="answertext" id="${this_id}">${ans_text[ii]}</label>
<br>
`
    }


    var final = question_html + q_text
    return final;
};


function makeFeedbackTest(n_questions) {
    var feedback_text = '';
    for (let i = 0; i < n_questions; i++) {
        feedback_text += `<div class = "quizAnswers" id = "correctAnswer${i + 1}"> </div>\n`;
    };
    return feedback_text;
}

function createQuiz(text) {


    var questions = JSON.parse(text)

    n_questions = questions.length;

    var submit_text = '<div class="submitter"> <input class = "quizSubmit"\nid = "submitButton"\nonClick = "submitQuiz(n_questions)"\ntype = "submit"\nvalue = "Submit" / >\n</div>';

    var feedback_text = makeFeedbackTest(n_questions)

    var score_text = '\n<h2 class="quizScore" id="userScore"></h2>'

    var processed_question = '';
    for (let i = 0; i < n_questions; i++) {
        processed_question += process_question(i, questions);
    };


    var final = processed_question + submit_text + score_text + feedback_text;
    return final
};

function submitQuiz(n_questions) {
    console.log('submitted');

    // get each answer score
    function answerScore(qName) {
        var radiosNo = document.getElementsByName(qName);

        for (var i = 0, length = radiosNo.length; i < length; i++) {
            if (radiosNo[i].checked) {
                // do something with radiosNo
                var answerValue = Number(radiosNo[i].value);
            }
        }
        // change NaNs to zero
        if (isNaN(answerValue)) {
            answerValue = 0;
        }
        return answerValue;
    }

    function scoreAndFeedback() {
        var question_list = [];

        for (i = 0; i < n_questions; i++) {
            question_list[i] = `q${i + 1}`
        }

        var calcScore = 0;

        for (let i = 0; i < n_questions; i++) {
            console.log(question_list[i])
            calcScore += (answerScore(question_list[i]))

            if (answerScore(question_list[i]) === 0) {
                document.getElementById(`correctAnswer${i + 1}`).innerHTML = correctAnswer(`correctString${i + 1}`, i + 1);
            }

        }
        return calcScore;
    }

    // function to return correct answer string
    function correctAnswer(correctStringNo, qNumber) {
        console.log("qNumber: " + qNumber);
        return ("Question " + qNumber + ": &nbsp;<strong>" +
            (document.getElementById(correctStringNo).innerHTML) + "</strong>");
    }


    function calcPossibleScore() {

        var questionCountArray = document.getElementsByClassName('question');

        var questionCounter = 0;
        for (var i = 0, length = questionCountArray.length; i < length; i++) {
            questionCounter++;
        }
        return questionCounter;
    }

    function displayScore() {

        var showScore = "Your Score: " + calcScore + "/" + questionCounter;

        if (calcScore === questionCounter) {
            showScore = showScore + "&nbsp; <strong>Well done!</strong>"
        };
        document.getElementById('userScore').innerHTML = showScore;
    }


    var calcScore = scoreAndFeedback();
    var questionCounter = calcPossibleScore();
    displayScore();


}