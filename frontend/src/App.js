import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const QUESTIONS = [
  { question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], answer: "Brasília" },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
  { question: "What is the largest planet in our Solar System?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
  { question: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: "Nitrogen" },
  { question: "What year did World War II end?", options: ["1942", "1945", "1947", "1939"], answer: "1945" },
  { question: "Which country hosted the 2016 Summer Olympics?", options: ["China", "Brazil", "Japan", "USA"], answer: "Brazil" },
  { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "H2SO4"], answer: "H2O" },
  { question: "Who was the first person to walk on the moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Alan Shepard"], answer: "Neil Armstrong" },
  { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
  { question: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Oxygen", "Carbon"], answer: "Hydrogen" },
  { question: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
  { question: "Who painted the Sistine Chapel ceiling?", options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"], answer: "Michelangelo" },
  { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "South Korea", "Thailand"], answer: "Japan" },
  { question: "What is the smallest country in the world by land area?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: "Vatican City" },
  { question: "Which animal is known as the 'King of the Jungle'?", options: ["Tiger", "Elephant", "Lion", "Gorilla"], answer: "Lion" },
  { question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Onion", "Pepper"], answer: "Avocado" },
  { question: "Which scientist developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"], answer: "Albert Einstein" },
  { question: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], answer: "Yen" },
  { question: "Which continent is the Sahara Desert located on?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
  { question: "Who discovered penicillin?", options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Gregor Mendel"], answer: "Alexander Fleming" },
  { question: "What is the hardest natural substance known?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" },
  { question: "Which ocean lies between Europe and North America?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], answer: "Atlantic" },
  { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "New Delhi", "Kolkata"], answer: "New Delhi" },
  { question: "Which sport is associated with Wimbledon?", options: ["Cricket", "Football", "Tennis", "Golf"], answer: "Tennis" },
  { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
  { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], answer: "George Washington" },
  { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: "Blue Whale" },
  { question: "Which country is home to the kangaroo?", options: ["Australia", "New Zealand", "South Africa", "India"], answer: "Australia" },
  { question: "What is the boiling point of water in Celsius?", options: ["0", "50", "100", "150"], answer: "100" },
  { question: "Which famous ship sank in 1912?", options: ["Lusitania", "Titanic", "Queen Mary", "Bismarck"], answer: "Titanic" },
  { question: "What is the capital of Russia?", options: ["Moscow", "St. Petersburg", "Kiev", "Vladivostok"], answer: "Moscow" },
  { question: "Who invented the light bulb?", options: ["Thomas Edison", "Nikola Tesla", "Alexander Bell", "Henry Ford"], answer: "Thomas Edison" },
  { question: "What is the largest desert in the world?", options: ["Sahara", "Gobi", "Antarctic", "Kalahari"], answer: "Antarctic" },
  { question: "Which language has the most native speakers worldwide?", options: ["English", "Spanish", "Mandarin Chinese", "Hindi"], answer: "Mandarin Chinese" },
  { question: "What is the tallest mountain in the world?", options: ["K2", "Kangchenjunga", "Everest", "Makalu"], answer: "Everest" },
  { question: "Which organ pumps blood in the human body?", options: ["Lungs", "Heart", "Liver", "Kidneys"], answer: "Heart" },
  { question: "What is the primary source of energy for Earth?", options: ["Moon", "Sun", "Wind", "Ocean"], answer: "Sun" },
  { question: "Which country won the FIFA World Cup in 2018?", options: ["Brazil", "Germany", "France", "Argentina"], answer: "France" },
  { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
  { question: "Which gas is used to fill balloons to make them float?", options: ["Oxygen", "Helium", "Nitrogen", "Carbon Dioxide"], answer: "Helium" },
  { question: "Who wrote 'Pride and Prejudice'?", options: ["Jane Austen", "Emily Brontë", "Charlotte Brontë", "Mary Shelley"], answer: "Jane Austen" },
  { question: "What is the largest bone in the human body?", options: ["Skull", "Femur", "Spine", "Humerus"], answer: "Femur" },
  { question: "Which country is known for the Eiffel Tower?", options: ["Italy", "Spain", "France", "Germany"], answer: "France" },
  { question: "What is the freezing point of water in Celsius?", options: ["0", "32", "100", "-10"], answer: "0" },
  { question: "Which bird is a symbol of peace?", options: ["Eagle", "Dove", "Owl", "Peacock"], answer: "Dove" },
  { question: "What is the capital of Egypt?", options: ["Cairo", "Alexandria", "Giza", "Luxor"], answer: "Cairo" },
  { question: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: "Mercury" },
  { question: "What is the main language spoken in Brazil?", options: ["Spanish", "Portuguese", "English", "French"], answer: "Portuguese" },
  { question: "Which vitamin is primarily obtained from sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: "Vitamin D" },
  { question: "What is the largest country by land area?", options: ["USA", "China", "Russia", "Canada"], answer: "Russia" }
];

const TOTAL_QUESTIONS = QUESTIONS.length;
const QUIZ_TIME = 15 * 60; // 15 minutes in seconds

function getHighScores() {
  return JSON.parse(localStorage.getItem('highScores') || '[]');
}

function setHighScores(scores) {
  localStorage.setItem('highScores', JSON.stringify(scores));
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export default function App() {
  // Auth states
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');

  // Quiz states
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(Array(TOTAL_QUESTIONS).fill(false));
  const [selectedOptions, setSelectedOptions] = useState(Array(TOTAL_QUESTIONS).fill(null));
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [quizEnded, setQuizEnded] = useState(false);
  const timerRef = useRef();

  // High scores
  const [highScores, updateHighScores] = useState(getHighScores());

  // Timer effect
  useEffect(() => {
    if (started && !quizEnded) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setQuizEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [started, quizEnded]);

  // End quiz if all questions answered
  useEffect(() => {
    if (answered.every(Boolean) && started && !quizEnded) {
      setQuizEnded(true);
      clearInterval(timerRef.current);
    }
  }, [answered, started, quizEnded]);

  // Save high score on quiz end
  useEffect(() => {
    if (quizEnded && user) {
      const newScore = { username: user, score, time: QUIZ_TIME - timeLeft };
      let scores = getHighScores();
      scores.push(newScore);
      scores = scores
        .sort((a, b) => b.score - a.score || a.time - b.time)
        .slice(0, 3);
      setHighScores(scores);
      updateHighScores(scores);
    }
  }, [quizEnded, user, score, timeLeft]);

  // Auth handlers
  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    if (users[username] && users[username] === password) {
      setUser(username);
      setAuthError('');
    } else {
      setAuthError('Invalid username or password');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = getUsers();
    if (registerUsername in users) {
      setAuthError('Username already exists');
      return;
    }
    if (!registerUsername || !registerPassword) {
      setAuthError('Please fill all fields');
      return;
    }
    users[registerUsername] = registerPassword;
    setUsers(users);
    setAuthError('Registration successful! Please login.');
    setIsLogin(true);
    setRegisterUsername('');
    setRegisterPassword('');
  };

  // Quiz handlers
  const startQuiz = () => {
    setStarted(true);
    setQuizEnded(false);
    setScore(0);
    setCurrentQuestion(0);
    setAnswered(Array(TOTAL_QUESTIONS).fill(false));
    setSelectedOptions(Array(TOTAL_QUESTIONS).fill(null));
    setTimeLeft(QUIZ_TIME);
  };

  const handleOptionClick = (option) => {
    if (answered[currentQuestion] || quizEnded) return;
    const correct = QUESTIONS[currentQuestion].answer === option;
    const newAnswered = [...answered];
    const newSelected = [...selectedOptions];
    newAnswered[currentQuestion] = true;
    newSelected[currentQuestion] = option;
    setAnswered(newAnswered);
    setSelectedOptions(newSelected);
    if (correct) setScore((s) => s + 1);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion((q) => q - 1);
  };

  const nextQuestion = () => {
    if (currentQuestion < TOTAL_QUESTIONS - 1) setCurrentQuestion((q) => q + 1);
  };

  const logout = () => {
    setUser(null);
    setStarted(false);
    setQuizEnded(false);
    setScore(0);
    setCurrentQuestion(0);
    setAnswered(Array(TOTAL_QUESTIONS).fill(false));
    setSelectedOptions(Array(TOTAL_QUESTIONS).fill(null));
    setTimeLeft(QUIZ_TIME);
  };

  // Timer display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Progress bar
  const progress = ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Login/Register */}
      {!user && (
        <div className="container" style={{ opacity: 1 }}>
          <h1>{isLogin ? 'Login' : 'Register'}</h1>
          <form className="login-form" onSubmit={isLogin ? handleLogin : handleRegister}>
            {isLogin ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Choose Username"
                  value={registerUsername}
                  onChange={e => setRegisterUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Choose Password"
                  value={registerPassword}
                  onChange={e => setRegisterPassword(e.target.value)}
                  required
                />
              </>
            )}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <button type="button" className="nav-btn" style={{ marginTop: 0 }} onClick={() => { setIsLogin(!isLogin); setAuthError(''); }}>
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
            {authError && <div className="feedback" style={{ color: authError.includes('success') ? '#00e676' : '#ff1744' }}>{authError}</div>}
          </form>
        </div>
      )}

      {/* Start Quiz */}
      {user && !started && !quizEnded && (
        <div className="container" style={{ opacity: 1 }}>
          <h1>General Knowledge Quiz</h1>
          <button onClick={startQuiz}>Start Quiz</button>
          <button className="nav-btn" style={{ marginTop: 20 }} onClick={logout}>Logout</button>
          <div style={{ marginTop: 30 }}>
            <h2 style={{ color: '#00ffcc', textAlign: 'center', marginBottom: 10 }}>Top 3 High Scores</h2>
            <ol style={{ color: '#fff', fontSize: '1.1em', textAlign: 'left', margin: '0 auto', maxWidth: 400 }}>
              {highScores.length === 0 && <li>No high scores yet.</li>}
              {highScores.map((hs, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>{hs.username}</span>: {hs.score} / {TOTAL_QUESTIONS} ({Math.floor(hs.time / 60)}:{(hs.time % 60).toString().padStart(2, '0')})
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Quiz */}
      {user && started && !quizEnded && (
        <div className="container" style={{ opacity: 1 }}>
          <h1>General Knowledge Quiz</h1>
          <div id="timer">Time Left: {minutes}:{seconds.toString().padStart(2, '0')}</div>
          <div id="question" className="question">{currentQuestion + 1}. {QUESTIONS[currentQuestion].question}</div>
          <div id="options" className="options">
            {QUESTIONS[currentQuestion].options.map(option => {
              let btnClass = '';
              if (answered[currentQuestion]) {
                if (option === QUESTIONS[currentQuestion].answer) btnClass = 'correct';
                else if (option === selectedOptions[currentQuestion] && option !== QUESTIONS[currentQuestion].answer) btnClass = 'wrong';
              }
              return (
                <button
                  key={option}
                  className={btnClass}
                  disabled={answered[currentQuestion]}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              );
            })}
            {answered[currentQuestion] && selectedOptions[currentQuestion] !== QUESTIONS[currentQuestion].answer && (
              <p className="feedback">The correct answer was: {QUESTIONS[currentQuestion].answer}</p>
            )}
          </div>
          <div className="navigation">
            <button className="nav-btn" onClick={prevQuestion} disabled={currentQuestion === 0}>Previous</button>
            <button className="nav-btn" onClick={nextQuestion} disabled={currentQuestion === TOTAL_QUESTIONS - 1}>Next</button>
          </div>
          <div id="score" className="score-update">Score: {score}/{TOTAL_QUESTIONS}</div>
          <div className="progress-bar"><div className="progress" style={{ width: `${progress}%` }}></div></div>
        </div>
      )}

      {/* Quiz Ended / Dashboard */}
      {user && quizEnded && (
        <div className="container" style={{ opacity: 1 }}>
          <h1>Quiz Completed!</h1>
          <div style={{ margin: '20px 0', fontSize: '1.2em', color: '#00e676' }}>
            {score > 40
              ? `Excellent job! Your score: ${score}/${TOTAL_QUESTIONS}. You're a cosmic knowledge master!`
              : score > 20
              ? `Great effort! Your score: ${score}/${TOTAL_QUESTIONS}. Well done, space explorer!`
              : `Nice try! Your score: ${score}/${TOTAL_QUESTIONS}. Keep exploring the universe!`}
          </div>
          <div style={{ margin: '20px 0' }}>
            <h2 style={{ color: '#00ffcc', textAlign: 'center', marginBottom: 10 }}>Top 3 High Scores</h2>
            <ol style={{ color: '#fff', fontSize: '1.1em', textAlign: 'left', margin: '0 auto', maxWidth: 400 }}>
              {highScores.length === 0 && <li>No high scores yet.</li>}
              {highScores.map((hs, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>{hs.username}</span>: {hs.score} / {TOTAL_QUESTIONS} ({Math.floor(hs.time / 60)}:{(hs.time % 60).toString().padStart(2, '0')})
                </li>
              ))}
            </ol>
          </div>
          <button className="nav-btn" onClick={startQuiz}>Restart Quiz</button>
          <button className="nav-btn" style={{ marginLeft: 10 }} onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
} 