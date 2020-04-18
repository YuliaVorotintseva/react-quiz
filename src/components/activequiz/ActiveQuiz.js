import React from 'react'
import styleClasses from './ActiveQuiz.module.scss'

const ActiveQuiz = props => (
    <div className={styleClasses.ActiveQuiz}>
        <p className={styleClasses.Question}>
            <span>
                <strong>1.</strong>&nbsp;
                Hello
            </span>
            <small>1/12</small>
        </p>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </div>
)

export default ActiveQuiz
