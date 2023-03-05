import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import TopRightImage from './TopRightImage'
import BottomLeftImage from './BottomLeftImage'
import IntroPage from './IntroPage'
import SelectionPage from './SelectionPage'
import QuestionsPage from './QuestionsPage'
import AnswersPage from './AnswersPage'

export default function App() {

  /**-- All states and consts Listed here --**/
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    difficulty: '',
    type: ''
  })
  const [categories, setCategories] = useState([])
  const [resCode, setResCode] = useState('')
  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [selectionDone, setSelectionDone] = useState(false)
  const [questionsAnswered, setQuestionsAnswered] = useState(false)
  const baseUrl = `https://opentdb.com/api.php?`
  /**----- End of Code ---*/

  /*  The code below is for getting the entire categories of trivia
      from the API and passed on the the Selection Page
  */
  useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
          .then(res => res.json())
          .then(data => {setCategories(data.trivia_categories)})
          .catch(err => {
            console.warn(`It looks like the URL does not exist or there is an issue with your network connection`)
            console.warn(err);
          })
  }, [gameStarted])
  /**----- End of Code ---*/

  /*  The code below is for getting the list of trivia
      questions after selection is done
  */
  useEffect(() => {
    // fetch(`${baseUrl}amount=${formData.amount}${(formData.category) ? `&category=${formData.category}`: '' }${(formData.difficulty) ? `&difficulty=${formData.difficulty}`: '' }${(formData.type) ? `&type=${formData.type}`: '' }`)
    
    /* Use this code below to get the search parameters instead of 
       conditionally rendering it using javascript as above 
    */
   const searchParams = new URLSearchParams([...Object.entries(formData)]).toString()

    if (selectionDone) {
      fetch(`${baseUrl}${searchParams}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Something Went Wrong')
          }
          return res.json()
        })
        .then(data => {
          /*
           * Set response code for no results handling in Question
           * and Answers Page
           */
          setResCode(data.response_code)

          if (data.response_code === 0) {
          /* Set the trivia questions array from API results but map over it
          * and add unique IDs and also put the correct and incorrect answers 
          * into an array
          */
            setTriviaQuestions(data.results.map(result => {
              /**Create empty array for the answers */
              const answersArr = []

              /**Push the correct answer supplied by API */
              answersArr.push({
                id: nanoid().concat(`_answer`),
                answer: result.correct_answer,
                isSelected: false,
                isCorrectAnswer: true 
              })

              /**Push other incorrect answers supplied from API */
              result.incorrect_answers.forEach(incorrectAnswer => {
                answersArr.push({
                  id:nanoid().concat(`_answer`),
                  answer: incorrectAnswer,
                  isSelected: false,
                  isCorrectAnswer: false 
                })
              })


              /** Return the full question object */
              return {
                id:nanoid(),
                isAnswered: false,
                category:result.category, 
                type:result.type, 
                difficulty:result.difficulty, 
                question:result.question, 
                answers: shuffle(answersArr) //Shuffle the answers when returning them
              } 
            }))
          }
        })
        .catch(err => {
          console.warn(`It looks like the URL does not exist or there is an issue with your network connection`)
          console.warn(err);
        })
    }
  }, [selectionDone])
  /**----- End of Code ---*/

  function startGame() {
    setGameStarted(gameStarted => !gameStarted)
  }

  function handleSearchParamsChange (event) {
    const {name, value, type} = event.target

    setFormData(prevFormData => {
        return {...prevFormData, [name]: (type === 'number') ? Number(value) : value }
    })
  }

  function getTriviaQuestions(event) {
    event.preventDefault()
    if ((!formData.amount) || (formData.amount > 50) || (formData.amount === 0)) {
      alert(`Number of questions must be from 1 - 50`)
    }
    else {
      setSelectionDone(prevSelectionDone => !prevSelectionDone)
    }
  }

  function backToSelection() {
    setResCode(0)
    setSelectionDone(false)
    setTriviaQuestions([])
  }

  function stopTriviaGame () {
    setFormData({
      amount: '',
      category: '',
      difficulty: '',
      type: ''
    })
    setResCode(0)
    setTriviaQuestions([])
    setSelectionDone(false)
    setGameStarted(false)
    setQuestionsAnswered(false)
  }

  function selectAnswer(answerID, questionID) {
    setTriviaQuestions(prevTriviaQues => {
      const array = []
      for (let i in prevTriviaQues) {
        const {id} = prevTriviaQues[i]

        if (id !== questionID) {
          array.push(prevTriviaQues[i])
        }
        else if (id == questionID) {
          const answersArr = []
          for (let j in prevTriviaQues[i].answers) {
            const {id} = prevTriviaQues[i].answers[j]
            if (id !== answerID) {
              answersArr.push({...prevTriviaQues[i].answers[j], isSelected: false})
            }
            else if (id == answerID) {
              answersArr.push({...prevTriviaQues[i].answers[j], isSelected: true})
            }
          }
          array.push({...prevTriviaQues[i], isAnswered: true, answers:answersArr})
        }
      }
      return array
    })
  }

  function checkAnswers() {
    const allQuestionsAnswered = triviaQuestions.every(question => question.isAnswered)
    if(!allQuestionsAnswered) {
      alert('Answer All Questions First')
    }
    else {
      setQuestionsAnswered(true)
    }
  }

  function shuffle(array) {
  /**Use Fisher–Yates shuffle to shuffle the answers array */
    let m = array.length, t, i;
    
    // While there remain elements to shuffle…
    while (m) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)
    
        // And swap it with the current element.
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }
    return array;
}

  return (
    <div className='App'>
      <TopRightImage gameStarted={gameStarted} />

      {!gameStarted && !selectionDone && !questionsAnswered && 
        <IntroPage gameStarted={startGame} 
        />
      }

      {gameStarted && !selectionDone && !questionsAnswered && 
        <SelectionPage
          categories={categories} 
          handleSearchParamsChange={handleSearchParamsChange} 
          formData={formData}
          stopTriviaGame={stopTriviaGame}
          getTriviaQuestions={getTriviaQuestions}
        />
      }

      {gameStarted && selectionDone && !questionsAnswered && 
        <QuestionsPage 
          selectAnswer={selectAnswer}
          checkAnswers={checkAnswers}
          resCode={resCode}
          triviaQuestions={triviaQuestions} 
          backToSelection={backToSelection}
        />
      }

      {gameStarted && selectionDone && questionsAnswered && 
        <AnswersPage
          playAgain={stopTriviaGame}
          triviaQuestions={triviaQuestions}
        />
      }

      <BottomLeftImage gameStarted={gameStarted} />
    </div>
  )
}
