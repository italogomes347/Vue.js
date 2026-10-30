const questionsBank = [
  {
    question: "O que é o Vue.js?",
    options: [
      "Um banco de dados",
      "Um framework JavaScript",
      "Uma linguagem de programação",
      "Um sistema operacional",
    ],
    answer: 1,
    explanation:
      "Vue.js é um framework JavaScript progressivo para construir interfaces de usuário.",
  },
  {
    question: "Qual diretiva é usada para renderizar uma lista no Vue?",
    options: ["v-list", "v-for", "v-repeat", "v-map"],
    answer: 1,
    explanation:
      "O v-for percorre arrays ou objetos e renderiza um elemento para cada item.",
  },
  {
    question: "Qual é a função do 'v-model'?",
    options: [
      "Fazer requisições HTTP",
      "Two-way data binding",
      "Criar animações",
      "Validar formulários",
    ],
    answer: 1,
    explanation:
      "O v-model sincroniza o valor de um input com o estado, nos dois sentidos.",
  },
  {
    question: "Como passamos dados de um componente pai para um filho?",
    options: ["Emits", "Slots", "Vuex", "Props"],
    answer: 3,
    explanation:
      "Props são atributos customizados que o pai envia e o filho declara para receber.",
  },
  {
    question:
      "Qual hook de ciclo de vida é chamado logo após o componente ser montado no DOM?",
    options: ["created", "beforeMount", "mounted", "updated"],
    answer: 2,
    explanation:
      "O hook mounted (onMounted na Composition API) roda quando o componente já está no DOM.",
  },
  {
    question:
      "Qual a principal vantagem de uma propriedade 'computed' sobre um 'method'?",
    options: [
      "Aceita parâmetros",
      "Seu resultado fica em cache enquanto as dependências não mudam",
      "Executa de forma assíncrona",
      "Pode alterar o estado diretamente",
    ],
    answer: 1,
    explanation:
      "Computeds são recalculadas apenas quando suas dependências reativas mudam.",
  },
  {
    question: "Qual é a função do componente <RouterLink> do Vue Router?",
    options: [
      "Fazer requisições à API",
      "Navegar entre rotas sem recarregar a página",
      "Criar links para downloads",
      "Proteger rotas privadas",
    ],
    answer: 1,
    explanation:
      "O RouterLink gera links que o Vue Router intercepta, trocando a view sem um reload completo.",
  },
  {
    question:
      "Como definimos uma store no Pinia, a biblioteca oficial de estado global?",
    options: ["createStore()", "defineStore()", "useState()", "makeStore()"],
    answer: 1,
    explanation:
      "defineStore() cria uma store com state, getters e actions, usada em componentes via useXStore().",
  },
  {
    question:
      "Na Composition API, qual a diferença principal entre ref() e reactive()?",
    options: [
      "ref não funciona com arrays",
      "reactive funciona apenas com tipos primitivos",
      "ref requer '.value' para acessar/modificar o valor no script",
      "Não há diferença",
    ],
    answer: 2,
    explanation:
      "ref envolve o valor em um objeto com .value (desembrulhado automaticamente no template); reactive trabalha direto em objetos.",
  },
  {
    question: "Para que serve a função 'provide' e 'inject' no Vue?",
    options: [
      "Injeção de dependência profunda na árvore de componentes",
      "Importar bibliotecas externas",
      "Modificar o estado global do Vue Router",
      "Renderizar componentes assíncronos",
    ],
    answer: 0,
    explanation:
      "Permitem que um ancestral forneça dados a qualquer descendente sem passar props por cada nível.",
  },
];

const POINTS_PER_QUESTION = 10;

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const screens = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
};

const dom = {
  questionText: document.getElementById("question-text"),
  optionsContainer: document.getElementById("options-container"),
  explanation: document.getElementById("explanation"),
  nextBtn: document.getElementById("next-btn"),
  questionTracker: document.getElementById("question-tracker"),
  scoreTracker: document.getElementById("score-tracker"),
  finalScore: document.getElementById("final-score"),
};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  screens[screenName].classList.remove("hidden");
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
dom.nextBtn.addEventListener("click", handleNextQuestion);
document
  .getElementById("home-btn")
  .addEventListener("click", () => showScreen("start"));

function startQuiz() {
  currentQuestions = shuffle(questionsBank).map((q) => {
    const options = shuffle(
      q.options.map((text, i) => ({ text, correct: i === q.answer })),
    );
    return {
      ...q,
      options: options.map((o) => o.text),
      answer: options.findIndex((o) => o.correct),
    };
  });

  currentQuestionIndex = 0;
  score = 0;
  updateTrackers();
  loadQuestion();
  showScreen("quiz");
}

function loadQuestion() {
  dom.nextBtn.classList.add("hidden");
  dom.explanation.classList.add("hidden");
  const currentQuestion = currentQuestions[currentQuestionIndex];
  dom.questionText.textContent = currentQuestion.question;
  dom.optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(index, button));
    dom.optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuestion.answer;
  const allButtons = dom.optionsContainer.querySelectorAll(".option-btn");

  if (isCorrect) {
    selectedButton.classList.add("correct");
    score += POINTS_PER_QUESTION;
  } else {
    selectedButton.classList.add("wrong");
    allButtons[currentQuestion.answer].classList.add("correct");
  }

  updateTrackers();

  allButtons.forEach((btn) => (btn.disabled = true));

  dom.explanation.textContent = `💡 ${currentQuestion.explanation}`;
  dom.explanation.classList.remove("hidden");

  dom.nextBtn.textContent =
    currentQuestionIndex === currentQuestions.length - 1
      ? "Ver Resultado"
      : "Próxima Pergunta";
  dom.nextBtn.classList.remove("hidden");
}

function handleNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    updateTrackers();
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function updateTrackers() {
  dom.questionTracker.textContent = `Pergunta ${currentQuestionIndex + 1}/${currentQuestions.length}`;
  dom.scoreTracker.textContent = `Pontos: ${score}`;
}

function finishQuiz() {
  dom.finalScore.textContent = `${score}/${currentQuestions.length * POINTS_PER_QUESTION}`;
  showScreen("result");
}
