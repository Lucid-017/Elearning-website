import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CoursesContext } from "../../API and Contxt/Context/Courses";
import "./Css/Quiz.css";
import { useToast } from "../../API and Contxt/Context/ToastContext";
import Complete from "../../Components/Layout/Complete";

const QuizDetail = () => {
  const { quizId, subject, grade } = useParams(); // Get quizId from URL parameters
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // null: not answered, true: correct, false: incorrect
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { getQuiz, error, setError, setLoading, loading } =
    useContext(CoursesContext);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizStatus, setQuizStatus] = useState(false);
  const timerRef = useRef(null); //ref for timer
  const pausedTimeRef = useRef(null); //ref for timer when paused

  // New state variables for score and total answered
  // const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [attempt_id, setQuizAttemptId] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(0);
  const [smartScore, setSmartScore] = useState(0);
  const userInfoString = sessionStorage.getItem("user_info");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : {}; // Convert to object
  const accessToken = userInfo.access_token;

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/quizzes/${quizId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Example for adding token
        },
      });
      //a=if you add config include it like so getQuiz(quizId,config)
      setQuestions(response.data.questions);
      // if quiz has been attempted before
      if (
        response.data.attempt_completed === false &&
        response.data.current_question > 0
      ) {
        setCurrentQuestion(response.data.current_question - 1);
        setQuestionAnswered(response.data.questions_answered || 0);
        setSmartScore(response.data.score || 0);
        // setSmartScore(response.data.score)
      }
      console.log("Quiz details", response.data);
    } catch (err) {
      if (err.status === 401) {
        // route user to login page if unauthorized
        navigate("/login");
        sessionStorage.removeItem("user_info");
        showToast(`Session Expired, Kindly log back in`, "error");
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // start timer\
    const startTimer = () => {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setTimeElapsed((prev) => prev + 1);
        }, 1000);
      }
    };
    // Function to pause the timer if user has unfocused from the browser
    const pauseTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null; // Reset timer reference
      }
    };

    const handleVisibilityChange = () => {
      if (document.hasFocus()) {
        pauseTimer(); //pause
        pausedTimeRef.current = Date.now(); //keep track
      } else {
        // Resume and adjust elapsed time based on how long the tab was hidden
        if (pausedTimeRef.current) {
          const pausedDur = Math.floor(
            (Date.now() - pausedTimeRef.current) / 1000
          );
          setTimeElapsed((prevTime) => prevTime + pausedDur);
        }
        startTimer(); //resume time
      }
    };

    // Start the timer when the component mounts
    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    fetchQuiz();
    console.log(timerRef, "time is");
    //
    console.log(quizId);
    // console.log('current option. answers',currentOptions);

    return () => {
      pauseTimer(); // Clear the timer
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // Fetch the quiz questions when the component mounts
  }, [quizId, subject, grade]);

  // convert time to seconds
  const timeFormat = (seconds) => {
    const minute = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minute).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    // if (selectedAnswer === null) return;
    if (selectedAnswer === null) {
      // user must select an answer
      showToast("please select an answer before submiting", "error");
    }
    // monitor if quiz is completed or not
    setQuizStatus(false);

    setLoading(true);
    setError(null);

    // Submit the current question answer
    axios
      .post(
        `/api/quizzes/${quizId}/submit-question/`,
        {
          question_id: questions[currentQuestion]?.id, // Use optional chaining
          answer: selectedAnswer,
          attempt_id: attempt_id,
          time_spent: timeElapsed,
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
        setQuizAttemptId(response.data.quiz_attempt_id);

        // Update total answered and score
        if (response.data.is_correct) {
          console.log(smartScore);
          setTotalAnswered((prevAnswered) => prevAnswered + 1);
          // Check if it's the last question
          if (currentQuestion < questions.length - 1) {
            // Move to the next question after a delay
            setTimeout(() => {
              setCurrentQuestion(response.data.current_question - 1); //minus one because of javascript index
              console.log(
                "current question is ",
                response.data.current_question
              );
              setSelectedAnswer(null);
              setIsCorrect(null);
            }, 2000); // 2 seconds delay to show correct message
            console.log(response.data);
          } else {
            // submit quiz
            const timeSpent = timeElapsed;
            const quizData = {
              time_spent: timeSpent, // in seconds
            };

            axios
              .post(`/api/quizzes/${quizId}/submit/`, quizData, {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add your access token
                },
              })
              .then((response) => {
                console.log("Quiz submitted successfully:", response.data);
              })
              .catch((error) => {
                showToast("Error submitting quiz:", "error");
                console.error("Error submitting quiz:", error);
              });
            // show toast
            showToast(
              `Quiz completed! Your score is ${
                totalAnswered + questionAnswered
              }/${questions.length}.`,
              "success"
            );

            setQuizStatus(true);
            // alert(
            //   `Quiz completed! Your score is ${score + 1}/${questions.length}.`
            // );
          }
        } else {
          // if question is not correct
          showToast("Incorrect! Try again", "error");
          // alert("Incorrect! Try again.");
        }
      })
      .catch((err) => {
        // catch error submitting current quiz answers
        setLoading(false);
        showToast("Error submitting answer", "error");
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
  const percentageScore =
    ((questionAnswered + totalAnswered) / questions.length) * 100 || 0;

  return (
    <div className="container quiz-container">
      {/* if quiz is in progress */}
      {quizStatus === false ? (
        <>
          {/* Display the score and total answered */}
          <div className="question-stats flex flex-col justify-between items-center pb-2 phone:flex-row ">
            <div className="questions-answered">
              <div>
                <progress
                  value={questionAnswered + totalAnswered}
                  max={questions.length || 1}
                  className="progress"
                ></progress>
              </div>
            </div>
            <p>
              Questions Answered:{questionAnswered + totalAnswered}/{" "}
              {questions.length}{" "}
            </p>

            {/* store the time in a global varible to use in our dashboard later
        if user is focused out of the browser pause the timer and resume when they areon
        basically track the time it takes to finish a question */}
            <div className="time-elapsed">
              {timeFormat(timeElapsed)}
              <div className="smartscore">
                <p>{Math.floor(percentageScore)}% completed</p>
              </div>
            </div>
          </div>
          <h2 className="text-[#FF9500] mb-3">
            Question {currentQuestion + 1}
          </h2>
          <p className="mb-2">{questions[currentQuestion].question}</p>

          <div className="mb-5">
            {/* {ques} */}
            <React.Fragment key={questions[currentQuestion]?.id}>
              {questions[currentQuestion]?.question_type ===
              "Multiple Choice" ? (
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
                    <label htmlFor={`answer-${answer.id}`}>
                      {answer.answer}
                    </label>
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
        </>
      ):(
        <Complete subject={subject} grade={grade} time={timeElapsed} score={totalAnswered} smartScore={Math.floor(percentageScore)}/>
      )}
      
      {isCorrect === true && <p>Correct! Loading next question...</p>}
      {/* {currentQuestion >=questions.length && <p>Correct! Loading next question...</p>} */}
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
