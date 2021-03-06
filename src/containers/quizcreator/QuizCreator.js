import React from 'react'
import styleClasses from './QuizCreator.module.scss'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input'
import Select from '../../components/UI/select/Select'
import Auxilary from '../../hoc/auxilary/Auxilary'
import {createControl, validate, validateForm} from '../../form/FormFramework'
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/Create'

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
        option4: createOptionControl(4)
    }
}

class QuizCreator extends React.Component {
    state = {
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
        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = event => {
        event.preventDefault()

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })

        this.props.finishCreateQuiz()
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
                                {text: 'Text 4', value: 4}
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
                            disabled={this.props.quiz.length === 0}
                        >
                            Create test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({quiz: state.create.quiz})

export default connect(mapStateToProps, {createQuizQuestion, finishCreateQuiz})(QuizCreator)
