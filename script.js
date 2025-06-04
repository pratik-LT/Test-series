const questions = [
  {
    question: ["यदि (k²+3) और (k³+5) अभज्य संख्या हैं तो k का मान क्या होगा?"],
    options: ["2", "4", "7", "3"],
    answer: 0
  },
  {
    question: [
      "संख्याओं के किस समुच्चय में प्रत्येक जोड़ी एक दूसरे के सहअभाज्य हैं?"
    ],
    options: ["42,55,69", "21,32,43", "35,48,55", "24,35,49"],
    answer: 1
  },
  {
    question: [
      "गुणनफल 6812 × 3528 × 3179 × 4324 में इकाई का अंक ज्ञात करिए?"
    ],
    options: ["3", "5", "7", "6"],
    answer: 0
  },
  {
    question: [
      "127 × 137 × 413 × 291 × 342 × 533 × 342 × के गुणनफल के इकाई का अंक क्या होगा?"
    ],
    options: ["6", "8", "10", "4"],
    answer: 3
  },
  {
    question: [
      "'a' का न्यूनतम मान क्या होगा जिसके लिए संख्या 638a435, 3 से पूर्णतः विभाज्य है?"
    ],
    options: ["1", "2", "3", "4"],
    answer: 0
  },
  {
    question: [
      "यदि 483y718 अभाज्य संख्या 11 से विभाज्य है जहां y एक अंक है, तो y का मान क्या होगा?"
    ],
    options: ["2", "3", "4", "5"],
    answer: 0
  }
];

let totalTime = 120;
let currentQuestion = 0;
let score = 0;
let timerInterval;

const startBtn = document.getElementById("start-btn");
const timeEl = document.getElementById("time");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("prev-btn");
const resultEl = document.getElementById("result");
const quizContainer = document.getElementById("quiz-container");
const timer = document.getElementById("timer");

const placeholderQuiz = document.getElementById("footer-placeholder-quiz");
const placeholderResult = document.getElementById("footer-placeholder-result");
const scoreDisplay = document.getElementById("score");

const footer = document.getElementById("footer");

const userForm = document.getElementById("user-form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");
const mobileInput = document.getElementById("mobile");
const dateInput = document.getElementById("date");

function startTimer() {
  timerInterval = setInterval(() => {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    timeEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    totalTime--;

    if (totalTime < 0) {
      clearInterval(timerInterval);
      finishTest();
    }
  }, 1000);
}

function showQuestion(index) {
  const q = questions[index];
  questionEl.innerHTML = `
    <ul style="list-style: none; padding-left: 0;">
      <li style="margin-bottom: 5px;">${q.question[0]}</li>
    </ul>
  `;
  optionsEl.innerHTML = "";

  q.options.forEach((option, i) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = i;
    li.appendChild(input);
    li.appendChild(document.createTextNode(" " + option));
    optionsEl.appendChild(li);
  });

  // Disable previous button if at the first question
  previousBtn.disabled = index === 0;
}

function finishTest() {
  quizContainer.classList.add("hidden");
  timer.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreDisplay.textContent = `Time's up! You scored ${score} out of ${questions.length}`;
  placeholderResult.appendChild(footer);
}

function showFinalResult() {
  quizContainer.classList.add("hidden");
  timer.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreDisplay.textContent = `You scored ${score} out of ${questions.length}`;
  placeholderResult.appendChild(footer);
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return;

  if (parseInt(selected.value) === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    clearInterval(timerInterval);
    showFinalResult();
  }
});

previousBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const mobile = mobileInput.value.trim();
  const date = dateInput.value;

  const mobileRegex = /^[0-9]{10}$/;

  if (!name || !lastName || !mobile || !date) {
    alert("Please fill all the details.");
    return;
  }

  if (!mobileRegex.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  userForm.classList.add("hidden");
  startBtn.classList.remove("hidden");
});

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  timer.classList.remove("hidden");
  quizContainer.classList.remove("hidden");

  showQuestion(currentQuestion);
  startTimer();
  placeholderQuiz.appendChild(footer);
});
