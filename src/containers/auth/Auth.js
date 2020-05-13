import React, { useState } from 'react'
import styleClasses from './Auth.module.scss'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input'
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/Auth'

const Auth = props => {
    const [state, setState] = useState({
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'email',
                errorMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    })

    const loginHandler = () => {
        props.auth(
            state.formControls.email.value,
            state.formControls.password.value,
            true
        )
    }

    const registerHandler = () => {
        props.auth(
            state.formControls.email.value,
            state.formControls.password.value,
            false
        )
    }

    const submitHandler = event => {
        event.preventDefault()
    }

    function validateControl(value, validation) {
        if(!validation) {
            return true
        }

        let isValid = true
        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email) {
            isValid = is.email(value) && isValid
        }

        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    const onChangeHandler = (event, controlName) => {
        const formControls = {...state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)
        formControls[controlName] = control

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        setState({
            formControls,
            isFormValid
        })
    }

    function renderInputs() {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => onChangeHandler(event, controlName)}
                />
            )
        })
    }

    return (
        <div className={styleClasses.Auth}>
            <div>
                <h1>Авторизация</h1>
                <form onSubmit={submitHandler} className={styleClasses.AuthForm}>
                    {renderInputs()}

                    <Button
                        type="success"
                        onClick={loginHandler}
                        disabled={!state.isFormValid}
                    >
                        Войти
                    </Button>
                    <Button
                        type="primary"
                        onClick={registerHandler}
                        disabled={!state.isFormValid}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, islogin) => dispatch(auth(email, password, islogin))
    }
}

export default connect(null,mapDispatchToProps)(Auth)
