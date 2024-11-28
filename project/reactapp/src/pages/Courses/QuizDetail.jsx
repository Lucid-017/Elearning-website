import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CoursesContext } from "../../API and Contxt/Context/Courses";
import "./Css/Quiz.css";

const QuizDetail = () => {
  const { quizId } = useParams(); // Get quizId from URL parameters
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // const [quiz,setQuiz] =useState(null)
  const [isCorrect, setIsCorrect] = useState(null); // null: not answered, true: correct, false: incorrect
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { getQuiz, error, setError, setLoading, loading } =
    useContext(CoursesContext);

  // New state variables for score and total answered
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [attempt_id, setQuizAttemotId] = useState(0);  
  const userInfoString = sessionStorage.getItem('user_info');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : {}; // Convert to object
  const accessToken = userInfo.access_token

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await getQuiz(quizId);
      setQuestions(response.questions);
      console.log("Grade", response.questions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(quizId);
    // console.log('current option. answers',currentOptions);

    fetchQuiz();
    // Fetch the quiz questions when the component mounts
  }, [quizId]);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setLoading(true);
    setError(null);

    // Submit the current question answer
    axios
      .post(`/api/quizzes/${quizId}/submit-question/`, {
        question_id: questions[currentQuestion]?.id, // Use optional chaining
        answer: selectedAnswer,
        attempt_id: attempt_id
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        setLoading(false);
        setIsCorrect(response.data.is_correct);
        setQuizAttemotId(response.data.quiz_attempt_id)
        
        // Update total answered and score
        if (response.data.is_correct) {
          setTotalAnswered(totalAnswered + 1);
        }
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
            alert(
              `Quiz completed! Your score is ${score + 1}/${questions.length}.`
            );
          }
        } else {
          alert("Incorrect! Try again.");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Error submitting answer");
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
    <div className="container quiz-container">
      {/* Display the score and total answered */}
      <div className="question-stats flex justify-between items-center pb-2">
        <div className="questions-answered">
          <div>
            <progress
              value={totalAnswered || 0}
              max={questions.length || 1}
              className="progress"
            ></progress>
          </div>
        </div>
        <p>
          Questions Answered:{totalAnswered}/ {questions.length}{" "}
        </p>

        {/* store the time in a global varible to use in our dashboard later
        if user is focused out of the browser pause the timer and resume when they areon
        basically track the time it takes to finish a question */}
        <div className="time-elapsed">00:00</div>
      </div>
      <h2 className="text-[#FF9500] mb-3">Question {currentQuestion + 1}</h2>
      <p className="mb-2">{questions[currentQuestion].question}</p>

      <div className="mb-5">
        {/* {ques} */}
        <React.Fragment key={questions[currentQuestion]?.id}>
    {questions[currentQuestion]?.question_type === "Multiple Choice" ? (
      // Render radio buttons for multiple-choice questions
      currentOptions.map((answer) => (
        <div key={answer.id}>
          <input
            type="radio"
            id={`answer-${answer.id}`}
            name={`answer-${questions[currentQuestion].id}`} // Group options by question ID
            value={answer.answer}
            checked={selectedAnswer === answer.id}
            onChange={() => setSelectedAnswer(answer.id)}
          />
          <label htmlFor={`answer-${answer.id}`}>{answer.answer}</label>
        </div>
      ))
    ) : (
      // Render a single input for "Fill in the Blank" questions
      <div>
        <input
          className="input"
          type="text"
          id={`answer-${questions[currentQuestion]?.id}`}
          name={`answer-${questions[currentQuestion]?.id}`}
          value={selectedAnswer || ""}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          placeholder="Fill in the Blank"
        />
      </div>
    )}
  </React.Fragment>
        {/* {currentOptions.map((option) => (
          <React.Fragment key={option.id}>
            {option.question_type === "Multiple Choice" ? (
              <div>
                <p>{option.question_type}</p>
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
            ) : (
              <div>
                <input
                className="input"
                  type="text"
                  id={option.id}
                  name="answer"
                  value={selectedAnswer || ''}
                  // checked={selectedAnswer === option.id}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
              </div>
            )}
          </React.Fragment>
        ))} */}
      </div>
      <div>
        <button
          className="btn-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {isCorrect === true && <p>Correct! Loading next question...</p>}
      {isCorrect === false && (
        <p>
          Incorrect! <button onClick={handleRetry}>Try Again</button>
        </p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default QuizDetail;
