const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const POINTS_PER_QUESTION = 10;

    const questionsBank = [
      {
        question: "Quem criou o Vue.js e em qual ano ele foi lançado?",
        options: ["Brendan Eich, em 2010", "Evan You, em 2014", "Jordan Walke, em 2013", "Ryan Dahl, em 2015"],
        answer: 1,
        explanation: "O Vue.js foi criado por Evan You em 2014 com a proposta de começar pequeno e crescer no seu ritmo."
      },
      {
        question: "Segundo a introdução do seminário, qual das tecnologias web é responsável pelo COMPORTAMENTO (o que acontece quando clica ou digita)?",
        options: ["HTML", "CSS", "JavaScript", "TypeScript"],
        answer: 2,
        explanation: "O HTML cuida da estrutura, o CSS do estilo (cores/layout) e o JavaScript do comportamento dinâmico da página."
      },
      {
        question: "Quais das grandes empresas citadas na apresentação usam Vue.js em produção?",
        options: ["GitLab e Nintendo", "Google e Facebook", "Microsoft e Apple", "Netflix e Amazon"],
        answer: 0,
        explanation: "O Vue é utilizado em produção por grandes equipes de tecnologia como GitLab e Nintendo."
      },
      {
        question: "Qual das alternativas NÃO é um caso de uso típico do Vue citado na apresentação?",
        options: [
          "Painéis e dashboards com atualização em tempo real",
          "Lojas virtuais com filtros instantâneos",
          "Aplicações de página única (SPA) com sensação de app nativo",
          "Banco de dados relacional e queries SQL"
        ],
        answer: 3,
        explanation: "O Vue é um framework front-end utilizado em dashboards, lojas e SPAs, não um banco de dados."
      },
      {
        question: "No Vue 3 com Composition API, como criamos um estado reativo observado pelo framework?",
        options: ["const estado = useState('')", "const estado = ref('')", "const estado = reactiveState('')", "const estado = createSignal('')"],
        answer: 1,
        explanation: "A função ref() cria um estado reativo que o Vue observa para atualizar a interface quando o valor muda."
      },
      {
        question: "Como exibimos o valor de uma variável diretamente no template do Vue?",
        options: ["Qualquer texto direto", "Sintaxe de interpolação {{ texto }}", "Usando echo(texto)", "Usando console.log(texto)"],
        answer: 1,
        explanation: "As chaves duplas {{ texto }} mostram o valor da variável na tela de forma reativa e sempre atualizada."
      },
      {
        question: "Qual atalho/diretiva é usado para disparar uma ação através de um evento de clique?",
        options: ["@click", "v-on-tap", "onclick", "v-event:click"],
        answer: 0,
        explanation: "A diretiva @click escuta o evento de clique do usuário e dispara uma função do JavaScript."
      },
      {
        question: "Qual é o comando oficial para criar um novo projeto Vue 3 com Vite?",
        options: ["npm init react-app meu-app", "npm create vue@latest", "npm install vue-cli -g", "git clone vue-template"],
        answer: 1,
        explanation: "npm create vue@latest é o gerador oficial recomendado para iniciar novos projetos com Vite e Vue 3."
      },
      {
        question: "Qual comando do terminal é utilizado para rodar o projeto localmente para testes?",
        options: ["node -v", "npm install", "npm run dev", "npm start test"],
        answer: 2,
        explanation: "O comando 'npm run dev' inicia o servidor de desenvolvimento local para testar a aplicação no navegador."
      },
      {
        question: "Na construção da lista de tarefas (To-Do List), qual recurso foi usado para vincular o input com a nova tarefa?",
        options: ["v-model", "v-bind:input", "v-connect", "v-form"],
        answer: 0,
        explanation: "O v-model faz a vinculação bidirecional (two-way data binding) entre o campo de texto/checkbox e os dados."
      },
      {
        question: "Na renderização da lista de tarefas, quais recursos são combinados no template?",
        options: ["ref() e v-for", "v-if e v-else", "v-show e v-model", "computed() e reactive()"],
        answer: 0,
        explanation: "O ref() armazena o array de tarefas reativo no script e o v-for percorre esse array no template para renderizar os itens."
      },
      {
        question: "Para o contador de tarefas pendentes reagir automaticamente às alterações da lista, qual recurso do Vue foi utilizado?",
        options: ["methods", "computed()", "watchers", "mounted()"],
        answer: 1,
        explanation: "A função computed() calcula valores derivados (como tarefas pendentes) e se recalcula automaticamente quando as dependências mudam."
      }
    ];

    const currentScreen = ref("start");
    const currentQuestions = ref([]);
    const currentQuestionIndex = ref(0);
    const score = ref(0);
    const selectedAnswerIndex = ref(null);
    const answered = ref(false);

    const currentQuestion = computed(() => currentQuestions.value[currentQuestionIndex.value] || {});

    function shuffle(array) {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function startQuiz() {
      currentQuestions.value = shuffle(questionsBank).map((q) => {
        const options = shuffle(
          q.options.map((text, i) => ({ text, correct: i === q.answer }))
        );
        return {
          ...q,
          options: options.map((o) => o.text),
          answer: options.findIndex((o) => o.correct),
        };
      });

      currentQuestionIndex.value = 0;
      score.value = 0;
      answered.value = false;
      selectedAnswerIndex.value = null;
      currentScreen.value = "quiz";
    }

    function selectAnswer(index) {
      selectedAnswerIndex.value = index;
      answered.value = true;

      if (index === currentQuestion.value.answer) {
        score.value += POINTS_PER_QUESTION;
      }
    }

    function getOptionClass(index) {
      if (!answered.value) return "";
      if (index === currentQuestion.value.answer) return "correct";
      if (index === selectedAnswerIndex.value) return "wrong";
      return "";
    }

    function handleNextQuestion() {
      if (currentQuestionIndex.value < currentQuestions.value.length - 1) {
        currentQuestionIndex.value++;
        answered.value = false;
        selectedAnswerIndex.value = null;
      } else {
        currentScreen.value = "result";
      }
    }

    return {
      POINTS_PER_QUESTION,
      questionsBank,
      currentScreen,
      currentQuestions,
      currentQuestionIndex,
      currentQuestion,
      score,
      answered,
      startQuiz,
      selectAnswer,
      getOptionClass,
      handleNextQuestion,
    };
  },
}).mount("#app");
