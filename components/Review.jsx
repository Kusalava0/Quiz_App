import React from 'react';

const ResponsesModal = ({ questions, selectedAnswers, onClose }) => {
  const modalStyle = {
    display: 'block', // Show the modal
  };

  return (
    <div className='modal' style={modalStyle}>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>&times;</span>
        <h2 className='text-black'>Your Responses</h2>
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <p className="question-text">Question {index + 1}:</p>
            <p className="question-text">Question: {question.question}</p>
            <p className={`answer ${selectedAnswers[index] === question.correct_answer ? 'correct' : 'incorrect'}`}>
              Selected Answer: {selectedAnswers[index]}
            </p>
            <p className="question-text">Correct Answer: {question.correct_answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsesModal;
