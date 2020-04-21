import React, {Component} from 'react'
import styleClasses from './Auth.module.scss'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input'
import is from 'is_js'

export default class Auth extends Component {
    state = {
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
    }

    loginHandler = () => {}

    registerHandler = () => {}

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
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

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control

        this.setState({
            formControls
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
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
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={styleClasses.Auth}>
                <h1>Авторизация</h1>
                <form onSubmit={this.submitHandler} className={styleClasses.AuthForm}>
                    {this.renderInputs()}

                    <Button
                        type="success"
                        onClick={this.loginHandler}
                    >
                        Войти
                    </Button>
                    <Button
                        type="primary"
                        onClick={this.registerHandler}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        )
    }
}