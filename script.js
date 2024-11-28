const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Jupiter"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "H2O2"],
        answer: "H2O"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"],
        answer: "Harper Lee"
    },
    {
        question: "What is the speed of light?",
        options: ["3.00 × 10^8 m/s", "2.99 × 10^8 m/s", "3.50 × 10^8 m/s", "1.00 × 10^8 m/s"],
        answer: "3.00 × 10^8 m/s"
    },
    {
        question: "What year did the Titanic sink?",
        options: ["1912", "1905", "1915", "1898"],
        answer: "1912"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Tokyo", "Osaka", "Kyoto", "Hiroshima"],
        answer: "Tokyo"
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Onion", "Avocado", "Pepper"],
        answer: "Avocado"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Iron", "Quartz"],
        answer: "Diamond"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["Mount Kilimanjaro", "Mount Everest", "K2", "Mount Denali"],
        answer: "Mount Everest"
    },
    {
        question: "What does HTTP stand for?",
        options: ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "Hyper Transfer Text Protocol", "HyperText Transfer Process"],
        answer: "HyperText Transfer Protocol"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the most common element in Earth's atmosphere?",
        options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
        answer: "Nitrogen"
    },
    {
        question: "In which year did World War II end?",
        options: ["1945", "1944", "1946", "1947"],
        answer: "1945"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: "2"
    },
    {
        question: "Which animal is known as the King of the Jungle?",
        options: ["Tiger", "Lion", "Elephant", "Cheetah"],
        answer: "Lion"
    }
];


        let currentQuestionIndex = 0;
        let score = 0;
        let timer = 600; // 10 minutes in seconds
        let timerInterval;
        let userName = '';

        function startQuiz() {
            userName = document.getElementById('nameInput').value;
            if (!userName) {
                alert('Please enter your name to start the quiz.');
                return;
            }

            document.getElementById('welcomeScreen').style.display = 'none';
            document.getElementById('quiz').style.display = 'block';
            document.getElementById('timer').textContent = `Time left: 10:00`;
            showQuestion();
            startTimer();
        }

        function showQuestion() {
            const questionCountEl = document.getElementById('questionCount');
            const questionEl = document.getElementById('question');
            const optionsEl = document.getElementById('options');
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');
        
            questionCountEl.textContent = `Question: ${currentQuestionIndex + 1} / ${questions.length}`;
        
            questionEl.textContent = questions[currentQuestionIndex].question;
            optionsEl.innerHTML = '';
        
            questions[currentQuestionIndex].options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('btn', 'btn-outline-primary', 'mt-2');
                button.addEventListener('click', () => checkAnswer(option, button));
                optionsEl.appendChild(button);
            });
        
            // Display or hide navigation buttons based on current question
            prevButton.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
            nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next';
        }
        function nextQuestion() {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
            } else {
                showResult();
                clearInterval(timerInterval);
            }
        }

        function prevQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion();
            }
        }

function checkAnswer(selectedOption, buttonElement) {
            const correctAnswer = questions[currentQuestionIndex].answer;
            const optionsEl = document.getElementById('options');
            const buttons = optionsEl.querySelectorAll('button');
          
            // Check if the selected option is correct
            if (selectedOption === correctAnswer) {
              score++;
              buttonElement.classList.add('btn-correct');
            } else {
              buttonElement.classList.add('btn-wrong');
              // Highlight the correct answer in green
              buttons.forEach(btn => {
                if (btn.textContent === correctAnswer) {
                  btn.classList.add('btn-correct');
                }
              });
            }
          
            // Disable all buttons after an answer is selected
            // buttons.forEach(btn => {
            //   btn.disabled = true;
            // });
          }
        function showResult() {
            const quizEl = document.getElementById('quiz');
            const resultEl = document.getElementById('result');
            const scoreTextEl = document.getElementById('scoreText');

            quizEl.style.display = 'none';
            resultEl.style.display = 'block';
            scoreTextEl.textContent = `${userName}, your score: ${score} out of ${questions.length}`;
        }

        function restartQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            timer = 600;
            document.getElementById('quiz').style.display = 'none';
            document.getElementById('result').style.display = 'none';
            document.getElementById('welcomeScreen').style.display = 'block';
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                if (timer <= 0) {
                    clearInterval(timerInterval);
                    showResult();
                    return;
                }
                timer--;
                const minutes = Math.floor(timer / 60);
                const seconds = timer % 60;
                document.getElementById('timer').textContent = `Time left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }
