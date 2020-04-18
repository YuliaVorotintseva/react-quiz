import React from 'react'
import styleClasses from './ActiveQuiz.module.scss'
import AnswersList from './answerslist/AnswersList'

const ActiveQuiz = props => (
    <div className={styleClasses.ActiveQuiz}>
        <p className={styleClasses.Question}>
            <span>
                <strong>1.</strong>&nbsp;
                Hello
            </span>
            <small>1/12</small>
        </p>
        <AnswersList
            answers={props.answers}
        />
    </div>
)

export default ActiveQuiz
