# Vue Challenge - Quiz Interativo

Um quiz interativo de perguntas e respostas sobre **Vue.js 3**, desenvolvido como complemento prático para apresentação de seminário. O desafio conta com temporizador por questão, embaralhamento automático de perguntas e opções, e tela final com feedback detalhado de desempenho.

---

## Funcionalidades

- **12 Perguntas Personalizadas**: Baseadas nos temas abordados na apresentação (Conceitos, Comandos, Composition API e To-Do List).
- **Temporizador de 15 Segundos**: Tempo limite para responder a cada questão. Caso o tempo esgote, a questão é automaticamente considerada errada/anulada e a resposta correta é revelada.
- **Perguntas e Respostas Aleatórias**: A ordem das perguntas e das opções muda a cada nova tentativa.
- **Explicações Detalhadas**: Cada pergunta exibe um comentário explicativo após a resposta ser selecionada ou o tempo esgotar.
- **Tela de Resultado Aprimorada**:
  - Porcentagem de acertos calculada em tempo real.
  - Mensagem de feedback personalizada de acordo com o desempenho.
  - Estatísticas com total de pontos e número de acertos.
- **Interface Responsiva**: Adaptada para dispositivos móveis e computadores com o design visual inspirado no ecossistema Vue.js.

---

##  Tecnologias Utilizadas

- **HTML** 
- **CSS** 
- **Vue.js **

---

## Estrutura do Projeto

```text
.
├── index.html   # Estrutura principal e templates do Vue
├── style.css    # Estilização visual e temas do Vue.js
└── app.js       # Lógica do Quiz, banco de questões e temporizador
