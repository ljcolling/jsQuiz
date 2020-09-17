#' A simple HTML widget for a multiple choice quiz in Javascript
#'
#' Generate a multiple choice quiz from a list of questions and answers
#'
#'
#' @param quizText a list of questions generated with \code{generateQuestion}
#'
#' @import htmlwidgets
#' @import jsonlite
#'
#' @export
jsQuiz <- function(quizText, width = NULL, height = NULL, elementId = NULL) {

  # convert quizText to an escaped JSON string
  quizText <- jsonlite::toJSON(quizText)
  quizText <- sprintf("%s",quizText)
  # forward options using x
  x = list(
    quizText = quizText
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'jsQuiz',
    x,
    width = width,
    height = height,
    package = 'jsQuiz',
    elementId = elementId
  )
}

#' Shiny bindings for jsQuiz
#'
#' Output and render functions for using jsQuiz within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a jsQuiz
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name jsQuiz-shiny
#'
#' @export
jsQuizOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'jsQuiz', width, height, package = 'jsQuiz')
}

#' @rdname jsQuiz-shiny
#' @export
renderJsQuiz <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, jsQuizOutput, env, quoted = TRUE)
}

#' Generate a question list
#'
#' Generate a question list from some inputs
#' @param question the text to display for the question
#' @param answers a vector containing the multiple choice options
#' @param correct_answer a integer indicating the correct answer
#' @export
generateQuestion <- function(question, answers, correct_answer){

  correct <- rep(0,length(answers))
  correct[correct_answer] <- 1
  list(question = question,
       answers = answers,
       correct = correct
  )
}


