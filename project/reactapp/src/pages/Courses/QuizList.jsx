import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('/api/quizzes/')
      .then(response => setQuizzes(response.data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);

  return (
    <div>
      <h1>Available Quizzes</h1>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            <h2>{quiz.title}</h2>
            <p>{quiz.answers}</p>
            <a href={`/maths/quiz/${quiz.id}`}>Take Quiz</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;