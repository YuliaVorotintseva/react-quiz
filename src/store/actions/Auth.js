import axios from 'axios'
import {
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from './ActionTypes'

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwVbw77ktAkHYyAZDQxuH0vKLMr9ueh60'

        if(isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwVbw77ktAkHYyAZDQxuH0vKLMr9ueh60'
        }

        const response = await axios.post(url, authData)
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)

        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(response.data.idToken))
        dispatch(autoLogout(response.data.expiresIn))
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')

        if(!!token) {
            dispatch(logout())
        } else {
            const expirationDate = localStorage.getItem('expirationDat')
            if(expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch((autoLogout(expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
