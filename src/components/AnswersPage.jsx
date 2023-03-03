import React from 'react'
import {decode} from 'html-entities'

export default function AnswersPage(props) {
    let count = 0

    const questionAndAnswers = props.triviaQuestions.map((item, i) => {
        const answers = item.answers.map(answer => {
            let styleType = ''

            if (answer.isSelected && answer.isCorrectAnswer) {
                styleType = 'correct-answer'
                count += 1
            }
            else if (answer.isSelected && !answer.isCorrectAnswer) {
                styleType = 'wrong-answer'
            }
            else if (!answer.isSelected && answer.isCorrectAnswer) {
                styleType = 'correct-answer'
            }
            else {
                styleType = ''
            }

            return (
                <p 
                    key={answer.id} 
                    className={`answer checked-answer ${styleType}`} 
                    id={answer.id}
                    onClick={()=>props.selectAnswer(answer.id, item.id)}
                >
                    {decode(answer.answer)}
                </p>
            )
        })

        return (
            <div key={item.id} className='question-and-answer' id={item.id}>
                <p className='question' id={item.id}>{`${++i}.)`} {decode(item.question)}</p>
                <div className='answers-div' id={item.id}>
                    {answers}
                </div>
            </div>
        )
    })

    return (
        <div className='questions-and-answers-div'>
            {questionAndAnswers}
            <div id='question-page-btns'>
                <p>You scored {count}/{props.triviaQuestions.length} correct answers</p>
                    <button onClick={props.playAgain} className="btn">
                        Play Again
                    </button>     
            </div>
        </div>
    )
}