import React, {Component} from 'react'
import styleClasses from './Quiz.module.scss'
import ActiveQuiz from '../../components/activequiz/ActiveQuiz'

class Quiz extends Component {
    state = {
        quiz: [
            {
                answers: [
                    {text: "Answer 1"},
                    {text: "Answer 2"},
                    {text: "Answer 3"},
                    {text: "Answer 4"},
                    {text: "Answer 5"}
                ]
            }
        ]
    }

    render() {
        return (
            <div className={styleClasses.Quiz}>
                <div className={styleClasses.QuizWrapper}>
                    <h1>Answer the questions</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[0].answers}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz
