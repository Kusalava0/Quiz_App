'use client'
import React, { useEffect, useState } from 'react';
import ResponsesModal from '@/components/Review';

const Page = () => {
  const [questionData, setQuestionData] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const initialTimer = 1800; // 30 minutes in seconds
  const [timer, setTimer] = useState(initialTimer);
  const [questionContainerClass, setQuestionContainerClass] = useState('');
  const [navigationAnimationClass, setNavigationAnimationClass] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResponsesModal, setShowResponsesModal] = useState(false);

  // Fetch question data
  const fetchQuestionData = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=15");
    const questionData = await response.json();
    const questions = questionData.results;
    setQuestionData(questions);
  };

  const decrementTimer = () => {
    if (timer > 0) {
      setTimer((prevTimer) => prevTimer - 1);
    }
  };

  useEffect(() => {
    const decrementTimer = () => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    };

    const timerInterval = setInterval(decrementTimer, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timer]);


  useEffect(() => {
    if (timer === 0) {
      // Timer has reached zero, end the test
      setShowResult(true);
    }
  }, [timer]);
  useEffect(() => {
    fetchQuestionData();
  }, []);

  useEffect(() => {
    if (questionData && questionData.length > 0) {
      const { correct_answer, incorrect_answers } = questionData[activeQuestion];
      const answers = [...incorrect_answers, correct_answer];
      const shuffled = shuffle(answers);
      setShuffledAnswers(shuffled);
    }
  }, [activeQuestion, questionData]);

  const shuffle = (answers) => {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
  };

  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[activeQuestion] = answer; // Store the selected answer for the current question
      return newSelectedAnswers;
    });
    if (answer === correct_answer) {
      setSelectedAnswer(true);
      console.log('true');
    } else {
      setSelectedAnswer(false);
      console.log('false');
    }
  };

  if (!questionData) {
    // Handle the case when questionData is still null
    return (
      <div className="shadow rounded-md p-4 w-[60vw] mx-auto">
        <div className="animate-pulse flex space-x-4 mb-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        </div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const questions = questionData;

  const { question, correct_answer, incorrect_answers } = questions[activeQuestion];

  // calculate score and move onto the next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);

    // Add scale-down class to trigger the animation
    setQuestionContainerClass('question-container scale-down');

    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }
    );

    setTimeout(() => {
      // After the animation, switch to the next question and add scale-up class
      setQuestionContainerClass('question-container scale-up');
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
      } else {
        setActiveQuestion(0);
        setShowResult(true);
      }
      setChecked(false);
    }, 300); // Adjust the time to match your animation duration
  };


  const handleQuestionSelection = (index) => {
    setSelectedQuestionIndex(index);

    // Add scale-down class to trigger the animation
    setQuestionContainerClass('question-container scale-down');

    // Reset the selected answer and checked status when changing questions
    setActiveQuestion(index);
    setSelectedAnswer('');
    setChecked(false);
    setSelectedAnswerIndex(null);

    setTimeout(() => {
      // After the animation, add scale-up class to bring it back to normal size
      setQuestionContainerClass('question-container scale-up');
    }, 300); // Adjust the time to match your animation duration
  };

  const decodeHtmlEntities = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };


  return (
    <div className='main-container w-[70vw] h-[100vh] flex flex-col justify-center align-middle scale-up'>
      <h1 className=' font-bold text-2xl'>Quiz Questions</h1>
      {!showResult ? (
        <div>
          <div className="question-navigation flex flex-wrap justify-between align-middle">
            <div className='flex flex-wrap gap-4'>
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`question-button ${index === activeQuestion ? 'selected' : ''}`}
                  onClick={() => handleQuestionSelection(index)}
                >
                  Q{index + 1}
                </button>
              ))}

            </div>
            <h4 className='mt-3 text-xl'><i className="fa-regular fa-clock fa-spin"></i> {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</h4>
          </div>
          <h2 className=' font-bold text-xl mt-8'>Question {activeQuestion + 1} / {questions.length}</h2>
        </div>
      ) : (
        <div>
          <h1 className='text-2xl font-semibold'>Results</h1>
        </div>
      )
      }
      <div>
        {!showResult ? (
          <div className={`quiz-container ${questionContainerClass}`}>
            <div className="flex flex-row font-medium">
              <h3>{decodeHtmlEntities(question)}</h3>
            </div>
            {shuffledAnswers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={selectedAnswers[activeQuestion] === answer ? 'li-selected' : 'li-hover'}>
                <span>{answer}</span>
              </li>
            ))}
            {checked ? (
              <button onClick={nextQuestion} className='button'>
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            ) : (
              <button onClick={nextQuestion} className='btn-disabled' disabled>
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            )}
            <div>
              {/* Display the selected answer for the current question */}
              {selectedAnswers[activeQuestion] && (
                <p>Selected Answer: {selectedAnswers[activeQuestion]}</p>
              )}
            </div>
          </div>
        ) : (
          <div className='quiz-container'>
            <h3>Overall {Math.ceil((result.score / 75) * 100)}%</h3>
            <p>Total Questions: <span>{questions.length}</span></p>
            <p>Total Score: <span>{result.score}</span></p>
            <p>Correct Answers: <span>{result.correctAnswers}</span></p>
            <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>

            {/* Button to show/hide responses */}
            <button onClick={() => setShowResponsesModal(!showResponsesModal)} className='button'>
              {showResponsesModal ? 'Hide Your Responses' : 'Show Your Responses'}
            </button>

            <button onClick={() => window.location.reload()} className='button'>Restart</button>
            {showResponsesModal && (
              <ResponsesModal
                questions={questionData}
                selectedAnswers={selectedAnswers}
                onClose={() => setShowResponsesModal(false)}
              />
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Page;