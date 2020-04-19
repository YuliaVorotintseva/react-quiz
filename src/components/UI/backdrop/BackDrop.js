import React from 'react'
import styleClasses from './BackDrop.module.scss'

const BackDrop = props => (
    <div className={styleClasses.BackDrop} onClick={props.onClick} />
)

export default BackDrop
