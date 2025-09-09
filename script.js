const quizData = [
    { question: "Столица России?", answers: ["Москва", "Санкт-Петербург", "Казань", "Новосибирск"], correct: 0 },
    { question: "2 + 2 = ?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "Какой язык программирования используется для веба?", answers: ["Python", "HTML", "C++", "Java"], correct: 1 },
    { question: "Цвет неба?", answers: ["Синий", "Красный", "Зелёный", "Жёлтый"], correct: 0 },
    { question: "Сколько дней в году?", answers: ["365", "360", "366", "364"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');

function startTimer() {
    timeLeft = 15;
    timerEl.textContent = `Время: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Время: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrect();
        }
    }, 1000);
}

function loadQuestion() {
    startTimer();
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.addEventListener('click', () => selectAnswer(index));
        answersEl.appendChild(btn);
    });
    nextBtn.style.display = 'none';
}

function selectAnswer(index) {
    clearInterval(timer);
    const correctIndex = quizData[currentQuestion].correct;
    if (index === correctIndex) {
        score++;
        scoreEl.textContent = `Очки: ${score}`;
        answersEl.children[index].classList.add('correct');
    } else {
        answersEl.children[index].classList.add('wrong');
        answersEl.children[correctIndex].classList.add('correct');
    }
    Array.from(answersEl.children).forEach(btn => btn.disabled = true);
    nextBtn.style.display = 'inline-block';
}

function showCorrect() {
    const correctIndex = quizData[currentQuestion].correct;
    Array.from(answersEl.children).forEach(btn => btn.disabled = true);
    answersEl.children[correctIndex].classList.add('correct');
    nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionEl.style.display = 'none';
    answersEl.style.display = 'none';
    nextBtn.style.display = 'none';
    timerEl.style.display = 'none';
    resultEl.textContent = `Игра окончена! Вы набрали ${score} из ${quizData.length} очков!`;
}

loadQuestion();
