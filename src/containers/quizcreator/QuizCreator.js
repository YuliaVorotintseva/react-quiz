import React, { useState } from 'react'
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
        option4: createOptionControl(4),
        option5: createOptionControl(5)
    }
}

const QuizCreator = props => {
    const [state, setState] = useState({
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    })

    const changeHandler = (value, controlName) => {
        const formControls = {...state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control
        setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    function renderControls() {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName]
            return (
                <Auxilary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxilary>
            )
        })
    }

    const addQuestionHandler = event => {
        event.preventDefault()
        const {question, option1, option2, option3, option4, option5} = state.formControls

        const questionItem = {
            question: question.value,
            id: props.quiz.length + 1,
            rightAnswerId: state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
                {text: option5.value, id: option5.id}
            ]
        }

        props.createQuizQuestion(questionItem)

        setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    const createQuizHandler = event => {
        event.preventDefault()

        setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })

        props.finishCreateQuiz()
    }

    const selectChangeHandler = event => {
        setState({
            rightAnswerId: +event.target.value
        })
    }

    return (
        <div className={styleClasses.QuizCreator}>
            <div>
                <h1>Новый тест</h1>
                <form onSubmit={event => event.preventDefault()}>
                    {renderControls()}

                    <Select
                        label="Выберите правильный ответ"
                        value={state.rightAnswerId}
                        onChange={selectChangeHandler}
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
                        onClick={addQuestionHandler}
                        disabled={!state.isFormValid}
                    >
                        Add question
                    </Button>

                    <Button
                        type="success"
                        onClick={createQuizHandler}
                        disabled={props.quiz.length === 0}
                    >
                        Create test
                    </Button>
                </form>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
