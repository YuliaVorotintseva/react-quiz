import React, {Component} from 'react'
import styleClasses from './QuizList.module.scss'
import {NavLink} from 'react-router-dom'

export default class QuizList extends Component {
    renderQuizes() {
        return [1,2,3].map((quiz, index) => (
            <li key={index}>
                <NavLink to={'/quiz/' + quiz}>
                    Test {quiz}
                </NavLink>
            </li>
        ))
    }

    render() {
        return (
            <div className={styleClasses.QuizList}>
                <h1>List of tests</h1>
                <ul>
                    {this.renderQuizes()}
                </ul>
            </div>
        )
    }
}