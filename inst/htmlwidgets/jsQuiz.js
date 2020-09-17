HTMLWidgets.widget({

    name: 'jsQuiz',

    type: 'output',

    factory: function(el, width, height) {


        return {

            renderValue: function(x) {

                var n_questions;

                el.innerHTML = createQuiz(x.quizText)

            },

            resize: function(width, height) {


            }

        };
    }
});