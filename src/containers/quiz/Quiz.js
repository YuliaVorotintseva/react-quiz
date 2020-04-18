import React, {Component} from 'react'
import styleClasses from './Quiz.module.scss'
import ActiveQuiz from '../../components/activequiz/ActiveQuiz'
import FinishedQuiz from '../../components/finishedquiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        quiz: [
            {
                question: 'Сколько планет вращается вокруг Солнца?',
                rightAnswerId: 3,
                id: 1,
                answers: [
                    {text: "1 планета", id: 1},
                    {text: "4 планеты", id: 2},
                    {text: "8 планет", id: 3},
                    {text: "9 планет", id: 4},
                    {text: "нет верного ответа", id: 5}
                ]
            },
            {
                question: 'Самая большая планета в Солнечной системе:',
                rightAnswerId: 2,
                id: 2,
                answers: [
                    {text: "Меркурий", id: 1},
                    {text: "Юпитер", id: 2},
                    {text: "Земля", id: 3},
                    {text: "Сатурн", id: 4},
                    {text: "нет верного ответа", id: 5}
                ]
            }
        ]
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onAnswerClickHandler = answerId => {
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.rightAnswerId === answerId) {
            if(!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {
                    [answerId]: 'success',
                    results
                }
            })

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {
                    [answerId]: 'error',
                    results
                }
            })
        }
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={styleClasses.Quiz}>
                <div className={styleClasses.QuizWrapper}>
                    <h1>Answer the questions</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        : <ActiveQuiz
                            question={this.state.quiz[this.state.activeQuestion].question}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            numberOfQuestion={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    }
                    
                </div>
            </div>
        )
    }
}

export default Quiz
