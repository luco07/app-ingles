import React, { useState } from 'react';
import preguntas from './data/preguntasData';
import './index.css'

function PreguntasApp() {
  const [questionsToShow, setQuestionsToShow] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Función para seleccionar preguntas aleatorias
  const selectRandomQuestions = () => {
    const shuffledQuestions = preguntas.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 3);
    setQuestionsToShow(selectedQuestions);
  };

  // Función para manejar la selección de respuesta
  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  // Función para pasar a la siguiente pregunta
  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questionsToShow[currentQuestionIndex].respuestaCorrecta) {
        setScore(score + 1);
      }

      setSelectedAnswer(null);

      if (currentQuestionIndex + 1 < questionsToShow.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }
  };

  // Función para renderizar la pregunta actual
  const renderQuestion = () => {
    const question = questionsToShow[currentQuestionIndex];
    return (
      <div>
        <h2>{question.pregunta}</h2>
        {question.opciones.map((opcion, index) => (
          <div className='mensj' key={index}>
            <label c>
              <input 
                type="radio"
                name="respuesta"
                checked={selectedAnswer === index}
                onChange={() => handleAnswerSelect(index)}
              />
              {opcion}
            </label>
          </div>
        ))}
        <button onClick={handleNextQuestion}>Siguiente</button>
      </div>
    );
  };

  // Función para renderizar el resultado
  const renderResult = () => {
    const resultMessage = score >= 2 ? 'Aprobado' : 'Desaprobado';
    return (
      <div>
        <h2>Resultado</h2>
        <p className='mensj'> Tu puntaje: {score} / 3</p>
        <p className='mensj'>{resultMessage}</p>
      </div>
    );
  };

  // Función para iniciar la aplicación con preguntas aleatorias
  const startQuiz = () => {
    selectRandomQuestions();
    setShowResult(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div className='body'>
      <div className='header'>
      <h1>COFFE PLAY</h1>
      </div>
      <div className='questions'>
      {showResult ? renderResult() : (questionsToShow.length > 0 ? renderQuestion() : <button onClick={startQuiz}>Comenzar</button>)}
      </div>
    </div>
  );
}

export default PreguntasApp;
