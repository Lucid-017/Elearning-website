import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CoursesContext } from '../API and Contxt/Context/Courses';

const QuizDetail = () => {
  const { quizId } = useParams(); // Get quizId from URL parameters
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quiz,setQuiz] =useState(null)
  const [isCorrect, setIsCorrect] = useState(null); // null: not answered, true: correct, false: incorrect
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { getQuiz,error,setError,setLoading,loading } = useContext(CoursesContext);


  // New state variables for score and total answered
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await getQuiz(quizId);
      setQuiz(response);
      console.log('Grade',response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(quizId)
    fetchQuiz()
    // Fetch the quiz questions when the component mounts

  }, [quizId]);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setLoading(true);
    setError(null);

    // Submit the current question answer
    axios.post(`/api/quizzes/${quizId}/submit-question/`, {
      question_id: questions[currentQuestion]?.id, // Use optional chaining
      answer: selectedAnswer,
    })
      .then(response => {
        setLoading(false);
        setIsCorrect(response.data.is_correct);

        // Update total answered and score
        setTotalAnswered(totalAnswered + 1);
        if (response.data.is_correct) {
          setScore(score + 1); // Increment score for a correct answer
          if (currentQuestion < questions.length - 1) {
            // Move to the next question after a delay
            setTimeout(() => {
              setCurrentQuestion(currentQuestion + 1);
              setSelectedAnswer(null);
              setIsCorrect(null);
            }, 2000); // 2 seconds delay to show correct message
          } else {
            alert(`Quiz completed! Your score is ${score + 1}/${questions.length}.`);
          }
        } else {
          alert('Incorrect! Try again.');
        }
      })
      .catch(err => {
        setLoading(false);
        setError('Error submitting answer');
        console.error(err);
      });
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setError(null);
  };

  // Check if questions are loaded and there is a current question
  if (!questions.length || currentQuestion >= questions.length) {
    return <p>Loading questions...</p>;
  }

  const currentOptions = questions[currentQuestion]?.answers || []; // Default to an empty array

  // Calculate the percentage score
  const percentageScore = totalAnswered > 0 ? (score / totalAnswered) * 100 : 0;

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p>{questions[currentQuestion].question}</p>

      <div>
        {currentOptions.map(option => (
          <div key={option.id}>
            <input
              type="radio"
              id={option.id}
              name="answer"
              value={option.id}
              checked={selectedAnswer === option.id}
              onChange={() => setSelectedAnswer(option.id)}
            />
            <label htmlFor={option.id}>{option.answer}</label>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {isCorrect === true && <p>Correct! Loading next question...</p>}
      {isCorrect === false && <p>Incorrect! <button onClick={handleRetry}>Try Again</button></p>}
      
      {error && <p>{error}</p>}

      {/* Display the score and total answered */}
      <div>
        <p>Total Questions Answered: {totalAnswered}</p>
        <p>Score: {score} / {totalAnswered} ({percentageScore.toFixed(2)}%)</p>
      </div>
    </div>
  );
};

export default QuizDetail;