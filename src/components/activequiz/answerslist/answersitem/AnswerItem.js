import React from 'react'
import styleClasses from './AnswerItem.module.scss'

const AnswerItem = props => {
    const classes = [styleClasses.AnswerItem]

    if(props.state) {
        classes.push(styleClasses[props.state])
    }

    return (
        <li
            className={classes.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem
