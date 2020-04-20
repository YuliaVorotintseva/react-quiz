import React from 'react'
import styleClasses from './FinishedQuiz.module.scss'
import Button from '../UI/button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)

    return (
        <div className={styleClasses.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        styleClasses[props.results[quizItem.id]]
                    ]

                    return (
                        <li key={index}>
                            <strong>{index + 1}.</strong>&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>
            <p>Right: {successCount} / {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type='primary'>Again</Button>
                <Link to='/'>
                    <Button type='success'>Tests</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz
