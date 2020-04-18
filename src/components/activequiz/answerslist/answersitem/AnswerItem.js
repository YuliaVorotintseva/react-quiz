import React from 'react'
import styleClasses from './AnswerItem.module.scss'

const AnswerItem = props => (
    <li className={styleClasses.AnswerItem}>
        {props.answer.text}
    </li>
)

export default AnswerItem
