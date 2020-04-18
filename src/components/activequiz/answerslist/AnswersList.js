import React from 'react'
import styleClasses from './AnswersList.module.scss'
import AnswerItem from './answersitem/AnswerItem'

const AnswersList = props => (
    <ul className={styleClasses.AnswersList}>
        {props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    key={index}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id] : null}
                />
            )
        })}
    </ul>
)

export default AnswersList
