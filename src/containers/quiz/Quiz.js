import React, {Component} from 'react'
import styleClasses from './Quiz.module.scss'
import ActiveQuiz from '../../components/activequiz/ActiveQuiz'

class Quiz extends Component {
    state = {
        quiz: []
    }

    render() {
        return (
            <div className={styleClasses.Quiz}>
                <div className={styleClasses.QuizWrapper}>
                    <h1>Quiz</h1>
                    <ActiveQuiz />
                </div>
            </div>
        )
    }
}

export default Quiz
