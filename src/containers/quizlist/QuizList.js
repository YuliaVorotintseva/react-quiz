import React, {Component} from 'react'
import Loader from '../../components/UI/loader/Loader'
import styleClasses from './QuizList.module.scss'
import {NavLink} from 'react-router-dom'
import axios from '../../axios/axios-quiz'

export default class QuizList extends Component {
    state = {
        quizes: [],
        loading: true
    }

    renderQuizes() {
        return this.state.quizes.map(quiz => (
            <li key={quiz.id}>
                <NavLink to={'/quiz/' + quiz.id}>
                    {quiz.name}
                </NavLink>
            </li>
        ))
    }

    async componentDidMount() {
        try {
            const response = await axios.get('quizes.json')
            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test #${index + 1}`
                })
            })

            this.setState({
                quizes,
                loading: false
            })
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className={styleClasses.QuizList}>
                <h1>List of tests</h1>
                {
                    this.state.loading
                    ? <Loader />
                    : <ul>
                        {this.renderQuizes()}
                    </ul>
                }
            </div>
        )
    }
}