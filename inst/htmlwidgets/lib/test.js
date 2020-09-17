var n_questions = 2
var question_list = [] //= Array.from({ length: n_questions }, (x, i) => `q${i + 1}`);

for (i = 0; i < n_questions; i++) {
    question_list[i] = `q${i + 1}`
}

console.log(question_list)