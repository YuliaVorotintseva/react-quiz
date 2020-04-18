import React from 'react'
import styleClasses from './MenuToggle.module.scss'

const MenuToggle = props => {
    const cls = [
        styleClasses.MenuToggle,
        'fa'
    ]

    if(props.isOpen) {
        cls.push('fa-times')
        cls.push(styleClasses.open)
    } else {
        cls.push('fa-bars')
    }

    return (
        <i
            className={cls.join(' ')}
            onClick={props.onToggle}
        />
    )
}

export default MenuToggle
