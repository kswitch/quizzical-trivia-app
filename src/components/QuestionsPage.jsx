import React from 'react'
import {decode} from 'html-entities'

export default function QuestionsPage(props) {

    const questionAndAnswers = props.triviaQuestions.map((item, i) => {
        const answers = item.answers.map(answer => {
            return (
                <p 
                    key={answer.id} 
                    className={`answer ${(answer.isSelected) ? 'selected-answer' : ''}`} 
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

    /** Code and Styles for when/if there are no results from the search */
    const noResultStyles ={
        fontWeight: 'bolder',
        fontSize: '2.5rem',
    }
    const noResults = (
        <p className='question'>
            <span style={noResultStyles}>No Results.</span>
            <br/>
            <br/>
            There are not enough questions for your selection.
            <br/>
            Please reduce the number of questions and/or select another difficulty.
        </p>
    )
    /**=== End of Code ===**/

    return (
        <div className='questions-and-answers-div'>
            {
                (props.resCode === 0) ? questionAndAnswers :
                (props.resCode === 1) ? noResults : 
                ''
            }

            <div id='question-page-btns'>
                    <button onClick={props.backToSelection} className="btn">
                        Back To Selection
                    </button>

                    <button onClick={props.checkAnswers} className="btn">
                        Check Answers
                    </button>     
            </div>
        </div>
    )
}