import React from 'react'
import styleClasses from './ActiveQuiz.module.scss'
import AnswersList from './answerslist/AnswersList'

const ActiveQuiz = props => (
    <div className={styleClasses.ActiveQuiz}>
        <p className={styleClasses.Question}>
            <span>
                <strong>{props.numberOfQuestion}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.numberOfQuestion}/{props.quizLength}</small>
        </p>
        <AnswersList
            state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz
