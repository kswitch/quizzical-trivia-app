import React from 'react'

export default function SelectionPage(props) {  
    const categoriesList = props.categories.map(option => {
        return <option key={option.id} value={option.id}>{option.name}</option>
    })

    return (
        <div className="selection-page">
            <form className='selection-page-form'>
                <div>
                    <label className='selection-page-form-label' htmlFor="amount">
                        No of Questions:
                    </label>
                    <input
                        className='selection-page-form-input number' 
                        name='amount'
                        type='number' 
                        placeholder='Number of Questions to get'
                        onChange={(event) => props.handleSearchParamsChange(event)}
                        min='1'
                        max='50'
                        value={props.formData.amount}
                        required
                    />
                </div>

                <div>
                    <p className='selection-page-form-label'>Select Category:</p>
                    <select
                        className='selection-page-form-input' 
                        id='category'
                        name='category' 
                        value={props.formData.category}
                        onChange={(event) => props.handleSearchParamsChange(event)}
                    >
                        <option value=''>Any Category</option>
                        {categoriesList}
                    </select>
                </div>

                <div>
                    <p className='selection-page-form-label'> Select Difficulty:</p>
                    <select
                        className='selection-page-form-input'
                        id='difficulty' 
                        onChange={(event) => props.handleSearchParamsChange(event)} 
                        name='difficulty' 
                        value={props.formData.difficulty} 
                    >
                        <option value=''>Any Difficulty</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                </div>

                <div>
                    <p className='selection-page-form-label'>Select Type:</p>
                    <select
                        className='selection-page-form-input'
                        id='type' 
                        name='type' 
                        value={props.formData.type} 
                        onChange={(event) => props.handleSearchParamsChange(event)}
                    >    
                        <option value=''>Any Type</option>
                        <option value='multiple'>Multiple Choice</option>
                        <option value='boolean'>True / False</option>
                    </select>
                </div>

                <div id='selection-page-form-btns'>
                    <button 
                        onClick={(e) => props.getTriviaQuestions(e)}
                        className="selection-page-btn btn"
                    >
                        Get Trivia Questions
                    </button>

                    <button 
                        onClick={(e) => props.stopTriviaGame(e)}
                        className="selection-page-btn btn"
                    >
                        Stop Game
                    </button>     
                </div>
            </form>
        </div>
    )
}