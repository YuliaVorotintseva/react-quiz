import React from 'react'
import styleClasses from './Loader.module.scss'

const Loader = props => (
    <div className={styleClasses.center}>
        <div className={styleClasses.Loader}>
            <div /><div />
        </div>
    </div>
)

export default Loader
