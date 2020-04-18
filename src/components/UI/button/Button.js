import React from 'react'
import styleClasses from './Button.module.scss'

const Button = props => {
    const cls = [
        styleClasses.Button,
        styleClasses[props.type]
    ]

    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button
