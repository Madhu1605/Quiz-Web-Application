const quizContainer = document.getElementById("quiz-content");
const startBtn = document.getElementById("start-btn");

const quizSets = [
  [
    { question: "Which company created JavaScript?", choices: ["Microsoft", "Netscape", "Google", "Mozilla"], correct: "Netscape" },
    { question: "What does HTML stand for?", choices: ["Hyper Text Markup Language", "High Transfer Machine Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: "Hyper Text Markup Language" },
    { question: "Which tag is used to link a CSS file?", choices: ["<css>", "<style>", "<link>", "<script>"], correct: "<link>" },
    { question: "Which property changes text color in CSS?", choices: ["font-color", "color", "text-color", "fgcolor"], correct: "color" },
    { question: "What does DOM stand for?", choices: ["Document Object Model", "Data Object Method", "Document Original Model", "Digital Order Module"], correct: "Document Object Model" }
  ],
  [
    { question: "Which HTML element is used for the largest heading?", choices: ["<heading>", "<h1>", "<head>", "<h6>"], correct: "<h1>" },
    { question: "In CSS, which property controls text size?", choices: ["font-style", "text-size", "font-size", "text-style"], correct: "font-size" },
    { question: "Which symbol is used for comments in JavaScript?", choices: ["//", "/* */", "#", "<!-- -->"], correct: "//" },
    { question: "Which method displays a message box in JavaScript?", choices: ["alert()", "prompt()", "confirm()", "show()"], correct: "alert()" },
    { question: "Which tag is used to insert a line break in HTML?", choices: ["<break>", "<lb>", "<br>", "<line>"], correct: "<br>" }
  ],
  [
    { question: "What keyword declares a variable in JavaScript?", choices: ["let", "var", "const", "All of these"], correct: "All of these" },
    { question: "Which attribute is used to provide alternate text for an image?", choices: ["title", "alt", "src", "href"], correct: "alt" },
    { question: "Which CSS property makes text bold?", choices: ["font-weight", "text-bold", "font-style", "bold"], correct: "font-weight" },
    { question: "Which HTML element holds JavaScript code?", choices: ["<code>", "<js>", "<script>", "<javascript>"], correct: "<script>" },
    { question: "Which company developed React?", choices: ["Google", "Microsoft", "Facebook", "Amazon"], correct: "Facebook" }
  ]
];

let currentSetIndex = 0;
let currentQuestion = 0;
let score = 0;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  // Choose a random question set each time
  currentSetIndex = Math.floor(Math.random() * quizSets.length);
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

// escape < > signs for HTML tags
function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function showQuestion() {
  const set = quizSets[currentSetIndex];
  if (currentQuestion >= set.length) {
    showScore();
    return;
  }

  const q = set[currentQuestion];
  quizContainer.innerHTML = `
    <div class="fade">
      <h2>${q.question}</h2>
      ${q.choices.map(choice => `<div class="choice">${escapeHTML(choice)}</div>`).join('')}
    </div>
  `;

  document.querySelectorAll(".choice").forEach(choice => {
    choice.addEventListener("click", () => selectAnswer(choice.textContent, q.correct));
  });
}

function selectAnswer(selected, correct) {
  if (selected === correct) score++;
  currentQuestion++;
  showQuestion();
}

function showScore() {
  const setScore = score;
  const setTotal = quizSets[currentSetIndex].length;

  quizContainer.innerHTML = `
    <div class="fade">
      <h2>Quiz Complete! 🎉</h2>
      <p>Your score: ${setScore} / ${setTotal}</p>
      <button id="play-again" class="btn">Play Again</button>
      <button id="quit" class="btn" style="background-color:#dc3545;">Quit</button>
    </div>
  `;

  document.getElementById("play-again").addEventListener("click", startQuiz);
  document.getElementById("quit").addEventListener("click", showGoodbye);
}

function showGoodbye() {
  quizContainer.innerHTML = `
    <div class="fade">
      <h2>✨ Thanks for playing! ✨</h2>
      <p>Keep learning and building amazing projects 💻</p>
      <button id="restart" class="btn">Restart Quiz</button>
    </div>
  `;
  document.getElementById("restart").addEventListener("click", () => {
    quizContainer.innerHTML = `<button id="start-btn" class="btn">Start Quiz</button>`;
    document.getElementById("start-btn").addEventListener("click", startQuiz);
  });
}
