const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btn')

let shuffledQuestions, currentQuestionsIndex

startButton.addEventListener('click', StartGame)
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
})

function StartGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionsIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}

function showQuestion(question) {
 questionElement.innerText = question.question
 question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.Text
    button.classList.add('btn')
    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
 })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}


const questions = [
    {
        question: "Puedo afiliar a una empresa?",
        answers: [
            {Text: 'si', correct: true },
            {Text: 'no', correct:false }
        ]
    },
    {
        question: 'Cuanto es lo minimo que se puede transferir',
        answers: [
            {Text: 'Q.10.00', correct:true},
            {Text: 'Q.20.00', correct:false},
            {Text: 'Q.5.00', correct:false},
            {Text: 'Q.1.00', correct:false}
        ]
    },
    {
        question: 'Cuanto es la cantidad maxima de dinero que se puede transferir',
        answers: [
            {Text: 'Q.2,000.00', correct:false},
            {Text: 'Q.50,000.00', correct:false},
            {Text: 'Q.10,000.00', correct:true},
            {Text: 'Q.5,000.00', correct:false}
        ]
    },
    {
        question: 'Cuantas transferencias se pueden realizar al dia',
        answers: [
            {Text: '2', correct:false},
            {Text: '20', correct:true},
            {Text: '23', correct:false},
            {Text: '30', correct:false}
        ]
    },
    {
        question: 'Que cantidades se pueden retirar por medio de un cajero 5B',
        answers: [
            {Text: 'De 200 a 1,000, en multiplos de 100', correct:true},
            {Text: 'De 50 a 2,000 en multiplos de 50', correct:false},
            {Text: 'De 100 a 900 en multiplos de 10', correct:false},
            {Text: 'De 500 a 10,000 en multiplos de 500', correct:false}
        ]
    },
    {
        question: 'Cual es mi usuario?',
        answers: [
            {Text: 'Mi DPI', correct:false},
            {Text: 'Mi numero de Telefono', correct:true},
            {Text: 'Mi numero de cuenta', correct:true},
            {Text: 'Mi fecha de nacimiento', correct:false}
        ]
    }
]

// first, define a variable to keep track of the number of correct answers
let numCorrect = 0;

// get references to all the answer buttons (e.g. with document.querySelectorAll)
const answerButtons = document.querySelectorAll('btn');

// add an event listener to each button
answerButtons.forEach(button => {
  button.addEventListener('click', event => {
    // check if this button is the correct answer
    if (button.dataset.correct === 'true') { // assuming we've set a "data-correct" attribute on each button to indicate whether it's the correct answer
      numCorrect++; // increment the counter if this is the correct answer
    }
  });
});
