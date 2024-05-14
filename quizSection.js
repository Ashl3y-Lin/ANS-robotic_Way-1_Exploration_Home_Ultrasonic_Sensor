//a list of questions
const questions = [
    {
        question: "In what distance unit of measure is used in Ultrasonic sensor?" ,
        answers: [
            {text: "Meter (m)", correct: false}, 
            {text: "Millimeter (mm)", correct: false}, 
            {text: "Centimeter (cm)", correct: true}, 
            {text: "Kilometer (km)", correct: false}, 
        ]
    },
    {
        question: "How to make a robot stop when ultrasonic sensor sense 10 cm away from an object?" ,
        answers: [
            {text: "1- Repeat until [Ultrasonic is more than 10cm] Movement blocks. 2- Stop moving.", correct: false}, 
            {text: "1- Repeat until [Ultrasonic is less than 20cm] Movement blocks. 2- Stop moving.", correct: false}, 
            {text: "1- Stop moving. 2- Repeat until [Ultrasonic is less than 10cm] Movement blocks.", correct: false}, 
            {text: "1- Repeat until [Ultrasonic is less than 10cm] Movement blocks. 2- Stop moving.", correct: true}, 

        ]
    },
    {
        question:"Why is Ultrasonic Sensor important in EV3 robotics?" ,
        answers: [
            {text: "Detecting colors", correct: false}, 
            {text: "Sensing temperature", correct: false}, 
            {text: "Detecting physical contacts", correct: false}, 
            {text: "Measuring distance", correct: true}, 
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons"); //This is the damn problem why i got stuck: answerElement instead of answerButton.
const nextButton = document.getElementById("next-button");

// To keep track of the scores and start the questions
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0; //when start the quiz, the question 1
    score = 0;
    nextButton.innerHTML = 'Next'; //display teh next button once you select an asnwer
    showQuestion(); //calling the next question.
}

function showQuestion(){
    resetState();

    //display  the questions:
    let currentQuestion = questions[currentQuestionIndex]; //keep track of the questions: begin with question 1 and continue.
    
    let questionNumber = currentQuestionIndex + 1; //next question, computer will know that the 1st question it's answered

    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question; //replace the text in the HTML to the texts from the list.


    //displat the multiple questions asnwer texts
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); //in the button:....
        button.innerHTML = answer.text; //get into the list: the answer element
        button.classList.add("btn");
        answerButton.appendChild(button); //Thios is to append a child element to an existing parent element
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){ //this function it's to remove the asnwers 1 answer 2 ... from the html
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){ //the amount of questions I have.
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
