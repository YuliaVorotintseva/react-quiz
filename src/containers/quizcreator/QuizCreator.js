import React, {Component} from 'react'
import styleClasses from './QuizCreator.module.scss'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input'
import Select from '../../components/UI/select/Select'
import Auxilary from '../../hoc/auxilary/Auxilary'
import {createControl, validate, validateForm} from '../../form/FormFramework'

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: "Значение данного поля не может быть пустым",
        id: number
    }, {
        required: true
    })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Поле вопроса не может быть пустым'
        }, {
            required: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
        option5: createOptionControl(5)
    }
}

export default class QuizCreator extends Component {
    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxilary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxilary>
            )
        })
    }

    addQuestionHandler = event => {
        event.preventDefault()
        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1
        const {question, option1, option2, option3, option4, option5} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
                {text: option5.value, id: option5.id}
            ]
        }

        quiz.push(questionItem)
        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = event => {
        event.preventDefault()
        console.log(this.state.quiz)
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        return (
            <div className={styleClasses.QuizCreator}>
                <div>
                    <h1>Новый тест</h1>
                    <form onSubmit={event => event.preventDefault()}>
                        {this.renderControls()}

                        <Select
                            label="Выберите правильный ответ"
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                {text: 'Text 1', value: 1},
                                {text: 'Text 2', value: 2},
                                {text: 'Text 3', value: 3},
                                {text: 'Text 4', value: 4},
                                {text: 'Text 5', value: 5}
                            ]}
                        />
                        
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Create test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}